const express = require('express');
const { param, validationResult } = require('express-validator');

const { getCategories, createCategory, getCategory, deleteCategory, updateCategory } = require('../services/categoryService');

const router = express.Router();
router.route('/').get(getCategories).post(createCategory)
router.route('/:id')
    .get(param('id').isMongoId().withMessage("Invalid category id"),
        (req, res) => {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
        }
        , getCategory)
    .delete(deleteCategory)
    .put(updateCategory)


module.exports = router;