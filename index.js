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

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(require("cors")());
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  return res.send("Hello world!");
});

app.use("/user", require("./routes/users"));
// app.use("/order", require("./routes/order"));
// app.use("/counter", require("./routes/counter"));
// app.use("/tod", require("./routes/tod"));

app.listen(3000, () => {
  console.log("server started on port 3000");
});
