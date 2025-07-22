const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Installer, Project, User } = require('../models');
const { ERROR_LIST } = require('../middleware/authMiddleware');


const addProject = asyncHandler(
    async (req, res) => {
        try {
            const {
                installer_id, name, description, address, contact_person,
                start_date, end_date, images
            } = req.body;
            if (!installer_id || !name || !address || !contact_person || !start_date) {
                res.status(400).json({ message: 'All required fields must be provided' });
                return;
            }
            const project = await Project.create({
                installer_id, name, description, address, contact_person,
                start_date, end_date, images
            });
            if (project) {
                const projectWithInstaller = await Project.findOne({
                    where: { id: project.id },
                    include: [
                        {
                            model: Installer,
                            required: false,
                            attributes: ['id', 'experience'],
                            include: [
                                {
                                    model: User,
                                    required: false,
                                    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                                }
                            ]
                        },
                    ],
                });

                res.status(200).json({
                    data: projectWithInstaller,

                    succeeded: true,
                    message: `Project added successfully`,
                });
            } else {
                res.status(400);
                throw new Error(ERROR_LIST.INVALID_DATA);
            }

        } catch (error) {
            console.error("Error creating Project:", error);
            res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
        }
    })
const updateProject = asyncHandler(async (req, res) => {
    try {
        const { id, installer_id, name, description, address, contact_person, start_date, end_date, images } = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        if (installer_id) project.installer_id = installer_id;
        if (name) project.name = name;
        if (description) project.description = description;
        if (address) project.address = address;
        if (contact_person) project.contact_person = contact_person;
        if (start_date) project.start_date = start_date;
        if (end_date) project.end_date = end_date;
        if (images) project.images = images;

        await project.save();
        const updatedPojectWithInstaller = await Project.findOne({
            where: { id: project.id },
            include: [
                {
                    model: Installer,
                    required: false,
                    attributes: ['id', 'experience'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                },
            ],
        });

        return res.status(200).json({
            data: updatedPojectWithInstaller,
            succeeded: true,
            message: ERROR_LIST.UPDATE,
        });



    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
    }
});
const getAllProjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const name = req.query.name || '';
        const installer_id = req.query.installer_id || null;

        const skip = (page - 1) * limit;
        const whereClause = {
            [Op.or]: [
                { name: { [Op.iLike]: `%${name}%` } }
            ]
        };

        if (installer_id !== null) {
            whereClause.installer_id = installer_id;
        }



        const project = await Project.findAll({
            where: whereClause,
            order: [['id', 'ASC']],
            offset: skip,
            limit: limit,
            include: [
                {
                    model: Installer,
                    required: false,
                    attributes: ['id', 'experience'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                },
            ],

        });
        const totalCount = await Project.count({
            where: whereClause,
        })
        const totalPages = Math.ceil((totalCount || 0) / limit)
        res.status(200).json({
            data: {
                projects: project,
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
const getProjectById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({
            where: { id },
            include: [
                {
                    model: Installer,
                    required: false,
                    attributes: ['id', 'experience'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'shop_id'] }
                        }
                    ]
                },
            ],
        });
        if (!project) {
            return res.status(404).json({
                succeeded: false,
                message: "project not found",
            });
        }
        return res.status(200).json({
            data: project,
            succeeded: true,
            message: "project fetched successfully",
        });
    } catch (error) {
        console.error(`Error fetching user with ID ${req.params.id}:`, error);
        return res.status(500).json({
            succeeded: false,
            message: "An internal error occurred",
        });
    }
});
const deleteProjectById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({
                succeeded: false,
                message: "Oroduct not found",
            });
        }



        // Delete the user
        await project.destroy();

        return res.status(200).json({
            succeeded: true,
            message: "project deleted successfully",
        });
    } catch (error) {
        console.error(`Error deleting project with ID ${req.params.id}:`, error);
        return res.status(500).json({
            succeeded: false,
            message: "An internal error occurred",
        });
    }
});

module.exports = { addProject, updateProject, getAllProjects, getProjectById, deleteProjectById, };   