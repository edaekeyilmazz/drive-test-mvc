// Eda Ekeyilmaz -8823564
// Namitha Chevari - 8817006

const isValid  = (req, res, next) => {
    // We declare a middleware, and use it between request and response part
    // After send a request, then middleware checks, then we get response.
      if (req.session.isFoundInDb) {
        next();
      } else {
        req.session.error = "You have to Login first";
        const data = {
            title: "Login",
            error: req.session.error
        }
        res.redirect("/login");
      }
    };


    const isAuthAdmin  = (req, res, next) => {
        if (req.session.isFoundInDb && req.session.userType != "admin") {
          req.session.error = "Users other than 'Admin' do not have access this page!";
          const data = {
            title: "Dashboard",
            showErrorMessage: true,
            message: req.session.error
        }
        res.render("dashboard", { data });
        } else {
          next();
        }
      };
  
      const isAuthDriver  = (req, res, next) => {
        if (req.session.isFoundInDb && req.session.userType != "driver") {
          req.session.error = "Users other than 'Driver' do not have access this page !";
          const data = {
              title: "Dashboard",
              showErrorMessage: true,
              message: req.session.error
          }
          res.render("dashboard", { data });
        } else {
          next();
        }
      };
  
      const isAuthExaminer  = (req, res, next) => {
        if (req.session.isFoundInDb && req.session.userType != "examiner") {
          req.session.error = "Users other than 'Examiner' do not have access this page !";
          const data = {
              title: "Dashboard",
              showErrorMessage: true,
              message: req.session.error
          }
          res.render("dashboard", { data });
        } else {
          next();
        }
      };
        
  export {
    isValid,
    isAuthAdmin,
    isAuthDriver,
    isAuthExaminer
  }
