# Tech Stack & Dependencies | Weather API Wrapper Service

A comprehensive overview of the libraries and technologies selected for reliability, speed, and standard production compliance.

## ⚙️ Core Runtime & Framework

- **Runtime Environment**: `Node.js` (v20+ LTS recommended)
- **Programming Language**: `TypeScript` (v5+) — Provides full end-to-end type safety, autocompletion, and compile-time error catching.
- **Web Framework**: `Express` (v5.x) — Lightweight, mature, and perfectly suited for building low-overhead REST APIs.

## 🔌 Core Dependencies & Drivers

- **3rd-Party Data Integration**: `Visual Crossing Weather API` — A reliable, rich, and free weather data provider.
- **Caching Driver**: `redis` (v4+) — High-performance, asynchronous Node.js client for reading and writing to our in-memory Redis layer.
- **HTTP Client**: `axios` (v1+) — Provides robust request cancellation, interceptor support, and standard error serialization for external requests.
- **Environment Variables**: `dotenv` (v16+) — Parses variables from our `.env` securely into `process.env`.

## 🛡️ Security & Rate Limiting

- **Rate Limiter**: `express-rate-limit` (v7+) — Standard middleware used to limit repeated requests to public APIs. Defends our endpoints against abuse and limits external API burn.

## 🧪 Testing Suite

- **Test Runner**: `vitest` (v3+) — Next-generation, lightning-fast ESM-first test runner.
- **HTTP Testing Utility**: `supertest` — Allows hitting Express routes seamlessly in memory without taking up physical system ports.

## 🔨 Build & Utility Tools

- **TS Execution**: `tsx` — Fast TypeScript execution directly for our local development server watching needs.
- **Compilation**: `tsc` — Standard TypeScript compiler used to output plain JavaScript for the production build steps.
