const express = require('express');
const storeStockRouter = express.Router();
const storeStockController = require('../controllers/storeStockController');


storeStockRouter.post('/', storeStockController.createStock);
storeStockRouter.get('/', storeStockController.getAllStocks);
storeStockRouter.get('/:id', storeStockController.getStockById);
storeStockRouter.put('/:id', storeStockController.updateStock);
storeStockRouter.delete('/:id', storeStockController.deleteStock);

module.exports = storeStockRouter;
