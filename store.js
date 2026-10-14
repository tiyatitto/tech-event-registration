// Tiny JSON-file store so data survives restarts (swap for MongoDB/SQL later).
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'registrations.json');

function load() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
  catch { return []; }
}

function save(records) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(records, null, 2));
}

module.exports = { load, save };
