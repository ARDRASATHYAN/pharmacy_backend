const SalesInvoice = require('../models/SalesInvoiceModel');
const Store = require('../models/StoresModel');
const Customer = require('../models/CustomerModel');
const User = require('../models/UserModel');

// Get all sales invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.findAll({
      include: [
        { model: Store, as: 'store' },
        { model: Customer, as: 'customer' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
      order: [['sale_id', 'DESC']],
    });
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales invoices', error });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await SalesInvoice.findByPk(id, {
      include: [
        { model: Store, as: 'store' },
        { model: Customer, as: 'customer' },
        { model: User, as: 'creator', attributes: ['user_id', 'full_name'] },
      ],
    });

    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching invoice', error });
  }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const {
      store_id,
      customer_id,
      bill_no,
      bill_date,
      total_amount,
      total_gst,
      total_discount,
      net_amount,
      doctor_name,
      prescription_no,
      created_by
    } = req.body;

    const newInvoice = await SalesInvoice.create({
      store_id,
      customer_id,
      bill_no,
      bill_date,
      total_amount,
      total_gst,
      total_discount,
      net_amount,
      doctor_name,
      prescription_no,
      created_by
    });

    res.status(201).json({ message: 'Sales invoice created', data: newInvoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating invoice', error });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SalesInvoice.update(req.body, { where: { sale_id: id } });

    if (updated[0] === 0) return res.status(404).json({ message: 'Invoice not found or no changes' });
    res.status(200).json({ message: 'Sales invoice updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating invoice', error });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SalesInvoice.destroy({ where: { sale_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json({ message: 'Sales invoice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting invoice', error });
  }
};
