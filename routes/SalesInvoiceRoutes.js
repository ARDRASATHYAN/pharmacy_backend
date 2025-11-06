const express = require('express');
const { getAllInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } = require('../controllers/SalesInvoiceController');
const salesinvoiceRouter = express.Router();


// CRUD routes
salesinvoiceRouter.get('/', getAllInvoices);
salesinvoiceRouter.get('/:id', getInvoiceById);
salesinvoiceRouter.post('/', createInvoice);
salesinvoiceRouter.put('/:id', updateInvoice);
salesinvoiceRouter.delete('/:id', deleteInvoice);

module.exports = salesinvoiceRouter;
