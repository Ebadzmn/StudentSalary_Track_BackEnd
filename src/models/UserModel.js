const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["user", "admin1"],
        default : "user"
    }
},
{
    timestamps : true,
    versionKey  : false
})

const User = mongoose.model('User', UserSchema);
module.exports = User;