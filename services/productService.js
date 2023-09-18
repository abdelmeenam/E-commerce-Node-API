const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

// @desc    Get list of Products
// @route   GET /api/v1/Products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await Product.find({})
        .skip(skip)
        .limit(limit)
        .populate({ path: "category", select: 'name-_id' });;
    res.status(200).json({ results: categories.length, page, data: categories });
})

// @desc    Get specific Product by id
// @route   GET /api/v1/Products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate({ path: "category", select: 'name-_id' });
    if (!product) {
        return next(new ApiError(`No Product fot this id: ${id} `, 404))
    }
    res.status(200).json({ data: product });
});

// @desc    create
// @route   POST /api/v1/Products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
});

// @desc    Update specific Product
// @route   PUT /api/v1/Products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.slug) slugify(req.body.title);

    const product = await Product.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    );

    if (!product) {
        return next(new ApiError(`No Product fot this id: ${id} `, 404))
    }
    res.status(200).json({ data: product });
});


// @desc    Delete specific Product
// @route   DELETE /api/v1/Products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return next(new ApiError(`No Product fot this id: ${id} `, 404))
    }
    res.status(204).send();
});


module.exports = {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
}