const express = require("express");
const app = express();
const { ConnecttoDB, disconnecttoDB, isConnected } = require("./db");
const routes = require("./routes");
const cors = require("cors");

app.use(cors())
app.use(express.json())

app.use("/dance", routes);

app.listen(3000, () => {
  ConnecttoDB();
  console.log("this server is running in 3000");
});
