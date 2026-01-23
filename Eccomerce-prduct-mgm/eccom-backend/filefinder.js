const fs = require("fs");
const path = require("path");

/**
 * Recursively search for a file inside baseDir
 */
function findFile(baseDir, targetFile) {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);

    if (entry.isFile() && entry.name === targetFile) {
      return fullPath;
    }

    if (entry.isDirectory()) {
      const result = findFile(fullPath, targetFile);
      if (result) return result;
    }
  }
  return null;
}

module.exports = { findFile };
