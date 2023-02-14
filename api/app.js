const express = require('express');
const cors = require("cors");
const createError = require('http-errors');
const morgan = require('morgan');
const fileUpload = require("express-fileupload");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(fileUpload({
  createParentPath: true
}));
//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'));

app.use("/api/auth", require("./routes/auth.route"));
app.use('/api/device', require('./routes/device.route'));
app.use('/api/super-admin', require('./routes/super-admin.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/vendor', require('./routes/vendor.route'));
app.use('/api/user', require('./routes/user.route'));
app.use('/api/account-details', require('./routes/account-details.route'));
app.use('/api/invoice', require('./routes/invoice.route'));


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
