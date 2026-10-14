const express = require('express');
const crypto = require('crypto');
const store = require('../store');
const preventDuplicate = require('../middleware/preventDuplicate');
const { validateCreate, validateUpdate } = require('../middleware/validate');

const router = express.Router();

// REGISTER
router.post('/', validateCreate, preventDuplicate, (req, res) => {
  const records = store.load();
  const record = {
    id: 'REG-' + crypto.randomBytes(3).toString('hex').toUpperCase(),
    ...req.body,
    status: 'active',
    registeredAt: new Date().toISOString()
  };
  records.push(record);
  store.save(records);
  res.status(201).json({ message: 'Registration successful', registration: record });
});

// VIEW ALL (optional filters: ?event=&email=&studentId=&status=)
router.get('/', (req, res) => {
  const { event, email, studentId, status } = req.query;
  const eq = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();
  const list = store.load().filter(r =>
    (!event || eq(r.event, event)) &&
    (!email || eq(r.email, email)) &&
    (!studentId || eq(r.studentId, studentId)) &&
    (!status || r.status === status)
  );
  res.json({ count: list.length, registrations: list });
});

// VIEW ONE
router.get('/:id', (req, res) => {
  const record = store.load().find(r => r.id === req.params.id);
  if (!record) return res.status(404).json({ error: 'Registration not found' });
  res.json(record);
});

// MODIFY
router.put('/:id', validateUpdate, preventDuplicate, (req, res) => {
  const records = store.load();
  const i = records.findIndex(r => r.id === req.params.id);
  if (records[i].status === 'cancelled')
    return res.status(400).json({ error: 'Cancelled registrations cannot be modified' });
  records[i] = { ...records[i], ...req.body, updatedAt: new Date().toISOString() };
  store.save(records);
  res.json({ message: 'Registration updated', registration: records[i] });
});

// CANCEL (soft delete, so history is kept and the slot can be re-registered)
router.delete('/:id', (req, res) => {
  const records = store.load();
  const i = records.findIndex(r => r.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'Registration not found' });
  if (records[i].status === 'cancelled')
    return res.status(400).json({ error: 'Registration is already cancelled' });
  records[i].status = 'cancelled';
  records[i].cancelledAt = new Date().toISOString();
  store.save(records);
  res.json({ message: 'Registration cancelled', registration: records[i] });
});

module.exports = router;
