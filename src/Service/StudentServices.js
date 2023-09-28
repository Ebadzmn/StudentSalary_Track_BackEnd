let StudentModel = require('../Models/StudentModel');
let SalaryModel = require('../Models/SalaryAddModel');
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;


// Create and Save a new Student

exports.createStudent= async (req, res) => {
    try{
         const {StudentName, StudentPhone, StudentAddress, Class, StudentBatch} = req.body;
         const Student = await StudentModel.create({StudentName, StudentPhone, StudentAddress, Class, StudentBatch});
            return {status: "success", message: "Student created successfully", data: Student}

    }
    catch(err){
        return {status: "error", message: "Error creating student"}
    }
}

// Save Salary of a Student

exports.saveSalary = async (req, res) => {
    try{
        const ReqBody = req.body;
        const Salary = await SalaryModel.create(ReqBody);
          return {status: "success", message: "Salary saved successfully", data: Salary}
    }
    catch(err){
        return {status: "error", message: "Error saving salary"}
    }
}

exports.GetStudent = async (req, res) => {
    try{
        const Student = await StudentModel.find();
        return {status: "success", message: "Student fetched successfully", data: Student}
    }
    catch(err){
        return {status: "error", message: "Error fetching student"}
    }
}


exports.GetSalaryByStudentId = async (req, res) => {
    try{
        const StudentID = req.params.StudentID;

        let MatchStage = {
            $match: {
                StudentID: new ObjectId(StudentID)
            }
        }
        let LookupStage = {
            $lookup: {
                from: "students",
                localField: "StudentID",
                foreignField: "_id",
                as: "Student"
            }
        }
        let unwindStage = {
            $unwind: "$Student"
        }
        let ProjectStage = {
            $project: {
                StudentID: 1,
                StudentName: "$Student.StudentName",
                StudentPhone: "$Student.StudentPhone",
                StudentAddress: "$Student.StudentAddress",
                Class: "$Student.Class",
                StudentBatch: "$Student.StudentBatch",
                Date: 1,
                Month: 1,
                Year: 1,
                Amount: 1
            }
        }
        let data = await SalaryModel.aggregate([MatchStage, LookupStage, unwindStage, ProjectStage]);
        return {status: "success", message: "Salary fetched successfully", data: data}
    }
    catch(err){
        return {status: "error", message: "Error fetching salary"}
    }
}


exports.BatchCount = async (req, res) => {
    try{

        let GroupStage = {
            $group: {
                _id: "$StudentBatch",
                count: {
                    $sum: 1
                }
            }
        }
        let data = await StudentModel.aggregate([GroupStage]);
        return {status: "success", message: "Batch count fetched successfully", data: data}
    }
    catch(err){
        return {status: "error", message: "Error fetching batch count"}
    }
}


exports.GetStudentByBatch = async (req, res) => {
    try{
        const StudentBatch = req.params.StudentBatch;

        let MatchStage = {
            $match: {
                StudentBatch: StudentBatch
            }
        }

        let data = await StudentModel.aggregate([ MatchStage]);
        return {status: "success", message: "Batch count fetched successfully", data: data}
    }
    catch(err){
        return {status: "error", message: "Error fetching batch count"}
    }
}


exports.SearchStudent = async (req, res) => {
    try{
        let Search = req.params.name;
        let regex = new RegExp(Search, 'i');
        let Student = await StudentModel.find({StudentName: regex});
        return {status: "success", message: "Student fetched successfully", data: Student}

    }
    catch(err){
        return {status: "error", message: "Error fetching batch count"}
    }
}

exports.getStudentById = async (req, res) => {
    try{
        const StudentID = req.params.StudentID;
        let Student = await StudentModel.findById(StudentID);
        return {status: "success", message: "Student fetched successfully", data: Student}

    }
    catch(err){
        return {status: "error", message: "Error fetching batch count"}
    }
}

exports.CountAllSalary = async (req, res) => {
    try{
        let GroupStage = {
            $group: {
                _id: null,
                count: {
                    $sum: 1
                }
            }
        }
        let data = await SalaryModel.aggregate([GroupStage]);
        return {status: "success", message: "Batch count fetched successfully", data: data}
    }
    catch(err){
        return {status: "error", message: "Error fetching batch count"}
    }
}

exports.TotalSalaryAmount = async (req, res) => {
    try{
        let GroupStage = {
            $group: {
                _id: null,
                TotalAmount: {
                    $sum: {$toDouble: "$Amount"}
                }
            }
        }
        let data = await SalaryModel.aggregate([GroupStage]);
        return {status: "success", message: "Batch count fetched successfully", data: data}
    }
    catch(err){
        return {status: "error", message: "Error fetching batch count"}
    }
}