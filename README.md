# College Tech Event Registration API (Express.js)

## Run
```bash
npm install
npm start        # http://localhost:3000
```

## Endpoints
| Action | Method & Path | Notes |
|---|---|---|
| Register | `POST /api/registrations` | required: name, email, phone, college, event; optional: studentId, department, year |
| View one | `GET /api/registrations/:id` | |
| View all / search | `GET /api/registrations?email=&studentId=&event=&status=` | participants can look up their ID by email |
| Modify | `PUT /api/registrations/:id` | send only changed fields |
| Cancel | `DELETE /api/registrations/:id` | soft cancel (status = cancelled) |
| List events | `GET /api/events` | |

## Duplicate prevention (`middleware/preventDuplicate.js`)
Returns **409** if an *active* registration for the same event already has the same
email **or** student ID. Runs on register and on modify (excluding the record itself).
Cancelled registrations don't count, so a participant can re-register.

## Example
```bash
curl -X POST localhost:3000/api/registrations -H "Content-Type: application/json" \
 -d '{"name":"Tiya","email":"tiya@example.com","phone":"9876543210","college":"MACE","event":"Code Sprint","year":2}'
```
