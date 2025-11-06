const User = require("../models/UserModel");


// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['user_id', 'ASC']],
      attributes: { exclude: ['password_hash'] },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// ✅ Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// ✅ Create new user
exports.createUser = async (req, res) => {
  try {
    const { username, password_hash, full_name, role, is_active } = req.body;

    const newUser = await User.create({
      username,
      password_hash, // will be hashed by model hook
      full_name,
      role: role || 'Billing',
      is_active: is_active !== undefined ? is_active : true,
    });

    res.status(201).json({
      message: 'User created successfully',
      data: { ...newUser.toJSON(), password_hash: undefined },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// ✅ Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password_hash, full_name, role, is_active } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update({
      username,
      password_hash, // automatically hashed if changed
      full_name,
      role,
      is_active,
    });

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { user_id: id } });

    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
