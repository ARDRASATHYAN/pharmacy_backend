const express = require('express');
const { getAllReturnItems, getReturnItemById, createReturnItem, updateReturnItem, deleteReturnItem } = require('../controllers/SalesReturnItemController');
const salesreturnitemRouter = express.Router();

// CRUD routes
salesreturnitemRouter.get('/', getAllReturnItems);
salesreturnitemRouter.get('/:id', getReturnItemById);
salesreturnitemRouter.post('/', createReturnItem);
salesreturnitemRouter.put('/:id', updateReturnItem);
salesreturnitemRouter.delete('/:id', deleteReturnItem);

module.exports = salesreturnitemRouter;
