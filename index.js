if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/credbox");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

require("./models/Cafeteria");
require("./models/City");
require("./models/Counter");
require("./models/Item");

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(require("cors")());
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post("*", function (req, res) {
//   console.log(req.body);
//   return res.status(200).json({ msg: "Hello world!" });
// });

app.get("/", function (req, res) {
  console.log("request");
  return res.status(200).json({ msg: "Hello world!" });
});

app.use("/user", require("./routes/users"));
app.use("/order", require("./routes/orders"));
app.use("/counter", require("./routes/counters"));
app.use("/tod", require("./routes/tods"));

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
