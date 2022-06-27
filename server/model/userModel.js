const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    firstName:{
        type: String,
        required: [true,'please add a firstName']
    },
    lastName:{
        type: String,
        required: [true,'please add a lastName']
    },email:{
        type: String,
        required: [true,'please add a email'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'please add a password']
    },
    role:{
        type: String,
        required: [true,'please add a role']
    },boughtCourses:[{

        type:mongoose.Schema.Types.ObjectId,
        ref: 'Courses'

    }],

},{

    timestamps:true

})

module.exports = mongoose.model('Users',userSchema)