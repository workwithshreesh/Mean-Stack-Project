const express = require("express");
const fs = require("fs");
const path = require("path");
const { findFile } = require("../filefinder");

const router = express.Router();
const BASE_DIR = path.resolve(__dirname, "../../");

router.post("/search", (req, res) => {
    console.log("REQ BODY:", req.body);   
  if (!req.body) {
    return res.status(400).json({
      error: "Request body missing"
    });
  }

  const { artifacts } = req.body;

  if (!artifacts || !Array.isArray(artifacts)) {
    return res.status(400).json({
      error: "artifacts must be an array"
    });
  }


  const results = [];

  for (const artifact of artifacts) {
    // Basic security validation
    if (!artifact || artifact.includes("..")) {
      results.push({
        artifact_name: artifact,
        found: false,
        path: null,
        content: null,
        error: "Invalid artifact name"
      });
      continue;
    }

    const filePath = findFile(BASE_DIR, artifact);

    if (!filePath) {
      results.push({
        artifact_name: artifact,
        found: false,
        path: null,
        content: null
      });
      continue;
    }

    const content = fs.readFileSync(filePath, "utf-8");

    results.push({
      artifact_name: artifact,
      found: true,
      path: filePath,
      content
    });
  }

  return res.json({ results });
});

module.exports = router;
