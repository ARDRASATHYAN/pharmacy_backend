const SalesItem = require('../models/SalesItemModel');
const SalesInvoice = require('../models/SalesInvoiceModel');
const Item = require('../models/ItemsModel');

// Get all sales items
exports.getAllItems = async (req, res) => {
  try {
    const items = await SalesItem.findAll({
      include: [
        { model: SalesInvoice, as: 'sale' },
        { model: Item, as: 'item' },
      ],
      order: [['sale_item_id', 'DESC']],
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales items', error });
  }
};

// Get single sales item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await SalesItem.findByPk(id, {
      include: [
        { model: SalesInvoice, as: 'sale' },
        { model: Item, as: 'item' },
      ],
    });

    if (!item) return res.status(404).json({ message: 'Sales item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales item', error });
  }
};

// Create a new sales item
exports.createItem = async (req, res) => {
  try {
    const { sale_id, item_id, batch_no, qty, rate, gst_percent, discount_percent, total_amount } = req.body;

    const newItem = await SalesItem.create({
      sale_id,
      item_id,
      batch_no,
      qty,
      rate,
      gst_percent,
      discount_percent,
      total_amount,
    });

    res.status(201).json({ message: 'Sales item created', data: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating sales item', error });
  }
};

// Update a sales item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SalesItem.update(req.body, { where: { sale_item_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Sales item not found or no changes' });
    res.status(200).json({ message: 'Sales item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating sales item', error });
  }
};

// Delete a sales item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SalesItem.destroy({ where: { sale_item_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Sales item not found' });
    res.status(200).json({ message: 'Sales item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting sales item', error });
  }
};
