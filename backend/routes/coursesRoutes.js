const express = require('express')
const router = express.Router()
const {getCourses, postCourses, updateCourses, deleteCourses, likeCourse} = require('../controllers/courseController')
const { protect } = require('../middleware/authMiddleware')
const roleCheck = require('../middleware/roleMiddleware')

router.get('/',getCourses).post('/',protect,roleCheck(['admin','lecturer']),postCourses)
router.put('/:id',protect,roleCheck(['admin','lecturer']),updateCourses).delete('/:id',protect,roleCheck(['admin','lecturer']),deleteCourses)
router.put('/like/:id',protect,likeCourse)
module.exports = router