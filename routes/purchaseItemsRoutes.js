const express = require('express');
const { createPurchaseItem, getAllPurchaseItems, getPurchaseItemById, updatePurchaseItem, deletePurchaseItem } = require('../controllers/purchaseItemsController');
const purchaseItemsRouter = express.Router();


// ✅ CRUD routes
purchaseItemsRouter.post('/', createPurchaseItem);
purchaseItemsRouter.get('/', getAllPurchaseItems);
purchaseItemsRouter.get('/:id', getPurchaseItemById);
purchaseItemsRouter.put('/:id', updatePurchaseItem);
purchaseItemsRouter.delete('/:id', deletePurchaseItem);

module.exports = purchaseItemsRouter;
