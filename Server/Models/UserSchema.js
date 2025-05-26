const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Enter your mail ID'],
        unique: true  
    },
    password: {
        type: String,
        required: [true, "Enter your password"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User', UserSchema);
