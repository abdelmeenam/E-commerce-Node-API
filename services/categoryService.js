const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, page, data: categories });
})

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
const getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        //res.status(404).json({ msg: `No category for this id ${id}` });
        return next(new ApiError(`No category fot this id: ${id} `, 404))
    }
    res.status(200).json({ data: category });
});

// @desc    create
// @route   POST /api/v1/Categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );

    if (!category) {
        //res.status(404).json({ msg: `No category for this id ${id}` });
        return next(new ApiError(`No category fot this id: ${id} `, 404))

    }
    res.status(200).json({ data: category });
});


// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        //res.status(404).json({ msg: `No category for this id ${id}` });
        return next(new ApiError(`No category fot this id: ${id} `, 404))
    }
    res.status(204).send();
});


module.exports = {
    getCategories,
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
}