const asyncHanlder =  require('express-async-handler')

const Category = require('../model/categoriesModel')
// @desc get Categories
// @route Get /category
// @access public

const getCategories = asyncHanlder(async(req,res) =>{
    const Categories = await Category.find()
    
    res.status(200).json(Categories)
})

// @desc adds a Category
// @route Post /category
// @access admin

const postCategory = asyncHanlder(async(req,res) =>{

    if(!req.body.name){

        res.status(400)
        throw new Error("please add name field")

    }

    const Categories = await Category.create({
        
        name: req.body.name,

    })

    res.status(200).json(Categories)
})

// @desc updates a specific Category
// @route Put /category
// @access admin

const updateCategory = asyncHanlder(async(req,res) =>{
    const category = await Category.findById(req.params.id)
    
    if(!category){

        res.status(400)
        throw new Error('Category is not found')

    }

    if(!req.body.name){

        res.status(400)
        throw new Error("please add name field")

    }

    const CategoryUpdated = await Category.findByIdAndUpdate(req.params.id,req.body,{ new:true })

    res.status(200).json(`updated ${Category} to ${CategoryUpdated}`)
})

// @desc deletes a specific Category
// @route Delete /category
// @access admin

const deleteCategory = asyncHanlder(async(req,res) =>{
    const category = await Category.findById(req.params.id)
    
    if(!category){

        res.status(400)
        throw new Error('Category is not found')

    }

    await category.remove()

    res.status(200).json(req.params.id)
})

module.exports = {
    getCategories,postCategory,updateCategory,deleteCategory
}