const SalesInvoice = require("../models/SalesInvoiceModel");
const SalesReturn = require("../models/SalesReturnModel");
const Store = require("../models/StoresModel");
const User = require("../models/UserModel");

// Get all sales returns
exports.getAllReturns = async (req, res) => {
  try {
    const returns = await SalesReturn.findAll({
      include: [
        { model: SalesInvoice, as: 'sale' },
        { model: Store, as: 'store' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
      order: [['return_id', 'DESC']],
    });
    res.status(200).json(returns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales returns', error });
  }
};

// Get single return by ID
exports.getReturnById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleReturn = await SalesReturn.findByPk(id, {
      include: [
        { model: SaleInvoice, as: 'sale' },
        { model: Store, as: 'store' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
    });

    if (!saleReturn) return res.status(404).json({ message: 'Return not found' });
    res.status(200).json(saleReturn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales return', error });
  }
};

// Create a new sales return
exports.createReturn = async (req, res) => {
  try {
    const { sale_id, store_id, return_date, reason, total_amount, created_by } = req.body;

    const newReturn = await SalesReturn.create({
      sale_id,
      store_id,
      return_date,
      reason,
      total_amount,
      created_by,
    });

    res.status(201).json({ message: 'Sales return created successfully', data: newReturn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating sales return', error });
  }
};

// Update a sales return
exports.updateReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SalesReturn.update(req.body, { where: { return_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Return not found or no changes made' });

    res.status(200).json({ message: 'Sales return updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating sales return', error });
  }
};

// Delete a sales return
exports.deleteReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SalesReturn.destroy({ where: { return_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Return not found' });

    res.status(200).json({ message: 'Sales return deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting sales return', error });
  }
};
