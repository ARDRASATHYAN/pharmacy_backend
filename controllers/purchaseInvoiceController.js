const PurchaseInvoice = require("../models/PurchaseInvoicesModel");
const Store = require("../models/StoresModel");
const Supplier = require("../models/SupplierModel");
const User = require("../models/UserModel");

// ✅ CREATE a new purchase invoice
exports.createPurchaseInvoice = async (req, res) => {
  try {
    const { invoice_no, invoice_date, total_amount, total_discount, supplier_id, store_id,total_gst,net_amount } = req.body;

    const newInvoice = await PurchaseInvoice.create({
      invoice_no,
      invoice_date,
      total_amount,
      total_discount,
      supplier_id,
      store_id,
      total_gst,
      net_amount,
      created_by: req.user?.user_id || null, // ✅ include creator from logged-in user
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET all purchase invoices with joins
exports.getAllPurchaseInvoices = async (req, res) => {
  try {
    const invoices = await PurchaseInvoice.findAll({
      include: [
        { model: Store, as: 'store', attributes: ['store_id', 'store_name'] },
        { model: Supplier, as: 'supplier', attributes: ['supplier_id', 'supplier_name'] },
        { model: User, as: 'creator', attributes: ['user_id', 'username', 'full_name'] },
      ],
      order: [['purchase_id', 'DESC']],
    });
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching purchase invoices:', error);
    res.status(500).json({ message: 'Error fetching purchase invoices', error: error.message });
  }
};

// ✅ GET single purchase invoice by ID
exports.getPurchaseInvoiceById = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByPk(req.params.id, {
      include: [
        { model: Store, as: 'store', attributes: ['store_id', 'store_name'] },
        { model: Supplier, as: 'supplier', attributes: ['supplier_id', 'supplier_name'] },
        { model: User, as: 'creator', attributes: ['user_id', 'username', 'full_name'] },
      ],
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Purchase invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching purchase invoice:', error);
    res.status(500).json({ message: 'Error fetching purchase invoice', error: error.message });
  }
};

// ✅ UPDATE purchase invoice
exports.updatePurchaseInvoice = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Purchase invoice not found' });
    }

    await invoice.update(req.body);
    res.status(200).json({ message: 'Purchase invoice updated successfully', data: invoice });
  } catch (error) {
    console.error('Error updating purchase invoice:', error);
    res.status(500).json({ message: 'Error updating purchase invoice', error: error.message });
  }
};

// ✅ DELETE purchase invoice
exports.deletePurchaseInvoice = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Purchase invoice not found' });
    }

    await invoice.destroy();
    res.status(200).json({ message: 'Purchase invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase invoice:', error);
    res.status(500).json({ message: 'Error deleting purchase invoice', error: error.message });
  }
};
