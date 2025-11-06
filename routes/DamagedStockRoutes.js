const express = require('express');
const { getAllDamagedStock, getDamagedStockById, createDamagedStock, updateDamagedStock, deleteDamagedStock } = require('../controllers/DamagedStockController');
const DamagedStockRouter = express.Router();


// CRUD routes
DamagedStockRouter.get('/', getAllDamagedStock);
DamagedStockRouter.get('/:id', getDamagedStockById);
DamagedStockRouter.post('/', createDamagedStock);
DamagedStockRouter.put('/:id', updateDamagedStock);
DamagedStockRouter.delete('/:id', deleteDamagedStock);

module.exports = DamagedStockRouter;
