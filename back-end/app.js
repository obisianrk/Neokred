const express = require("express");
const cors = require("cors");
const router = require("./routes/user.route");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://obisianrk:obisian111@cluster0.bz50swu.mongodb.net/Office",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", router);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
