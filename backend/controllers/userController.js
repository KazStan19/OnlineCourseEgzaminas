const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHanlder =  require('express-async-handler')
const User = require('../model/userModel')



// @desc register user
// @route Post /user
// @access public

const registerUser = asyncHanlder(async(req,res) =>{

    const {firstName,lastName,email,password,role} = req.body

    if(!firstName || !lastName || !email || !password || !role){

        res.status(400)
        throw new Error('Please fill in all the empty fields')

    }

    const userExists = await User.findOne({email})

    if(userExists){

        res.status(400)
        throw new Error('user exists')

    }

    //hashing password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({

        firstName,
        lastName,
        email,
        password:hashedPassword,
        role

    })

    if(user){

        res.status(201).json({

            _id:user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: genToken(user._id)

        })

    }

})

// @desc login user
// @route Post /user/login
// @access public

const loginUser = asyncHanlder(async(req,res) =>{

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){

        res.status(201).json({

            _id:user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            boughtCourses:user.boughtCourses,
            token: genToken(user._id)

        })

    }else{

    res.status(400)
    throw new Error('invalid crendentials')

    }

})

// @desc get user data
// @route Get /user/
// @access private

const getUserData = asyncHanlder(async(req,res) =>{

    const {_id,firstName,lastName,email,role,boughtCourses} = await User.findById(req.user.id)

    
    res.status(200).json({

        id:_id,
        firstName,
        lastName,
        email,
        role,
        boughtCourses

    })

})

// @desc add user bought course
// @route Put /user/course
// @access private

const addUserCourse = asyncHanlder(async(req,res) =>{

    const user = await User.findById(req.user.id)

    if(!user){

        res.status(400)
        throw new Error('user is not found')

    }

    if(user.boughtCourses.includes(req.body.courseId)){

        res.status(400)
        throw new Error('Course is already bought')

    }

    const UserUpdated = await User.findByIdAndUpdate(req.params.id,{boughtCourses:[...user.boughtCourses,req.body.courseId]},{ new:true })
    
    res.status(200).json(UserUpdated.boughtCourses)

})

// @desc delete user bought course
// @route put /user/course/delete
// @access private

const deleteUserCourse = asyncHanlder(async(req,res) =>{

    const user = await User.findById(req.user.id)

    if(!user){

        res.status(400)
        throw new Error('user is not found')

    }

    //console.log(user.boughtCourses)

    const updatedCourseList = user.boughtCourses.filter(course => course != req.body.courseId)    

    const UserUpdated = await User.findByIdAndUpdate(req.params.id,{boughtCourses:updatedCourseList},{ new:true })


    res.status(200).json(updatedCourseList)

})

// @desc get all of users data
// @route Get /user/all
// @access private admin only

const getAllUserData = asyncHanlder(async(req,res) =>{

    const users = await User.find().populate({
        path: 'boughtCourses',
        model: 'Courses'
    }).exec((err,user) =>{

        res.status(200).json(user)
    })

})

// @desc updates a specific user
// @route Put /user
// @access admin

const updateUser = asyncHanlder(async(req,res) =>{

    const user = await User.findById(req.params.id)
    const {firstName,lastName,email,role} = req.body
    
    if(!user){

        res.status(400)
        throw new Error('user is not found')

    }

    if(!firstName || !lastName || !email || !role){

        res.status(400)
        throw new Error("please fill in empty fields")

    }

    const UserUpdated = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true })

    console.log(UserUpdated)

    res.status(200).json(`updated ${User} to ${UserUpdated}`)
})

// @desc deletes a specific user
// @route Delete /user
// @access admin

const deleteUser = asyncHanlder(async(req,res) =>{
    const user = await User.findById(req.params.id)
    
    if(!user){

        res.status(400)
        throw new Error('user is not found')

    }

    await user.remove()

    res.status(200).json(req.params.id)
})



const genToken = (id) => {

    return jwt.sign({id},process.env.JWT_SECRET,{

        expiresIn:'30d'

    })

}

module.exports = {
    deleteUserCourse,addUserCourse,registerUser,loginUser,getUserData,getAllUserData,updateUser,deleteUser
}