const express = require('express');
const { createPurchaseInvoice, getAllPurchaseInvoices, getPurchaseInvoiceById, updatePurchaseInvoice, deletePurchaseInvoice } = require('../controllers/purchaseInvoiceController');


const purchaseinvoiceRouter = express.Router();


purchaseinvoiceRouter.post('/', createPurchaseInvoice);
purchaseinvoiceRouter.get('/', getAllPurchaseInvoices);
purchaseinvoiceRouter.get('/:id', getPurchaseInvoiceById);
purchaseinvoiceRouter.put('/:id', updatePurchaseInvoice);
purchaseinvoiceRouter.delete('/:id', deletePurchaseInvoice);

module.exports = purchaseinvoiceRouter;
