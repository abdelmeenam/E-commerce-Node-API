const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const createProductValidator = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars')
        .notEmpty()
        .withMessage('Product required'),
    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 2000 })
        .withMessage('Too long description'),
    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Product quantity must be a number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product sold quantity must be a number'),
    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number')
        .isLength({ max: 32 })
        .withMessage('To long price'),
    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .toFloat()
        .custom((value, { req }) => {
            if (value >= req.body.price) {
                throw new Error('priceAfterDiscount must be lower than price');
            }
            return true;
        }),
    check('colors')
        .optional()
        .isArray()
        .withMessage('availableColors should be array of string'),
    check('imageCover').notEmpty().withMessage('Product imageCover is required'),
    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string'),
    check('category')
        .notEmpty()
        .withMessage('Product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid ID formate'),
    check('subcategorie')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate'),
    check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('ratingsAverage must be a number')
        .isLength({ min: 1 })
        .withMessage('Rating must be above or equal 1.0')
        .isLength({ max: 5 })
        .withMessage('Rating must be below or equal 5.0'),
    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingsQuantity must be a number'),
    validatorMiddleware,
]

const getProductValidator = [
    check('id').isMongoId().withMessage("Invalid Product id format"),
    validatorMiddleware,
]

const updateProductValidator = [
    check('id').isMongoId().withMessage("Invalid Product id format"),
    validatorMiddleware
]

const deleteProductValidator = [
    check('id').isMongoId().withMessage("Invalid Product id format"),
    validatorMiddleware
]

module.exports = {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
}
