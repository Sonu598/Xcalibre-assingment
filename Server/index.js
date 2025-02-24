const express = require("express");
const cors = require("cors");
const Router = require("./routes/route");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/hospitalAi", Router);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
