const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Shop, Product, User, Category } = require('../models');
const { ERROR_LIST } = require('../middleware/authMiddleware');


const addProduct = asyncHandler(
    async (req, res) => {
        try {
            const { shop_id, title, description, images, price, category_id } = req.body;
            const product = await Product.create({
                shop_id,
                title,
                description,
                images,
                price,
                category_id
            });
            if (product) {
                const productWithShop = await Product.findOne({
                    where: { id: product.id },
                    include: [
                        {
                            model: Shop,
                            required: false,
                            attributes: ['id', 'owner_name'],
                            include: [
                                {
                                    model: User,
                                    required: false,
                                    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                                }
                            ]
                        },
                        {
                            model: Category,
                            as: 'category',
                            required: false,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ],
                });

                res.status(200).json({
                    data: productWithShop,

                    succeeded: true,
                    message: `Product added successfully`,
                });
            } else {
                res.status(400);
                throw new Error(ERROR_LIST.INVALID_DATA);
            }

        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
        }
    })
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id, shop_id, title, description, images, price, category_id } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        if (shop_id) product.shop_id = shop_id;
        if (title) product.title = title;
        if (description) product.description = description;
        if (images) product.images = images;
        if (price) product.price = price;
        if (category_id) product.category_id = category_id;

        await product.save();
        const updatedProductWithShop = await Product.findOne({
            where: { id: product.id },
            include: [
                {
                    model: Shop,
                    required: false,
                    attributes: ['id', 'owner_name'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                }, {
                    model: Category,
                    required: false,
                    as: 'category',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
        });

        return res.status(200).json({
            data: updatedProductWithShop,
            succeeded: true,
            message: ERROR_LIST.UPDATE,
        });


    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
    }
});
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const name = req.query.name || '';
        const shop_id = req.query.shop_id || null;
        const min_price = parseFloat(req.query.min_price) || null;
        const max_price = parseFloat(req.query.max_price) || null;
        const category_id = req.query.category_id || null;
        const skip = (page - 1) * limit;

        const whereClause = {
            [Op.or]: [
                { title: { [Op.iLike]: `%${name}%` } }
            ]
        };

        if (shop_id !== null) {
            whereClause.shop_id = shop_id;
        }
        if (min_price !== null && max_price !== null) {
            whereClause.price = { [Op.between]: [min_price, max_price] };
        } else if (min_price !== null) {
            whereClause.price = { [Op.gte]: min_price };
        } else if (max_price !== null) {
            whereClause.price = { [Op.lte]: max_price };
        }     
        if (category_id !== null) {
           
            const childCategories = await Category.findAll({
                where: {
                    [Op.or]: [
                        { id: category_id }, 
                        { parent_id: category_id } 
                    ]
                },
                attributes: ['id']
            });

         
            const categoryIds = childCategories.map(cat => cat.id);
            whereClause.category_id = { [Op.in]: categoryIds };
        }
        const products = await Product.findAll({
            where: whereClause,
            order: [['id', 'ASC']],
            offset: skip,
            limit: limit,
            include: [
                {
                    model: Shop,
                    required: false,
                    attributes: ['id', 'owner_name'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                },
                {
                    model: Category,
                    as: 'category',
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });
        const totalCount = await Product.count({
            where: whereClause,
            include: [
                {
                    model: Shop,
                    required: false,
                    attributes: ['id', 'owner_name'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                },
                {
                    model: Category,
                    as: 'category',
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
        })
        const totalPages = Math.ceil((totalCount || 0) / limit)
        res.status(200).json({
            data: {
                products: products,
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
};


const getProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [
                {
                    model: Shop,
                    required: false,
                    attributes: ['id', 'owner_name'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                }, {
                    model: Category,
                    as: 'category',
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
        });
        if (!product) {
            return res.status(404).json({
                succeeded: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            data: product,
            succeeded: true,
            message: "Product fetched successfully",
        });
    } catch (error) {
        console.error(`Error fetching user with ID ${req.params.id}:`, error);
        return res.status(500).json({
            succeeded: false,
            message: "An internal error occurred",
        });
    }
});
const deleteProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                succeeded: false,
                message: "Oroduct not found",
            });
        }



        // Delete the user
        await product.destroy();

        return res.status(200).json({
            succeeded: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(`Error deleting product with ID ${req.params.id}:`, error);
        return res.status(500).json({
            succeeded: false,
            message: "An internal error occurred",
        });
    }
});

module.exports = { addProduct, updateProduct, getAllProducts, getProductById, deleteProductById, };   