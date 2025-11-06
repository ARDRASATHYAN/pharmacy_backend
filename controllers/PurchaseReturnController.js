const PurchaseReturn = require("../models/PurchaseReturnModel");
const Store = require("../models/StoresModel");
const User = require("../models/UserModel");


// ✅ Get all purchase returns (with associations)
exports.getAllReturns = async (req, res) => {
  try {
    const returns = await PurchaseReturn.findAll({
      include: [
        { model: PurchaseInvoice, as: "purchase" },
        { model: Store, as: "store" },
        { model: User, as: "creator", attributes: ["user_id", "full_name"] },
      ],
      order: [["return_id", "DESC"]],
    });
    res.status(200).json(returns);
  } catch (error) {
    console.error("Error fetching purchase returns:", error);
    res.status(500).json({ message: "Error fetching purchase returns", error });
  }
};

// ✅ Get a single return by ID
exports.getReturnById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchaseReturn = await PurchaseReturn.findByPk(id, {
      include: [
        { model: PurchaseInvoice, as: "purchase" },
        { model: Store, as: "store" },
        { model: User, as: "creator", attributes: ["user_id", "full_name"] },
      ],
    });

    if (!purchaseReturn) {
      return res.status(404).json({ message: "Return not found" });
    }

    res.status(200).json(purchaseReturn);
  } catch (error) {
    console.error("Error fetching purchase return:", error);
    res.status(500).json({ message: "Error fetching purchase return", error });
  }
};

// ✅ Create a new purchase return
exports.createReturn = async (req, res) => {
  try {
    const { purchase_id, store_id, return_date, reason, total_amount, created_by } = req.body;

    const newReturn = await PurchaseReturn.create({
      purchase_id,
      store_id,
      return_date,
      reason,
      total_amount,
      created_by,
    });

    res.status(201).json({ message: "Purchase return created successfully", data: newReturn });
  } catch (error) {
    console.error("Error creating purchase return:", error);
    res.status(500).json({ message: "Error creating purchase return", error });
  }
};

// ✅ Update a purchase return
exports.updateReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PurchaseReturn.update(req.body, { where: { return_id: id } });

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Return not found or no changes made" });
    }

    res.status(200).json({ message: "Purchase return updated successfully" });
  } catch (error) {
    console.error("Error updating purchase return:", error);
    res.status(500).json({ message: "Error updating purchase return", error });
  }
};

// ✅ Delete a purchase return
exports.deleteReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PurchaseReturn.destroy({ where: { return_id: id } });

    if (!deleted) {
      return res.status(404).json({ message: "Return not found" });
    }

    res.status(200).json({ message: "Purchase return deleted successfully" });
  } catch (error) {
    console.error("Error deleting purchase return:", error);
    res.status(500).json({ message: "Error deleting purchase return", error });
  }
};
