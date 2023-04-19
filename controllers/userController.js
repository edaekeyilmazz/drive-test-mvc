import bcrypt from 'bcrypt'
import userModel from '../models/user.js'
import appointmentModel from '../models/appointment.js'

class UserController{

    //#region G TEST METHODS
    static gtest_getController = async (req,res)=>{

        const userDetail = await userModel.findById(req.session.userId).populate('appointment');
        console.log(userDetail);
        // let appointmentInfo = (userDetail.appointment == null || userDetail.testType == 'G2') ? new appointmentModel() : await appointmentModel.findById(userDetail.appointment.id);
        const appointmentInfo = userDetail.appointment == null ? new appointmentModel() : await appointmentModel.findById(userDetail.appointment.id);
        console.log(appointmentInfo); 
        const gTestMessage = userDetail.licenseNo == "" ? "Please enter your personal information first!": null;
        req.session.appointmentTime = appointmentInfo.appointmentTime;
        const data = {
              "title" : "G Test",
              user: userDetail,
              appointment : appointmentInfo,
              username: req.session.username,
              userType: req.session.userType,
              showSuccessMessage: false,
              showErrorMessage: false,
              gTestMessage: gTestMessage
        }
            res.render('g_test.ejs', { data });
    }

    static gtest_postController = async (req,res)=>{
        const user_data = req.body;
        const userInfo = await userModel.findByIdAndUpdate(
        req.session.userId,
        {
            car_details : {
                make: user_data.make,
                model: user_data.model,
                year: user_data.year,
                plateNo: user_data.plateNo
            },
            appointment: user_data.appointmentTime,
            testType: 'G'
        },
        {new: true})
        .then((return_data) => {
            console.log("========== User has been updated successfully! ==========");
            console.log(return_data);
            const message = "User has been updated successfully!";
            const data = {
                "title" : "G Test",
                "user" : return_data, 
                showSuccessMessage : true,
                showErrorMessage: false,
                message: message,
                username: req.session.username,
                userType: req.session.userType
            }
            res.render('g_test', { data });
        })
        .catch((error) =>{
            console.log("Error: " + error);
            console.log("Error message: " + error.message);
            req.session.error = "Something went wrong while updating user information!";
            const data = {
                showSuccessMessage : false,
                showErrorMessage : true,
                message: req.session.error,
                "user" : null,
            }
            res.render('g_test', { data });
        });
    }
    //#endregion G TEST METHODS
   

    //#region G2 TEST METHODS
    static g2test_getController = async (req,res)=>{
        // User Detail Info
        const userDetail = await userModel.findById(req.session.userId).populate('appointment');
        console.log(userDetail);
        const appointmentInfo = userDetail.appointment == null ? new appointmentModel() : await appointmentModel.findById(userDetail.appointment.id);
        // let appointmentInfo = (userDetail.appointment == null || userDetail.testType == 'G') ? new appointmentModel() : await appointmentModel.findById(userDetail.appointment.id);
        console.log(appointmentInfo); 
        const gTestMessage = userDetail.licenseNo == "" ? "Please enter your personal information first!": null;
        req.session.appointmentTime = appointmentInfo.appointmentTime;
        const data = {
              "title" : "G2 Test",
              user: userDetail,
              appointment : appointmentInfo,
              username: req.session.username,
              userType: req.session.userType,
              showSuccessMessage: false,
              showErrorMessage: false,
              gTestMessage: gTestMessage
          }
          res.render('g2_test.ejs', { data });
    }

    static g2test_postController = async (req,res)=>{
        const user_data = req.body;
        const userId = req.session.userId;
        console.log(userId);

        const userInfo = await userModel.findById(req.session.userId);

        console.log(userInfo);

        const encryptedLicenseNo = (userInfo.licenseNo != '') ? userInfo.licenseNo : await bcrypt.hash(user_data.licenseNo, 10);
 
        await userModel.findByIdAndUpdate(
        req.session.userId,
        {
            firstName: user_data.firstName,
            lastName: user_data.lastName,
            licenseNo: encryptedLicenseNo,
            age: user_data.age,
            dob: user_data.dob,
            car_details : {
                make: user_data.make,
                model: user_data.model,
                year: user_data.year,
                plateNo: user_data.plateNo
            },
            appointment: user_data.appointmentTime,
            testType: 'G2'
        },
        {new: true})
        .then(async (return_data) => {
            console.log("========== User has been updated successfully! ==========");
            console.log(return_data);
            let inserted_appointment = new appointmentModel(); 
            await appointmentModel.findByIdAndUpdate(
                user_data.appointmentTime, 
                { isTimeSlotAvailable: false },
                {new: true})
                .then((return_appointment) => { 
                    inserted_appointment = return_appointment;
                    console.log("Updated appointment", return_appointment);
                    console.log("========== Appointment has been updated successfully! ==========");
                });

            const message = "User has been updated successfully!";
            const data = {
                title : "G2 Test",
                user : return_data, 
                appointment: inserted_appointment,
                showSuccessMessage : true,
                showErrorMessage: false,
                message: message,
                username: req.session.username,
                userType: req.session.userType
            }
            res.render('g2_test', { data });
        })
        .catch((error) =>{
            console.log("Error: " + error);
            console.log("Error message: " + error.message);
            req.session.error = "Something went wrong while updating user information!";
            const data = {
                "title" : "G2 Test",
                showSuccessMessage : false,
                showErrorMessage : true,
                message: req.session.error,
                user : null,
            }
            res.render('g2_test', { data });
        });
    }
    //#endregion G2 TEST METHODS
    

     //#region APPOINTMENT METHODS
     static appointment_getController = async (req, res) => {
        
        const data = {
            title: "Appointment",
            showErrorMessage: false,
            showSuccessMessage: false
        }
        res.render("appointment.ejs", { data });
      };

      static appointment_postController = async (req,res)=>{
        const { appointmentDate } = req.body;
        var selectedTimeSlot = req.body["selected-time-slot"];

        const appointment_in_db  = await appointmentModel.findOne({ appointmentDate: appointmentDate, appointmentTime: selectedTimeSlot });
        
        // If appointment is already saved, return an error message to the page
        if(appointment_in_db){   
            const data = {
                title: "Appointment",
                showErrorMessage: true,
                showSuccessMessage: false,
                message: "An appointment already exists in this date and time slot!"
            }
         
            res.render("appointment", { data });
        }
        else{


         // Now we can use AppointmentModel to save the appointment in db
         await appointmentModel.create({
            appointmentDate: appointmentDate,
            appointmentTime: selectedTimeSlot,
            isTimeSlotAvailable : true
          }).then(()=>{
                  const data = {
                      title: "Appointment",
                      showErrorMessage: false,
                      showSuccessMessage: true,
                      message: "Appointment created successfully!"
                  }
               
                  res.render("appointment", { data });
                  
          }).catch((error)=>{
              const data = {
                title: "Appointment",
                showErrorMessage: false,
                showSuccessMessage: true,
                message: error
            }
              res.render("appointment", { data });
              console.log(error)
          });
        }
    }

    static appointmentList_getController = async (req, res) => {

        var selectedDate = req.query.selectedDate;
        
        // Get Appointment List
        const appointmentList = await appointmentModel.find({ appointmentDate: selectedDate });
        console.log(appointmentList);
        console.log(appointmentList.length);
       
        res.json(appointmentList);
      };

      
    //#endregion APPOINTMENT METHODS

      //#region EXAMINER METHODS
      static examiner_getController = async (req, res) => {
            const query = req.query;
            const appointmentList = await userModel.find({ appointment: { $exists: true } })
            .populate('appointment');

            const data = {
                title: "Examiner",
                appointmentList: appointmentList,
                showErrorMessage: false,
                showSuccessMessage: false,
                query: query
            }
            res.render("examiner.ejs", { data, req });
        };

      static examresult_getController = async (req, res) => {
        
        const userList = await userModel.find({ testResult: { $exists: true } })
        .populate('appointment');

        const data = {
            title: "Exam Results",
            userList: userList,
            showErrorMessage: false,
            showSuccessMessage: false
        }
        res.render("exam_result.ejs", { data });
      };


      //#endregion EXAMINER METHODS

    //#region DASHBOARD METHODS
    static dashboardController =async (req, res) => {
        // Middleware restricting the user and redirect them to go to login page if its not a valid user. 
        const userDetail = await userModel.findById(req.session.userId);
        const message = ( req.session.userType == 'driver' && userDetail.licenseNo == '') ? "You should enter your information in G2 Test page!" : "";
        
        const data = {
            title: "Dashboard",
            g2message: message,
            userType: req.session.userType
        }
        res.render("dashboard.ejs", { data });
      };
    //#endregion DASHBOARD METHODS


    //#region SIGNUP METHODS
    static signup_getController = (req,res)=>{
        // We have to delete the session, because we have to use render method for getting route.
        // If someone enter the signup page, there should be no  error message, thats why we deleting the message, and keep it empty. 
        delete req.session.error;
        const newUser = new userModel({
            username: null,
            password: null,
            userType: null
          });
        const data = {
            title: "Sign Up",
            showSuccessMessage: false, 
            showErrorMessage: false,
            user: newUser
        }
        res.render("signup", { data });
    }

    static signup_postController = async (req,res)=>{
        // Getting the Form Data from signup.ejs
        const{username,password,confirm_password,userType} = req.body

        // First we check that it is not already in mongodb
        // findOne({key:value}) key will be key from userModel and its value is coming from form

        if(password == confirm_password){
        const user_in_db  = await userModel.findOne({ username }) 
        
        // If user is already registered send it to login page
        if(user_in_db){   
            delete req.session.loginMessage;      
            req.session.error = "User already exists";
            req.session.username = user_in_db.name
            console.log(req.session.username)
        
            return res.redirect("/login");
        }
        else{
            // First We have to change the password from form to hashed password using bcypt
            const hashedPwd = await bcrypt.hash(password,10)

            // Now We can use User Model to save the user in db
           await userModel.create({
                username:username,
                userType:userType,
                password : hashedPwd
            }).then(()=>{
                    req.session.userType = userType;
                    req.session.loginMessage = "User created successfully, please login!";
                    const data = {
                        title: "Login",
                        showErrorMessage: false,
                        showSuccessMessage: false,
                        showLoginMessage: req.session.loginMessage,
                        user: req.body
                    }
                 
                    res.render("login", { data });
                    
            }).catch((error)=>{
                req.session.error = error;
                delete req.session.loginMessage;
                const data = {
                    title: "Login",
                    showErrorMessage: true,
                    message: req.session.error
                }
                res.render("login", { data });
                console.log(error)
            })
         }
        }
        else{
            req.session.error = "Password not match!";
            const data = {
                title: "Sign Up",
                showSuccessMessage: false, 
                showErrorMessage: true,
                message: req.session.error,
                user: req.body
            }
            return res.render("signup", { data });
        }
    }
    //#endregion SIGNUP METHODS


    //#region LOGIN METHODS
    static login_getController=(req,res)=>{
        delete req.session.useradded ;
        const loginMessage = req.session.loginMessage;
        const errorMessage = req.session.error;
        const message = loginMessage != null ? loginMessage : errorMessage;
        const data = {
            title: "Login",
            showSuccessMessage: loginMessage != null ? true : false,
            showErrorMessage: errorMessage != null ? true : false,
            message: message
        }
        res.render("login", { data });
        delete req.session.error;
    }

    static login_postController = async (req,res)=>{
        const{username,password} = req.body

        // First we verify that user is existing user in mongo db
        const user_verify = await userModel.findOne({username})
        if(!user_verify){
            delete req.session.loginMessage;
            req.session.error = "User not found, please sign up first!";
            const data = {
                title: "Sign Up",
                showSuccessMessage: false, 
                showErrorMessage: true,
                message: req.session.error,
            }
            res.render("signup", { data });
        }
        else {
            // Now We know That user is in db
            // We have to cofirm the password by decrypting it 
            const pwd_matched = await bcrypt.compare(password,user_verify.password)

            if(!pwd_matched){
                delete req.session.loginMessage;
                req.session.error = "Invalid username or password, try again";
                const data = {
                    title: "Login",
                    message: req.session.error,
                    showErrorMessage: true
                }
                res.render("login", { data });
            }
            else{
                req.session.isFoundInDb = true;
                req.session.userType = user_verify.userType;
                req.session.username = user_verify.username;
                req.session.userId = user_verify._id;

                const data = { 
                    title: "Dashboard",
                    showErrorMessage: true,
                    showSuccessMessage: false,
                };
                res.redirect("/dashboard");
            }
        }
    }
    //#endregion LOGIN METHODS


    //#region LOGOUT METHODS
    static logout_getController=(req,res)=>{
       // we destroy the sesion to remove any variables attached
       req.session.destroy()
       // Code below will start a new session
       res.redirect('/login')
    }
    //#endregion LOGOUT METHODS

}

export default UserController