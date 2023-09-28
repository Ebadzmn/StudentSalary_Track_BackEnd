const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const SalaryAddSchema = new Schema({
        StudentID: {
            type: ObjectId,
            required: true,
        },
    Date: {
            type: String,
            required: true,
    },
    Month: {
            type: String,
            required: true,
    },
    Year: {
            type: String,
            required: true,
    },
    Amount: {
            type: String,
            required: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    })

const SalaryAdd = mongoose.model('Salary', SalaryAddSchema);
module.exports = SalaryAdd;