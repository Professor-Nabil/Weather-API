```bash
# -> Returns the mock weather JSON.
http://localhost:3000/api/weather?city=london

# -> Returns a 400 Bad Request validation error.
http://localhost:3000/api/weather

# -> Returns a 404 Not Found error.
http://localhost:3000/api/invalid-url
```
