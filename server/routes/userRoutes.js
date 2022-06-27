const express = require('express')
const router = express.Router()
const { deleteUserCourse,addUserCourse,registerUser, loginUser, getUserData, getAllUserData, deleteUser, updateUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const roleCheck = require('../middleware/roleMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me', protect ,getUserData)
router.post('/all' ,roleCheck(['admin']),getAllUserData)
router.put('/:id',protect,roleCheck(['admin']),updateUser).delete('/:id',protect,roleCheck(['admin']),deleteUser)
router.put('/course/:id',protect,addUserCourse)
router.put('/course/delete/:id',protect,deleteUserCourse)

module.exports = router