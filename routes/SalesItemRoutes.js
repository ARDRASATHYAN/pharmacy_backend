const express = require('express');
const { getAllItems,getItemById,createItem,updateItem,deleteItem } = require('../controllers/SalesItemController');
const salesitemRouter = express.Router();


// CRUD routes
salesitemRouter.get('/', getAllItems);
salesitemRouter.get('/:id', getItemById);
salesitemRouter.post('/', createItem);
salesitemRouter.put('/:id', updateItem);
salesitemRouter.delete('/:id', deleteItem);

module.exports = salesitemRouter;
