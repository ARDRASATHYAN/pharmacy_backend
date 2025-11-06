const DamagedStock = require('../models/DamagedStockModel');
const Store = require('../models/StoresModel');
const Item = require('../models/ItemsModel');
const User = require('../models/UserModel');

// Get all damaged stock
exports.getAllDamagedStock = async (req, res) => {
  try {
    const stock = await DamagedStock.findAll({
      include: [
        { model: Store, as: 'store' },
        { model: Item, as: 'item' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
      order: [['damaged_id', 'DESC']],
    });
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching damaged stock', error });
  }
};

// Get single damaged stock
exports.getDamagedStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await DamagedStock.findByPk(id, {
      include: [
        { model: Store, as: 'store' },
        { model: Item, as: 'item' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
    });
    if (!stock) return res.status(404).json({ message: 'Damaged stock not found' });
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching damaged stock', error });
  }
};

// Create damaged stock
exports.createDamagedStock = async (req, res) => {
  try {
    const { store_id, item_id, batch_no, qty, reason, entry_date, created_by } = req.body;

    const newStock = await DamagedStock.create({
      store_id,
      item_id,
      batch_no,
      qty,
      reason,
      entry_date,
      created_by,
    });

    res.status(201).json({ message: 'Damaged stock added', data: newStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding damaged stock', error });
  }
};

// Update damaged stock
exports.updateDamagedStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await DamagedStock.update(req.body, { where: { damaged_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Damaged stock not found or no changes' });
    res.status(200).json({ message: 'Damaged stock updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating damaged stock', error });
  }
};

// Delete damaged stock
exports.deleteDamagedStock = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DamagedStock.destroy({ where: { damaged_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Damaged stock not found' });
    res.status(200).json({ message: 'Damaged stock deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting damaged stock', error });
  }
};
