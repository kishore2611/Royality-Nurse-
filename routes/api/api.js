const router = require('express').Router()
const { Router } = require('express')

const { verifyToken } = require('../../middlewares/authentication')
const { upload } = require('../../middlewares/multer')
const { authorizeRoles } = require('../../middlewares/authorizeRoles')

const { register, login, verifyUser, logOut, resendCode, forgotPassword, verifyCode, resetPassword, updatePassword, socialLogin } = require('../../controllers/authController')
const { getContent, getNotifications } = require('../../controllers/commonController')
const { profileSetup, userDetail, getDocuments, updateUser, getAllUsers } = require('../../controllers/userController')
const { documents, approvedoc } = require('../../controllers/docController')
const { postShift, getShifts, getSingleShift, applyShift, approveshift, jobStatus, getJobs, myPreviousShifts, myUpcomingShifts, myRunningShifts } = require('../../controllers/hospitalController')
const { getTimesheet, test } = require('../../controllers/timesheetController')
const { time, list } = require('../../controllers/timeController')




//Authentication
router.post('/register', register)
router.post('/verifyUser', verifyUser)
router.post('/resendCode', resendCode)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/verifyCode', verifyCode)
router.post('/resetPassword', resetPassword)
router.post('/updatePassword', verifyToken, updatePassword)
router.post('/logOut', verifyToken, logOut)
router.post('/socialLogin', socialLogin)


/** Content */
router.get('/get-content/:type', getContent);


//Profile
router.get('/getAllUsers', getAllUsers)
router.post('/profilesetup', verifyToken, upload.single('profilePicture'), profileSetup)
router.get('/getUser', verifyToken, userDetail)
router.get('/getDocuments', verifyToken, getDocuments)
router.put('/updateUser', verifyToken, upload.single('profilePicture'), updateUser)

//documents
router.post('/documents', verifyToken, upload.fields([
    { name: "driverLicense" },
    { name: "cnaCertificate" },
    { name: "nursingLicense" },
    { name: "socialSecurity" },
    { name: "cpr" },
    { name: "bls" },
    { name: "acls" },
    { name: "covidVaccination" },
    { name: "hepatitesSeries" }
]), documents)
router.put('/approvedoc', verifyToken, approvedoc)




//Hospital
router.post('/addShift', verifyToken, authorizeRoles("hospital"), postShift)
router.get('/getShifts', verifyToken, getShifts)
router.get('/getSingleShift/:_id', verifyToken, getSingleShift)
router.post('/applyShift', verifyToken, applyShift)
router.put('/approveshift', verifyToken, authorizeRoles("hospital"), approveshift)     
router.post('/jobStatus', verifyToken, authorizeRoles("hospital"), jobStatus)
router.get('/getjobs', verifyToken, getJobs)

router.get('/myPreviousShifts', verifyToken, myPreviousShifts)
router.get('/myUpcomingShifts', verifyToken, myUpcomingShifts)

router.get('/myRunningShifts', verifyToken, myRunningShifts)





//Timesheet
// router.post('/timesheet', verifyToken, timesheet)
router.get('/getTimesheet/:newdate', verifyToken, getTimesheet)

// router.post('/checkinout', verifyToken, checkinout)

router.post('/test', verifyToken, test)











router.post('/time', verifyToken, time)
router.get('/list/:newdate', verifyToken, list)


router.get('/getnotifications', verifyToken, getNotifications)

module.exports = router;