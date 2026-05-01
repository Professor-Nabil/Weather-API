```bash
# -> Returns the mock weather JSON.
http://localhost:3000/api/weather?city=london

# -> Returns a 400 Bad Request validation error.
http://localhost:3000/api/weather

# -> Returns a 404 Not Found error.
http://localhost:3000/api/invalid-url

# Test Location Parameter:
# -> Now works the same as ?city=!
http://localhost:3000/api/weather?location=tokyo

# Test Live Output:
# -> Returns live parsed weather data from Visual Crossing with "source": "api".
http://localhost:3000/api/weather?city=paris
```
