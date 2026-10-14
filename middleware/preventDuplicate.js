const store = require('../store');

const norm = v => String(v ?? '').trim().toLowerCase();

/**
 * Blocks a registration when an ACTIVE registration already exists for the
 * same event with the same email OR the same student ID.
 * - POST: checks the incoming body.
 * - PUT : merges body with the existing record and ignores the record itself,
 *         so a participant can't edit their way into a duplicate.
 * Cancelled registrations don't count, so people may re-register.
 */
function preventDuplicate(req, res, next) {
  const records = store.load();
  const selfId = req.params.id;
  const existing = selfId ? records.find(r => r.id === selfId) : null;

  if (selfId && !existing)
    return res.status(404).json({ error: 'Registration not found' });

  const candidate = { ...(existing || {}), ...req.body };
  const email = norm(candidate.email);
  const studentId = norm(candidate.studentId);
  const event = norm(candidate.event);

  const clash = records.find(r =>
    r.status === 'active' &&
    r.id !== selfId &&
    norm(r.event) === event &&
    (email && norm(r.email) === email || studentId && norm(r.studentId) === studentId)
  );

  if (clash) {
    const field = norm(clash.email) === email ? 'email' : 'student ID';
    return res.status(409).json({
      error: 'Duplicate registration',
      message: `This ${field} is already registered for "${candidate.event}".`,
      existingRegistrationId: clash.id
    });
  }
  next();
}

module.exports = preventDuplicate;
