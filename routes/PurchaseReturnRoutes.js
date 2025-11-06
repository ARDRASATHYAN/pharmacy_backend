const express = require("express");
const { getAllReturns, getReturnById, createReturn, updateReturn, deleteReturn } = require("../controllers/PurchaseReturnController");
const purchasereturnRouter = express.Router();


// CRUD routes
purchasereturnRouter.get("/", getAllReturns);
purchasereturnRouter.get("/:id", getReturnById);
purchasereturnRouter.post("/", createReturn);
purchasereturnRouter.put("/:id", updateReturn);
purchasereturnRouter.delete("/:id", deleteReturn);

module.exports = purchasereturnRouter;
