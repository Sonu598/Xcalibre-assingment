const express = require("express");
const Router = express.Router();
const db = require("../config/db");
const convertTextToSQL = require("../middleware/geminAI");

Router.post("/query", async (req, res) => {
  const { naturalQuery } = req.body;
  if (!naturalQuery) return res.status(400).json({ error: "Query required" });
  if (naturalQuery) {
    try {
      const sqlQuery = await convertTextToSQL(naturalQuery);
      const [rows] = await db.query(sqlQuery);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ Error_: error.message });
    }
  }
});

module.exports = Router;
