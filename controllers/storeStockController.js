// controllers/storeStockController.js
const Item = require("../models/ItemsModel");
const Store = require("../models/StoresModel");
const StoreStock = require("../models/StoreStockModel");

// ✅ CREATE — Add new stock entry
exports.createStock = async (req, res) => {
  try {
    const {
      batch_no,
      expiry_date,
      mrp,
      purchase_rate,
      sale_rate,
      gst_percent,
      qty_in_stock,
      store_id,
      item_id,
    } = req.body;

    const stock = await StoreStock.create({
      batch_no,
      expiry_date,
      mrp,
      purchase_rate,
      sale_rate,
      gst_percent,
      qty_in_stock,
      store_id,
      item_id,
    });

    console.log("✅ Stock created successfully:", stock.toJSON());

    return res.status(201).json({
      success: true,
      message: "Stock created successfully",
      data: stock,
    });
  } catch (error) {
    console.error("❌ Error creating stock:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create stock",
      error: error.message,
    });
  }
};

// ✅ READ — Get all stock entries with relations
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await StoreStock.findAll({
      include: [
        { model: Store, as: "store" },
        { model: Item, as: "item" },
      ],
      order: [["stock_id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Stocks fetched successfully",
      data: stocks,
    });
  } catch (error) {
    console.error("❌ Error fetching stocks:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stocks",
      error: error.message,
    });
  }
};

// ✅ READ — Get single stock by ID
exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await StoreStock.findByPk(id, {
      include: [
        { model: Store, as: "store" },
        { model: Item, as: "item" },
      ],

    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock fetched successfully",
      data: stock,
    });
  } catch (error) {
    console.error("❌ Error fetching stock:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stock",
      error: error.message,
    });
  }
};

// ✅ UPDATE — Modify existing stock
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await StoreStock.findByPk(id);
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    await stock.update(req.body);

    console.log(`✅ Stock (ID: ${id}) updated successfully`);

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: stock,
    });
  } catch (error) {
    console.error("❌ Error updating stock:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update stock",
      error: error.message,
    });
  }
};

// ✅ DELETE — Remove stock entry
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await StoreStock.findByPk(id);
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    await stock.destroy();

    console.log(`🗑️ Stock (ID: ${id}) deleted successfully`);

    return res.status(200).json({
      success: true,
      message: "Stock deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting stock:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete stock",
      error: error.message,
    });
  }
};
