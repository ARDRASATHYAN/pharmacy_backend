const express = require('express');

const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/PurchaseReturnItemController');
const purchasereturnitemRouter = express.Router();


// CRUD routes
purchasereturnitemRouter.get('/', getAllItems);
purchasereturnitemRouter.get('/:id', getItemById);
purchasereturnitemRouter.post('/', createItem);
purchasereturnitemRouter.put('/:id', updateItem);
purchasereturnitemRouter.delete('/:id', deleteItem);

module.exports = purchasereturnitemRouter;
