const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { Op, Sequelize } = require('sequelize');
const { Shop, Installer } = require('../models');
const { ERROR_LIST } = require('../middleware/authMiddleware');


const generateToken = (id, type) => {
  return jwt.sign(
    { id, type },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error(ERROR_LIST.ALL_FIELD_REQUIRED);
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400);
      throw new Error(ERROR_LIST.INVALID_DATA);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error(ERROR_LIST.INVALID_DATA);
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();

    const token = generateToken(user.id, user.type,);

    let shop = null, installer = null;
    if (user.type === 'shop') {
      shop = await Shop.findOne({
        where: { user_id: user.id },

      });
    } else if (user.type === 'installer') {
      installer = await Installer.findOne({
        where: { user_id: user.id },

      });
    }

    res.status(200).json({
      message: 'Login successful',
      succeeded: true,
      user: { ...userWithoutPassword, installer, shop, token: token },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500);
    throw new Error(ERROR_LIST.INTERNAL_ERROR);
  }
});

const createUser = asyncHandler(
  async (req, res) => {
    try {

      const {
        name, email, password, avatar, type, owner_name, phone_no,
        address, status, experience,

      } = req.body;
      if (type === 'shop') {
        if (!name || !email || !password || !address || !status || !owner_name) {
          res.status(400).json({ message: ERROR_LIST.ALL_FIELD_REQUIRED });
        }
      } else if (type === 'installer') {
        if (!name || !email || !password || !address || !status || !experience) {
          res.status(400).json({ message: ERROR_LIST.ALL_FIELD_REQUIRED });
        }
      } else {
        if (!name || !email || !password) {
          res.status(400).json({ message: ERROR_LIST.ALL_FIELD_REQUIRED });
        }
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: ERROR_LIST.ALREADY_EXIST });
      }

      const user = await User.create({
        name,
        email,
        avatar,
        password,
        type,
        phone_no,
        address,
        status,
      });

      let shop = null, installer = null;
      if (type === 'shop') {
        shop = await Shop.create({
          user_id: user.id,
          owner_name,

        });

      } else if (type === 'installer') {
        installer = await Installer.create({
          user_id: user.id,
          experience,
        });
      }

      if (user && (installer || shop)) {
        res.status(200).json({
          data: {
            user,
            installer,
            shop
          },
          succeeded: true,
          message: `${type === 'installer' ? 'Installer' : 'Shop'} created successfully`
        });
      } else {
        res.status(400);
        throw new Error(ERROR_LIST.INVALID_DATA);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
    }
  })

const updateUser = asyncHandler(async (req, res) => {
  try {
    const {
      id, name, email, avatar, type, owner_name, phone_no,
      latitude, longitude, address, status, experience,
    } = req.body;

    const user = await User.findByPk(id); // Using Sequelize's `findByPk` as an example
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (type) user.type = type;
    if (phone_no) user.phone_no = phone_no;
    if (latitude) user.latitude = latitude;
    if (longitude) user.longitude = longitude;
    if (address) user.address = address;
    if (status) user.status = status;

    await user.save(); // Save updated user data

    let userDetails;
    if (type === 'shop') {
      // Update or create shop details
      userDetails = await Shop.findOne({ where: { user_id: user.id } });
      if (userDetails) {
        if (owner_name) userDetails.owner_name = owner_name;
        await userDetails.save();
      } else {
        userDetails = await Shop.create({
          user_id: user.id,
          owner_name,

        });
      }
    } else if (type === 'installer') {
      userDetails = await Installer.findOne({ where: { user_id: user.id } });
      if (userDetails) {

        if (experience) userDetails.experience = experience;
        await userDetails.save();
      } else {
        userDetails = await Installer.create({
          user_id: user.id,
          experience,
        });
      }
    }

    return res.status(200).json({
      data: {
        user,
        userDetails,
      },
      succeeded: true,
      message: ERROR_LIST.UPDATE,
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: ERROR_LIST.INTERNAL_ERROR });
  }
});
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';
    const skip = (page - 1) * limit;
    const type = req.query.type || '';
    const status = req.query.status || 'active';
    const country = req.query.country || '';
    const state = req.query.state || '';
    const city = req.query.city || '';
    const area = req.query.area || '';
    const radiusInKm = req.query.radiusInKm && req.query.radiusInKm > 0 || '';
    const userLongitude = req.query.userLongitude || '';
    const userLatitude = req.query.userLatitude || '';

    const users = await User.findAll({
      where: {
        ...(type ? { type } : { type: { [Op.ne]: 'superAdmin' } }),
        ...(status ? { status: status } : {}),
        ...(country ? { 'address.country': { [Op.iLike]: `%${country}%` } } : {}),
        ...(state ? { 'address.state': { [Op.iLike]: `%${state}%` } } : {}),
        ...(city ? { 'address.city': { [Op.iLike]: `%${city}%` } } : {}),
        ...(area ? { 'address.area': { [Op.iLike]: `%${area}%` } } : {}),
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          ...(type === 'shop' ? [{ '$Shop.owner_name$': { [Op.iLike]: `%${name}%` } }] : [])
        ],
        ...(radiusInKm && userLongitude && userLatitude ? {
          [Op.and]: Sequelize.where(
            Sequelize.fn('ST_DistanceSphere',
              Sequelize.fn('ST_MakePoint',
                Sequelize.json('address.longitude'), // Access longitude from the address JSON field
                Sequelize.json('address.latitude')   // Access latitude from the address JSON field
              ),
              Sequelize.fn('ST_MakePoint', userLongitude, userLatitude)
            ),
            { [Op.lte]: radiusInKm * 1000 } // Convert radius from kilometers to meters
          )
        } : {}),
      },
      attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
      offset: skip,
      limit: limit,
      include: [
        ...(type === 'shop'
          ? [
            {
              model: Shop,
              required: true,
             
              attributes: ['id', 'owner_name'],
            },
          ]
          : []),
        ...(type === 'installer'
          ? [
            {
              model: Installer,
              required: true,

              attributes: ['id', 'experience'],
            },
          ]
          : []),

      ],

    });
    const totalUserCount = await User.count({
      where: {
        ...(type ? { type } : { type: { [Op.ne]: 'superAdmin' } }),
        ...(status ? { status: status } : {}),
        ...(country ? { 'address.country': { [Op.iLike]: `%${country}%` } } : {}),
        ...(state ? { 'address.state': { [Op.iLike]: `%${state}%` } } : {}),
        ...(city ? { 'address.city': { [Op.iLike]: `%${city}%` } } : {}),
        ...(area ? { 'address.area': { [Op.iLike]: `%${area}%` } } : {}),
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          ...(type === 'shop' ? [{ '$Shop.owner_name$': { [Op.iLike]: `%${name}%` } }] : [])
        ]
      },
      include: [
        ...(type === 'shop'
          ? [
            {
              model: Shop,
              required: true,
              
              attributes: ['id', 'owner_name'],
            },
          ]
          : []),
        ...(type === 'installer'
          ? [
            {
              model: Installer,
              required: true,

              attributes: ['id', 'experience'],
            },
          ]
          : []),

      ],
    })
    const totalPages = Math.ceil((totalUserCount || 0) / limit)
    res.status(200).json({
      data: {
        users: users,
        totalPages,
        currentPage: page,
        totalCount: totalUserCount
      },
      succeeded: true,
      message: "List Get SuccessFully"
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const logoutUser = (req, res) => {

  res.status(200).json({ message: 'Logout successful' });
};

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Shop,
          required: false,
        },
        {
          model: Installer,
          required: false,
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        succeeded: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      data: user,
      succeeded: true,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.error(`Error fetching user with ID ${req.params.id}:`, error);
    return res.status(500).json({
      succeeded: false,
      message: "An internal error occurred",
    });
  }
});
const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        succeeded: false,
        message: "User not found",
      });
    }

    // Optionally: Delete associated data
    if (user.type === 'shop') {
      await Shop.destroy({ where: { user_id: id } });
    } else if (user.type === 'installer') {
      await Installer.destroy({ where: { user_id: id } });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({
      succeeded: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(`Error deleting user with ID ${req.params.id}:`, error);
    return res.status(500).json({
      succeeded: false,
      message: "An internal error occurred",
    });
  }
});

module.exports = { createUser, getAllUsers, loginUser, logoutUser, updateUser, deleteUserById, getUserById, };   