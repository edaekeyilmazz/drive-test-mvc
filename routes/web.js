import  express  from 'express'

import UserController  from '../controllers/UserController.js'

import { isValid, isAuthAdmin, isAuthDriver, isAuthExaminer } from '../middlewares/middleware.js'
import appointmentModel from '../models/appointment.js';

const router = express.Router()


export const getAvailableTimeSlots = async (req, res) => {
    // const { date, isTimeSlotAvailable } = req.params;

   const selectedDate = req.params.date;
  const isTimeSlotAvailable = req.params.isTimeSlotAvailable;

    console.log("date", selectedDate);
    
    const availableTimeSlots = await appointmentModel
        .find({ appointmentDate: selectedDate, isTimeSlotAvailable: isTimeSlotAvailable })
        .sort({ appointmentTime: 1 });
    
    
    console.log("availableTimeSlots", availableTimeSlots);
    console.log("availableTimeSlots length", availableTimeSlots.length);
 
    if (availableTimeSlots) {
      res.send({ available_time_slots: availableTimeSlots });
    } else {
      res.send(null);
    }
  };


// DASHBOARD
router.get('/', UserController.dashboardController)
router.get('/dashboard',isValid, UserController.dashboardController)

// G TEST
router.get('/g_test', isValid, isAuthDriver, UserController.gtest_getController)
router.post('/g_test', isValid, isAuthDriver, UserController.gtest_postController)

// G2 TEST
router.get('/g2_test', isValid, isAuthDriver,  UserController.g2test_getController)
router.post('/g2_test', isValid, isAuthDriver,  UserController.g2test_postController)

// APPOINTMENT
router.get('/appointment', isValid, isAuthAdmin, UserController.appointment_getController)
router.post('/appointment', isValid, isAuthAdmin, UserController.appointment_postController)
router.get("/get-available-time-slots/:date/:isTimeSlotAvailable", getAvailableTimeSlots);
router.get('/exam_result', isValid, isAuthAdmin, UserController.examresult_getController)

// EXAMINER
router.get('/examiner', isValid, isAuthExaminer, UserController.examiner_getController)
// router.post('/examiner', isValid, isAuthExaminer, UserController.examiner_postController)

// DRIVER RESULT
router.get('/driver_result', isValid, isAuthDriver, UserController.driverresult_getController)


// SIGNUP
router.get('/signup', UserController.signup_getController)
router.post('/signup', UserController.signup_postController)

// LOGIN
router.get('/login', UserController.login_getController)
router.post('/login', UserController.login_postController)

// LOGOUT
router.get('/logout', UserController.logout_getController)




export default router