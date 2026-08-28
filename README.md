# EcoCart

EcoCart is a sustainability-focused shopping experience that helps people make more considered purchases and turn checkout round-ups into measurable environmental impact.

The project includes a responsive React storefront, a functional client-side cart, round-up calculations, impact metrics, and an Express API for health checks, mock products, cart operations, and round-up calculations.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Application Modes](#application-modes)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Development Notes](#development-notes)
- [Testing](#testing)
- [Deployment](#deployment)

## Features

- Responsive storefront experience for desktop and mobile screens
- Product browsing by category
- Product search
- Product imagery, ratings, pricing, and sustainability information
- Client-side cart with quantity controls
- Cart drawer with subtotal, round-up, and total calculations
- Round-up toggle for environmental contributions
- Live impact summary showing trees funded and estimated CO2 offset
- Cart selection carousel in the impact section
- Floating cart action after the user scrolls
- Express API endpoints for health, products, cart, and round-up calculations
- Production serving of the built Vite client through Express

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite 5
- CSS
- Manrope typography via Google Fonts

### Backend

- Node.js
- Express 5
- CORS

## Project Structure

```text
EcoCart/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EcoCartApp.css
│   │   │   └── EcoCartApp.tsx
│   │   ├── data/
│   │   │   └── products.ts
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- Git, if you plan to contribute or push changes

Check your installed versions:

```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vedants06/EcoCart.git
cd EcoCart
```

### 2. Install dependencies

Install backend dependencies from the repository root:

```bash
npm install
```

Install frontend dependencies:

```bash
npm --prefix client install
```

### 3. Start the frontend in development mode

```bash
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`.

### 4. Start the API server

Open a second terminal in the repository root and run:

```bash
npm start
```

The Express server runs at `http://localhost:5000` by default.

## Available Scripts

Run these commands from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite frontend development server. |
| `npm run build` | Creates a production build in `client/dist`. |
| `npm start` | Starts the Express server on port 5000 or the configured `PORT`. |
| `npm test` | Placeholder command; automated tests are not configured yet. |

Frontend-only commands can be run from `client/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Vite. |
| `npm run build` | Bundles the frontend for production with Vite. |
| `npm run preview` | Previews the production frontend build locally. |

## Application Modes

### Development

Use Vite for fast frontend development and run Express separately when testing API endpoints. The current frontend uses local product data and client-side cart state, so the storefront can be explored without the API server.

### Production

Build the frontend first, then start Express:

```bash
npm run build
npm start
```

Open `http://localhost:5000`. Express serves the files generated in `client/dist`.

## API Reference

The API is served by Express on port `5000` by default.

### Health check

```http
GET /api/health
```

Example response:

```json
{
	"status": "ok",
	"message": "Eco-Cart API is running"
}
```

### Get mock products

```http
GET /api/products
```

### Get the current in-memory cart

```http
GET /api/cart
```

### Add a product to the cart

```http
POST /api/cart/add
Content-Type: application/json

{
	"productId": 1
}
```

Returns `404` when the product ID does not exist.

### Calculate a round-up

```http
POST /api/roundup
Content-Type: application/json

{
	"cartTotal": 24.45
}
```

Example response:

```json
{
	"roundupAmount": "0.55",
	"treesPlanted": "0.550",
	"co2Offseted": "11000"
}
```

The current calculation uses `$1.00` per tree and estimates `20,000` grams of CO2 offset per tree. These are demonstration values and should be replaced with verified project-specific impact data before production use.

## Configuration

The API port can be changed with the `PORT` environment variable:

PowerShell:

```powershell
$env:PORT=8080
npm start
```

macOS/Linux:

```bash
PORT=8080 npm start
```

No environment file is required for the current demo.

## Development Notes

- Product data used by the React storefront is defined in `client/src/data/products.ts`.
- Cart state in the React application is held in memory and resets on refresh.
- The Express cart is also held in memory and resets whenever the server restarts.
- The current API product list is maintained separately in `server.js`.
- Product and hero images are loaded from Unsplash URLs, so an internet connection is required for those images to display.
- CORS is enabled for development convenience.
- No authentication, payment processing, database, inventory management, or order persistence is implemented yet.

## Testing

There is currently no automated test suite configured. Before opening a pull request, verify at minimum:

```bash
npm run build
npm start
```

Then check the following manually:

- Products render on desktop and mobile layouts.
- Category filters and search update the catalog.
- Adding products updates the cart and impact panel.
- Decimal subtotals produce a round-up amount.
- The round-up toggle updates the total and impact metrics.
- Cart quantity controls remove an item at quantity zero.
- API endpoints respond correctly.

## Deployment

For a basic Node-compatible deployment:

1. Install root and client dependencies.
2. Run `npm run build`.
3. Start the application with `npm start`.
4. Set `PORT` using the hosting provider's environment configuration.

The deployment environment must use Node.js 18 or later and expose the configured port. For a production deployment, add a persistent database, secure CORS configuration, input validation, structured logging, monitoring, and a real payment provider before accepting orders.