const express = require("express");
const app = express();
const { ConnecttoDB, disconnecttoDB, isConnected } = require("./db");
const routes = require("./routes")

app.use("/", routes);

app.listen(3000, () => {
  ConnecttoDB();
  console.log("this server is running in 3000");
});
