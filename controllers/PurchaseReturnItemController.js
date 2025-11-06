const Item = require("../models/ItemsModel");
const PurchaseReturnItem = require("../models/PurchaseReturnItemModel");
const PurchaseReturn = require("../models/PurchaseReturnModel");

// Get all purchase return items
exports.getAllItems = async (req, res) => {
  try {
    const items = await PurchaseReturnItem.findAll({
      include: [
        { model: PurchaseReturn, as: 'purchaseReturn' },
        { model: Item, as: 'item' },
      ],
      order: [['return_item_id', 'DESC']],
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching return items', error });
  }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await PurchaseReturnItem.findByPk(id, {
      include: [
        { model: PurchaseReturn, as: 'purchaseReturn' },
        { model: Item, as: 'item' },
      ],
    });

    if (!item) return res.status(404).json({ message: 'Return item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching return item', error });
  }
};

// Create a new return item
exports.createItem = async (req, res) => {
  try {
    const { return_id, item_id, batch_no, qty, rate, amount } = req.body;

    const newItem = await PurchaseReturnItem.create({
      return_id,
      item_id,
      batch_no,
      qty,
      rate,
      amount,
    });

    res.status(201).json({ message: 'Purchase return item created', data: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating return item', error });
  }
};

// Update a return item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PurchaseReturnItem.update(req.body, { where: { return_item_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Return item not found or no changes' });
    res.status(200).json({ message: 'Purchase return item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating return item', error });
  }
};

// Delete a return item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PurchaseReturnItem.destroy({ where: { return_item_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Return item not found' });
    res.status(200).json({ message: 'Purchase return item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting return item', error });
  }
};
