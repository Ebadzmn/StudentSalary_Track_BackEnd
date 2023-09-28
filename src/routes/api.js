const express = require('express');
const router = express.Router();

const { signup, signIn } = require('../controller/UserController');
const { requireSignin, isAdmin } = require('../middleware/auth');
const { createStudent,saveSalary,CountSalary,TotalSalaryAmount,GetSalaryByStudentId,GetStudent,BatchCount,GetStudentByBatch,SearchStudent,getStudentById} = require('../controller/StudentController');

//Auth Routes
router.post('/signup2558', signup);
router.post('/signIn', signIn);



//Student Routes
router.post('/createStudent', requireSignin, isAdmin, createStudent);
router.post('/saveSalary', requireSignin, isAdmin, saveSalary);

router.get('/GetSalaryByStudentId/:StudentID', requireSignin,  GetSalaryByStudentId);
router.get('/GetStudent', requireSignin,  GetStudent);
router.get('/BatchCount', requireSignin,  BatchCount);
router.get('/GetStudentByBatch/:StudentBatch', requireSignin,  GetStudentByBatch);
router.get('/SearchStudent/:name', requireSignin,  SearchStudent);
router.get('/getStudentById/:StudentID', requireSignin,  getStudentById);
router.get('/CountSalary', requireSignin,  CountSalary);
router.get('/TotalSalaryAmount', requireSignin,  TotalSalaryAmount);



module.exports = router;