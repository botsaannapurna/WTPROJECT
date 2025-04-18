const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected successfully"))
.catch((err) => console.log("Error:", err));
require('./Category');
require('./Recipe');