require("dotenv").config();
const mongoose = require("mongoose");
const Car = require("./models/carmodel");
const cars = require("./data/cardata");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB Connected...");

    await Car.deleteMany({});
    console.log("🗑 Existing data deleted...");

    await Car.insertMany(cars);
    console.log("✅ Dummy data inserted successfully!");

    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));
