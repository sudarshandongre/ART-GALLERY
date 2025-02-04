const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;


require("./models/model");
require("./models/post");

// middleware
app.use(cors()); 
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));

const dbUrl = "mongodb+srv://eshapal2209:Z2c2GiYtSaFg1OHW@cluster0.dvoet3l.mongodb.net/";
const connectParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl,connectParams);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("Error during connection.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
