const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const Brand = require('../models/brandModel');
const ApiError = require('../utils/apiError');

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brands = await Brand.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: brands.length, page, data: brands });
})


// @desc    Get specific brands by id
// @route   GET /api/v1/brands/:id
// @access  Public
const getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
        //res.status(404).json({ msg: `No Brand for this id ${id}` });
        return next(new ApiError(`No Brand fot this id: ${id} `, 404))
    }
    res.status(200).json({ data: brand });
});

// @desc    create brand
// @route   POST /api/v1/brand
// @access  Private
const createBrand = asyncHandler(async (req, res) => {
    const { name, image } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name), image });
    res.status(201).json({ data: brand });
});

// @desc    Update specific Brand
// @route   PUT /api/v1/Brands/:id
// @access  Private
const updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, image } = req.body;

    const brand = await Brand.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name), image },
        { new: true }
    );

    if (!brand) {
        //res.status(404).json({ msg: `No Brand for this id ${id}` });
        return next(new ApiError(`No Brand fot this id: ${id} `, 404))

    }
    res.status(200).json({ data: brand });
});


// @desc    Delete specific Brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private
const deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
        //res.status(404).json({ msg: `No Brand for this id ${id}` });
        return next(new ApiError(`No Brand fot this id: ${id} `, 404))
    }
    res.status(204).send();
});


module.exports = {
    getBrands,
    createBrand,
    getBrand,
    deleteBrand,
    updateBrand
}