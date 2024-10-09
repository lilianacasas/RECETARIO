const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(`No se ha conectado a MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;