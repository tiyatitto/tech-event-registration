const { EVENTS: EVENT_LIST } = require('../config');
const EVENTS = EVENT_LIST.map(e => e.name);
const FIELDS = ['name', 'email', 'studentId', 'department', 'year', 'phone', 'college', 'event'];
const REQUIRED = ['name', 'email', 'phone', 'college', 'event'];

function check(body) {
  const errors = [];
  if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('email is invalid');
  if (body.phone !== undefined && body.phone !== '' && !/^\+?\d{10,13}$/.test(String(body.phone)))
    errors.push('phone must be 10-13 digits');
  if (body.year !== undefined && ![1, 2, 3, 4].includes(Number(body.year)))
    errors.push('year must be 1-4');
  if (body.event !== undefined && !EVENTS.includes(body.event))
    errors.push(`event must be one of: ${EVENTS.join(', ')}`);
  for (const f of ['name', 'college'])
    if (body[f] !== undefined && !String(body[f]).trim()) errors.push(`${f} cannot be empty`);
  return errors;
}

// Keep only known fields and trim strings.
function sanitize(body = {}) {
  const clean = {};
  for (const f of FIELDS)
    if (body[f] !== undefined) clean[f] = typeof body[f] === 'string' ? body[f].trim() : body[f];
  return clean;
}

function validateCreate(req, res, next) {
  req.body = sanitize(req.body);
  const errors = REQUIRED.filter(f => !req.body[f]).map(f => `${f} is required`).concat(check(req.body));
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });
  next();
}

function validateUpdate(req, res, next) {
  req.body = sanitize(req.body);
  if (!Object.keys(req.body).length)
    return res.status(400).json({ error: 'Provide at least one field to update' });
  const errors = check(req.body);
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });
  next();
}

module.exports = { validateCreate, validateUpdate, EVENTS };
