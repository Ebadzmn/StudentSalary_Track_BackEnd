const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    StudentName : {
        type : String,
        required : true,
    },
    StudentPhone : {
        type : String,
        required : true,
    },
    StudentAddress : {
        type : String,
        default : "Dhaka",
    },
    Class : {
        type : String,
        required : true,
    },
    StudentBatch : {
        type : String,
        required : true,
    },

},
    {
        timestamps : true,
        versionKey  : false
    }
)

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;