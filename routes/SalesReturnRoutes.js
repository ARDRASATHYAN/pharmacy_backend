const express = require('express');
const { getAllReturns, getReturnById, createReturn, updateReturn, deleteReturn } = require('../controllers/SalesReturnController');
const salesreturnRouter = express.Router();


// CRUD routes
salesreturnRouter.get('/', getAllReturns);
salesreturnRouter.get('/:id', getReturnById);
salesreturnRouter.post('/', createReturn);
salesreturnRouter.put('/:id', updateReturn);
salesreturnRouter.delete('/:id', deleteReturn);

module.exports = salesreturnRouter;
