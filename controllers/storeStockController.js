const Item = require("../models/ItemsModel");
const Store = require("../models/StoresModel");
const StoreStock = require("../models/StoreStockModel");

// ✅ CREATE a new stock entry
exports.createStock = async (req, res) => {
  try {
    const stock = await StoreStock.create(req.body);
    res.status(201).json({ message: 'Stock created successfully', data: stock });
  } catch (error) {
    console.error('Error creating stock:', error);
    res.status(500).json({ message: 'Error creating stock', error: error.message });
  }
};

// ✅ GET all stock entries (with related store and item)
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await StoreStock.findAll({
      include: [
        { model: Store, as: 'store' },
        { model: Item, as: 'item' },
      ],
    });
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ message: 'Error fetching stocks', error: error.message });
  }
};

// ✅ GET single stock by ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await StoreStock.findByPk(req.params.id, {
      include: [
        { model: Store, as: 'store' },
        { model: Item, as: 'item' },
      ],
    });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    res.status(200).json(stock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ message: 'Error fetching stock', error: error.message });
  }
};

// ✅ UPDATE stock
exports.updateStock = async (req, res) => {
  try {
    const stock = await StoreStock.findByPk(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    await stock.update(req.body);
    res.status(200).json({ message: 'Stock updated successfully', data: stock });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Error updating stock', error: error.message });
  }
};

// ✅ DELETE stock
exports.deleteStock = async (req, res) => {
  try {
    const stock = await StoreStock.findByPk(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    await stock.destroy();
    res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock:', error);
    res.status(500).json({ message: 'Error deleting stock', error: error.message });
  }
};
