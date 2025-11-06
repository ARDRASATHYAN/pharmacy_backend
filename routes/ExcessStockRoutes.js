const express = require('express');
const { getExcessStockById, getAllExcessStock, createExcessStock, updateExcessStock, deleteExcessStock } = require('../controllers/ExcessStockController');
const ExcessStockRouter = express.Router();
// CRUD routes
ExcessStockRouter.get('/', getAllExcessStock);
ExcessStockRouter.get('/:id', getExcessStockById);
ExcessStockRouter.post('/', createExcessStock);
ExcessStockRouter.put('/:id', updateExcessStock);
ExcessStockRouter.delete('/:id', deleteExcessStock);

module.exports = ExcessStockRouter;
