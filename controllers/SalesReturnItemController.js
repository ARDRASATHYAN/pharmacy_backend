const SalesReturnItem = require('../models/SalesReturnItemModel');
const SalesReturn = require('../models/SalesReturnModel');
const Item = require('../models/ItemsModel');

// Get all return items
exports.getAllReturnItems = async (req, res) => {
  try {
    const items = await SalesReturnItem.findAll({
      include: [
        { model: SalesReturn, as: 'return' },
        { model: Item, as: 'item' },
      ],
      order: [['return_item_id', 'DESC']],
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales return items', error });
  }
};

// Get single return item
exports.getReturnItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await SalesReturnItem.findByPk(id, {
      include: [
        { model: SalesReturn, as: 'return' },
        { model: Item, as: 'item' },
      ],
    });
    if (!item) return res.status(404).json({ message: 'Sales return item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales return item', error });
  }
};

// Create a return item
exports.createReturnItem = async (req, res) => {
  try {
    const { return_id, item_id, batch_no, qty, rate, amount } = req.body;

    const newItem = await SalesReturnItem.create({
      return_id,
      item_id,
      batch_no,
      qty,
      rate,
      amount,
    });

    res.status(201).json({ message: 'Sales return item created', data: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating sales return item', error });
  }
};

// Update a return item
exports.updateReturnItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SalesReturnItem.update(req.body, { where: { return_item_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Sales return item not found or no changes' });
    res.status(200).json({ message: 'Sales return item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating sales return item', error });
  }
};

// Delete a return item
exports.deleteReturnItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SalesReturnItem.destroy({ where: { return_item_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Sales return item not found' });
    res.status(200).json({ message: 'Sales return item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting sales return item', error });
  }
};
