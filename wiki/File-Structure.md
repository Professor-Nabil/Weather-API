# Project File Structure | Weather API Wrapper Service

This layout follows the clean, scalable **MVC (Model-View-Controller)** pattern
with distinct layers for routing, caching/fetching services, and request validation.

```text
.
├── .env                  # Local environment variables (Git ignored)
├── .env.example          # Sample environment template
├── .gitignore            # Git exclusions
├── package.json          # Dependencies and script definitions
├── tsconfig.json         # TypeScript compiler configurations
├── src
│   ├── app.ts            # Express application setup and middleware mounting
│   ├── server.ts         # Server bootstrapper & database/cache initialization
│   ├── controllers       # Route handling logic
│   │   └── weatherController.ts
│   ├── services          # Core business services
│   │   ├── weatherService.ts  # Handles 3rd-party API calls
│   │   └── cacheService.ts    # Handles Redis read, write, and expiry
│   ├── routes            # API Endpoint definitions
│   │   └── weatherRoutes.ts
│   ├── middleware        # Custom express middleware
│   │   ├── rateLimiter.ts     # Express rate limiting
│   │   └── errorHandler.ts    # Centralized global error middleware
│   ├── utils             # Utility helpers
│   │   └── formatters.ts      # Data parsers or sanitization utilities
│   └── types             # TypeScript interface definitions
│       └── index.ts
└── tests                 # Integration and unit tests
    └── app.test.ts
```

### Directory Breakdown

- **`src/app.ts` vs `src/server.ts`**:
  Disconnects our application configuration from the server port listener,
  making tests ultra-fast and reliable.

- **`src/controllers/`**:
  Extracts the requests, talks to the services, and returns formatted JSON. Keeps routes clean.

- **`src/services/`**:
  The core engines of the app. `weatherService`
  uses an HTTP client to communicate with the external API, while `cacheService` uses the Redis driver.

- **`src/middleware/`**:
  Handles global aspects like rate limits (`express-rate-limit`) and error catching.
