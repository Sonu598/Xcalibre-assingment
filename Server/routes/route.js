const express = require("express");
const Router = express.Router();
const db = require("../config/db");
const convertTextToSQL = require("../middleware/geminAI");
// const limiter = require("../middleware/retelimit");
// const NodeCache = require("node-cache");
// const queryCache = new NodeCache({ stdTTL: 300 });

Router.post("/query", async (req, res) => {
  const { naturalQuery } = req.body;
  if (!naturalQuery) return res.status(400).json({ error: "Query required" });
  if (naturalQuery) {
    return res.json(naturalQuery);
  }
  try {
    const sqlQuery = await convertTextToSQL(naturalQuery);
    const [rows] = await db.query(sqlQuery);
    queryCache.set(naturalQuery, rows);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ Error_: error.message, data: sqlQuery });
  }
});

module.exports = Router;
