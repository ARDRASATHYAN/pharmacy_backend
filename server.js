require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const hsnRouter = require('./routes/hsnRoutes');
const drugScheduleRouter = require('./routes/drugScheduleRoutes');
const itemsRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const storeRouter = require('./routes/storeRoutes');
const supplierRouter = require('./routes/suppliersRoutes');
const customerRouter = require('./routes/customerRoutes');
const storeStockRouter = require('./routes/storeStockRoutes');
const purchaseinvoiceRouter = require('./routes/purchaseInvoiceRoutes');
const purchaseItemsRouter = require('./routes/purchaseItemsRoutes');
const purchasereturnRouter = require('./routes/PurchaseReturnRoutes');
const purchasereturnitemRouter = require('./routes/PurchaseReturnItemRoutes');
const salesreturnRouter = require('./routes/SalesReturnRoutes');
const salesinvoiceRouter = require('./routes/SalesInvoiceRoutes');
const salesitemRouter = require('./routes/SalesItemRoutes');
const salesreturnitemRouter = require('./routes/SalesReturnItemRoutes');
const DamagedStockRouter = require('./routes/DamagedStockRoutes');
const ExcessStockRouter = require('./routes/ExcessStockRoutes');
const authRouter = require('./routes/authRoutes');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const startCleanupJob = require('./utils/cleanupTokens');
const roleRouter = require('./routes/roleRoutes');
const purchaserouter = require('./routes/purchaseRoutes');




const app = express();
app.use(cors({
  origin:  [
  "http://localhost:5173",                   // local dev
  "https://pharmacy-pied-xi.vercel.app",     // live frontend
], // your Next.js URL
  credentials: true, // ✅ allow cookies
}));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined'));

// Sync all models (creates table if not exists)
sequelize.sync().then(() => {
  console.log('✅ All models synchronized');

  startCleanupJob();
});

//routes
app.use('/api/user', userRouter);//api correct
app.use('/api/store', storeRouter);//correct
app.use('/api/hsn', hsnRouter);//correct
app.use('/api/drug_Schedule', drugScheduleRouter);//correct
app.use('/api/items', itemsRouter);//correct
app.use('/api/supplier', supplierRouter);//correct
app.use('/api/customer', customerRouter);//correct
app.use('/api/store_stock', storeStockRouter);//correct
app.use('/api/purchase_invoice', purchaseinvoiceRouter);
app.use('/api/purchase_Items', purchaseItemsRouter);
app.use('/api/purchase_return',purchasereturnRouter);
app.use('/api/purchase_return_item',purchasereturnitemRouter);
app.use('/api/sales_invoice',salesinvoiceRouter);
app.use('/api/sales_item',salesitemRouter);
app.use('/api/sales_return',salesreturnRouter);
app.use('/api/sales_return_item',salesreturnitemRouter)
app.use('/api/damaged_stock',DamagedStockRouter)
app.use('/api/Excess_Stock',ExcessStockRouter)
app.use('/api/auth',authRouter)
app.use('/api/role',roleRouter)
app.use('/api/purchase',purchaserouter)


app.listen(process.env.PORT || 5000, () =>
  console.log('Server running on port', process.env.PORT || 5000)
);




