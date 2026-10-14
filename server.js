const express = require('express');
const path = require('path');
const { FEST, EVENTS } = require('./config');
const registrations = require('./routes/registrations');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serves the frontend

app.get('/api/fest', (req, res) => res.json({ fest: FEST, events: EVENTS }));
app.get('/api/events', (req, res) => res.json({ events: EVENTS }));
app.use('/api/registrations', registrations);

// 404 + error handlers
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed')
    return res.status(400).json({ error: 'Invalid JSON body' });
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module)
  app.listen(PORT, () => console.log(`Event registration API running on http://localhost:${PORT}`));

module.exports = app;
