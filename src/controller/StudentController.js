const {createStudent,saveSalary,GetSalaryByStudentId,TotalSalaryAmount,GetStudent,BatchCount,GetStudentByBatch,SearchStudent,getStudentById,CountAllSalary} = require('../Service/StudentServices');

exports.createStudent = async (req, res) => {
    let result = await createStudent(req, res);
    return res.status(200).json(result);
}

exports.saveSalary = async (req, res) => {
    let result = await saveSalary(req, res);
    return res.status(200).json(result);
}

exports.GetSalaryByStudentId = async (req, res) => {
    let result = await GetSalaryByStudentId(req, res);
    return res.status(200).json(result);
}

exports.GetStudent = async (req, res) => {
    let result = await GetStudent(req, res);
    return res.status(200).json(result);
}

exports.BatchCount = async (req, res) => {
    let result = await BatchCount(req, res);
    return res.status(200).json(result);
}

exports.GetStudentByBatch = async (req, res) => {
    let result = await GetStudentByBatch(req, res);
    return res.status(200).json(result);
}

exports.SearchStudent = async (req, res) => {
    let result = await SearchStudent(req, res);
    return res.status(200).json(result);
}

exports.getStudentById = async (req, res) => {
    let result = await getStudentById(req, res);
    return res.status(200).json(result);
}

exports.CountSalary = async (req, res) => {
    let result = await CountAllSalary(req, res);
    return res.status(200).json(result);
}

exports.TotalSalaryAmount = async (req, res) => {
    let result = await TotalSalaryAmount(req, res);
    return res.status(200).json(result);
}
