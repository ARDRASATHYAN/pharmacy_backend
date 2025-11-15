const sequelize = require("../config/db");
const Item = require("../models/ItemsModel");
const PurchaseInvoice = require("../models/PurchaseInvoicesModel");
const Store = require("../models/StoresModel");
const Supplier = require("../models/SupplierModel");


/**
 * @route POST /api/purchase
 * @desc Create Purchase Invoice + Items (Transactional)
 */
exports.createPurchase = async (req, res) => {
  const { invoice, items } = req.body;

  if (!invoice || !items || items.length === 0) {
    return res.status(400).json({ error: "Invoice and items are required" });
  }

  const t = await sequelize.transaction();

  try {
    // -------------------------
    // Step 1: calculate totals
    // -------------------------
    let total_amount = 0;
    let total_gst = 0;
    let total_discount = 0;

    items.forEach((item) => {
      const qty = Number(item.qty || 0);
      const rate = Number(item.purchase_rate || 0);
      const gst = Number(item.gst_percent || 0);
      const discount = Number(item.discount_percent || 0);

      const base = qty * rate;
      const discAmt = base * (discount / 100);
      const taxable = base - discAmt;
      const gstAmt = taxable * (gst / 100);
      const total = taxable + gstAmt;

      total_amount += base;
      total_discount += discAmt;
      total_gst += gstAmt;
    });

    const net_amount = total_amount - total_discount + total_gst;

    // -----------------------------------
    // Step 2: Insert purchase invoice
    // -----------------------------------
    const purchaseInvoice = await PurchaseInvoice.create(
      {
        invoice_no: invoice.invoice_no,
        invoice_date: invoice.invoice_date,
        store_id: invoice.store_id,
        supplier_id: invoice.supplier_id,
        created_by: invoice.created_by,
        total_amount,
        total_gst,
        total_discount,
        net_amount,
      },
      { transaction: t }
    );

    // -----------------------------------
    // Step 3: Insert purchase items
    // -----------------------------------
    for (const item of items) {
      await PurchaseItems.create(
        {
          purchase_id: purchaseInvoice.purchase_id,
          item_id: item.item_id,
          batch_no: item.batch_no,
          expiry_date: item.expiry_date,
          pack_qty: item.pack_qty || 1,
          qty: item.qty,
          purchase_rate: item.purchase_rate,
          mrp: item.mrp,
          gst_percent: item.gst_percent,
          discount_percent: item.discount_percent,
          total_amount: item.total_amount,
        },
        { transaction: t }
      );
    }

    // Commit
    await t.commit();

    res.json({
      success: true,
      purchase_id: purchaseInvoice.purchase_id,
    });

  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: "Failed to save purchase", details: err.message });
  }
};


/**
 * @route GET /api/purchase/meta
 * @desc Return Stores, Suppliers, Items
 */
exports.getMeta = async (req, res) => {
  try {
    const stores = await Store.findAll();
    const suppliers = await Supplier.findAll();
    const items = await Item.findAll();

    res.json({ stores, suppliers, items });
  } catch (err) {
    res.status(500).json({ error: "Failed to load data" });
  }
};
