const express = require('express')
const router = express.Router()
const {getCategories,postCategory,updateCategory,deleteCategory} = require('../controllers/categoryController')
const { protect } = require('../middleware/authMiddleware')
const roleCheck = require('../middleware/roleMiddleware')

router.get('/',getCategories).post('/',protect,roleCheck(['admin']),postCategory)
router.put('/:id',protect,roleCheck(['admin']),updateCategory).delete('/:id',protect,roleCheck(['admin']),deleteCategory)

module.exports = router