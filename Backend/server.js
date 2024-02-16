const express = require("express");
const { ConnecttoDB, disconnecttoDB } = require("./db");
const routes = require("./routes");
const cors = require("cors");
const { disconnect } = require("mongoose");

const app = express();


app.use(express.json());
app.use(cors());


app.use("/dance", routes);

const port = 3000 || 3001;
app.listen(port, () => {
  ConnecttoDB();
  console.log("this server is running in", port);
});
