const express = require("express");
const { createPurchase, getMeta } = require("../controllers/purchaseController");
const purchaserouter = express.Router();


purchaserouter.post("/", createPurchase);
purchaserouter.get("/meta", getMeta);

module.exports = purchaserouter;
