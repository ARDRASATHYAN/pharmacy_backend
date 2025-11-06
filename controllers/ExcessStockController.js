const ExcessStock = require('../models/ExcessStockModel');
const Store = require('../models/StoresModel');
const Item = require('../models/ItemsModel');
const User = require('../models/UserModel');

// Get all excess stock
exports.getAllExcessStock = async (req, res) => {
  try {
    const stock = await ExcessStock.findAll({
      include: [
        { model: Store, as: 'store' },
        { model: Item, as: 'item' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
      order: [['excess_id', 'DESC']],
    });
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching excess stock', error });
  }
};

// Get single excess stock
exports.getExcessStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await ExcessStock.findByPk(id, {
      include: [
        { model: Store, as: 'store' },
        { model: Item, as: 'item' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
    });
    if (!stock) return res.status(404).json({ message: 'Excess stock not found' });
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching excess stock', error });
  }
};

// Create excess stock
exports.createExcessStock = async (req, res) => {
  try {
    const { store_id, item_id, batch_no, qty, reason, entry_date, created_by } = req.body;

    const newStock = await ExcessStock.create({
      store_id,
      item_id,
      batch_no,
      qty,
      reason,
      entry_date,
      created_by,
    });

    res.status(201).json({ message: 'Excess stock added', data: newStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding excess stock', error });
  }
};

// Update excess stock
exports.updateExcessStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ExcessStock.update(req.body, { where: { excess_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Excess stock not found or no changes' });
    res.status(200).json({ message: 'Excess stock updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating excess stock', error });
  }
};

// Delete excess stock
exports.deleteExcessStock = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ExcessStock.destroy({ where: { excess_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Excess stock not found' });
    res.status(200).json({ message: 'Excess stock deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting excess stock', error });
  }
};
