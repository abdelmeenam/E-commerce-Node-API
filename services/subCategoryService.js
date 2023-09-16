const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const ApiError = require('../utils/apiError');
const SubCategory = require('../models/subCategoryModel')

// @desc    createSubCategory
// @route   POST /api/v1/subCategories
// @access  Private
const createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({ name, slug: slugify(name), category });
    res.status(201).json({ data: subCategory });
});

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: subCategories.length, page, data: subCategories });
})

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
const getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
        return next(new ApiError(`No subCategory fot this id: ${id} `, 404))
    }
    res.status(200).json({ data: subCategory });
});

// @desc Delete subcategory by id
// @route DELETE /api/v1/subcategories/:id
// @access Private
const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
        return next(new ApiError(`No subCategory fot this id: ${id} `, 404))
    }
    res.status(204).json({ msg: 'SubCategory deleted successfully' });
});


// @desc Update specific subCategory 
// @route PUT /api/v1/subcategories/:id
// @access Private
const updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subCategory = await SubCategory.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name), category },
        { new: true }
    );

    if (!subCategory) {
        return next(new ApiError(`No subCategory fot this id: ${id} `, 404))
    }
    res.status(200).json({ data: subCategory });

});

module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    deleteSubCategory,
    updateSubCategory
}