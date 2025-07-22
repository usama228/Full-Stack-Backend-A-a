const asyncHandler = require('express-async-handler');
const { Category } = require('../models');
const { ERROR_LIST } = require('../middleware/authMiddleware');


const addCategory = asyncHandler(
    async (req, res) => {
        try {
            const { name, description, parent_id, avatar } = req.body;
            if (!name || !description) {
                res.status(400).json({ message: 'All required fields must be provided' });
                return;
            }
            const category = await Category.create({
                name, description, parent_id, avatar
            });
            if (category) {
                res.status(200).json({
                    data:category,
                    succeeded: true,
                    message: `category Added successfully`
                });
            } else {
                res.status(400);
                throw new Error(ERROR_LIST.INVALID_DATA);
            }
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
        }
    })
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { id, name, description, parent_id, avatar } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "category not found." });
        }
        if (parent_id) category.parent_id = parent_id;
        if (name) category.name = name;
        if (description) category.description = description;
        if (avatar) category.avatar = avatar;


        await category.save();

        return res.status(200).json({
            data: category,
            succeeded: true,
            message: ERROR_LIST.UPDATE,
        });

    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
    }
});
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;


        

        const category = await Category.findAll({
            where: {
                parent_id: null,
            },
            order: [['id', 'ASC']],
            offset: skip,
            limit: limit,
            include: [
                {
                    model: Category,
                    as: 'children',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
            ]
        });
        const totalCount = await Category.count({
            where: {
                parent_id: null,
            },
        })
        const totalPages = Math.ceil((totalCount || 0) / limit)
        res.status(200).json({
            data: {
                category: category,
                totalPages,
                currentPage: page,
                totalCount: totalCount
            },
            succeeded: true,
            message: "List Get SuccessFully"
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const getAllChildCategory = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const { parent_id } = req.params;

        const category = await Category.findAll({
            where: {
                parent_id: parent_id,
            },
            order: [['id', 'ASC']],
            offset: skip,
            limit: limit,
            include: [
                {
                    model: Category,
                    as: 'parent',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },

            ],
        });

        const totalCount = await Category.count({
            where: {
                parent_id: parent_id,
            },
        })
        const totalPages = Math.ceil((totalCount || 0) / limit)
        res.status(200).json({
            data: {
                category: category,
                totalPages,
                currentPage: page,
                totalCount: totalCount
            },
            succeeded: true,
            message: "List Get SuccessFully"
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOne({
            where: { id },

            include: [
                {
                    model: Category,
                    as: 'parent',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Category,
                    as: 'children',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },

            ],
        });
        if (!category) {
            return res.status(404).json({
                succeeded: false,
                message: "category not found",
            });
        }
        return res.status(200).json({
            data: category,
            succeeded: true,
            message: "category fetched successfully",
        });
    } catch (error) {
        console.error(`Error fetching user with ID ${req.params.id}:`, error);
        return res.status(500).json({
            succeeded: false,
            message: "An internal error occurred",
        });
    }
});
const deleteCategoryById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                succeeded: false,
                message: "Category not found",
            });
        }
        const childCategories = await Category.findAll({
            where: { parent_id: id },
        });
        if (childCategories.length > 0) {
            return res.status(400).json({
                message: `Cannot delete category with ID: ${id} because it has child categories`,
            });
        }

        // const deleteChildCategories = async (parent_id) => {
        //     const childCategories = await Category.findAll({
        //         where: { parent_id },
        //     });

        //     for (const child of childCategories) {
        //         await deleteChildCategories(child.id);
        //         await child.destroy();
        //     }
        // };

        // await deleteChildCategories(id);


        await category.destroy();

        return res.status(200).json({
            succeeded: true,
            message: "category deleted successfully",
        });
    } catch (error) {
        console.error(`Error deleting category with ID ${req.params.id}:`, error);
        return res.status(500).json({
            succeeded: false,
            message: "An internal error occurred",
        });
    }
});

module.exports = { addCategory, updateCategory, getAllCategory, getAllChildCategory, getCategoryById, deleteCategoryById };   