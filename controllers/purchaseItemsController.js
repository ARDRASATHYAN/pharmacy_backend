const Item = require("../models/ItemsModel");
const PurchaseInvoice = require("../models/PurchaseInvoicesModel");
const PurchaseItems = require("../models/PurchaseItemsModel");

// ✅ Create Purchase Item
exports.createPurchaseItem = async (req, res) => {
  try {
    const newItem = await PurchaseItems.create(req.body);
    res.status(201).json({ message: 'Purchase item created successfully', data: newItem });
  } catch (error) {
    console.error('Error creating purchase item:', error);
    res.status(500).json({ error: 'Failed to create purchase item' });
  }
};

// ✅ Get All Purchase Items (with related Invoice + Item)
exports.getAllPurchaseItems = async (req, res) => {
  try {
    const items = await PurchaseItems.findAll({
      include: [
        { model: PurchaseInvoice, as: 'invoice', attributes: ['invoice_no', 'invoice_date', 'net_amount'] },
        { model: Item, as: 'item', attributes: ['item_name', 'hsn_id'] },
      ],
      order: [['purchase_item_id', 'DESC']],
    });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching purchase items:', error);
    res.status(500).json({ error: 'Failed to fetch purchase items' });
  }
};

// ✅ Get Single Purchase Item by ID
exports.getPurchaseItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await PurchaseItems.findByPk(id, {
      include: [
        { model: PurchaseInvoice, as: 'invoice', attributes: ['invoice_no', 'invoice_date', 'net_amount'] },
        { model: Item, as: 'item', attributes: ['item_name', 'hsn_id'] },
      ],
    });
    if (!item) return res.status(404).json({ message: 'Purchase item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching purchase item:', error);
    res.status(500).json({ error: 'Failed to fetch purchase item' });
  }
};

// ✅ Update Purchase Item
exports.updatePurchaseItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await PurchaseItems.update(req.body, { where: { purchase_item_id: id } });

    if (!updated) return res.status(404).json({ message: 'Purchase item not found' });
    const updatedItem = await PurchaseItems.findByPk(id);
    res.status(200).json({ message: 'Purchase item updated successfully', data: updatedItem });
  } catch (error) {
    console.error('Error updating purchase item:', error);
    res.status(500).json({ error: 'Failed to update purchase item' });
  }
};

// ✅ Delete Purchase Item
exports.deletePurchaseItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PurchaseItems.destroy({ where: { purchase_item_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Purchase item not found' });
    res.status(200).json({ message: 'Purchase item deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase item:', error);
    res.status(500).json({ error: 'Failed to delete purchase item' });
  }
};
