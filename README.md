# Country Explorer

A modern, responsive web app to explore country details with maps, flags, and facts using public APIs.

- [Country Explorer](#country-explorer)
  - [Live Demo](#live-demo)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Other Libraries And Frameworks](#other-libraries-and-frameworks)
  - [APIs Used](#apis-used)
    - [External APIs](#external-apis)
    - [Internal APIs](#internal-apis)
  - [Getting Started (Local Development)](#getting-started-local-development)
  - [Production Deployment](#production-deployment)
    - [Docker Compose Configuration](#docker-compose-configuration)
  - [Credits](#credits)

## Live Demo

- [country-explorer.nimendra.xyz](https://country-explorer.nimendra.xyz) 🟢

> [!IMPORTANT]
> For detailed deployment instructions, please refer to the [Production Deployment](#deployment) section.

## Features

- 🔎 Search for countries with live suggestions
- 🌐 Filter by region and language
- 🧾 View official details like population, capital, timezones, currencies
- 🗺️ Interactive map using OpenStreetMap + Leaflet
- 🤝 Border country navigation
- 🌗 Dark mode support
- ⚡ Built with React 19 + Vite + Tailwind CSS
- 🔥 **Trending Countries** – discover what's most viewed today

>[!NOTE] 
> When a user visits a country’s detail page, a backend API tracks the country’s `cca3` code in Redis, using a key for the current date.
> - Redis sorted sets (`ZINCRBY`) are used to count views per country per day.
> - The data automatically expires after 24 hours to reset daily.
> - A frontend widget fetches and displays the top 5 most-viewed countries for the current day.

## Tech Stack

| Tech                 | Description                            |
|----------------------|----------------------------------------|
| React 19             | UI framework (SPA with React Router)   |
| Tailwind CSS         | Utility-first CSS                      |
| React Query (TanStack) | Data fetching + caching              |
| Leaflet + React Leaflet | Interactive maps + markers         |
| Vite                 | fast build tool              |
| Express.js           | Backend API                            |
| PostgreSQL           | Persistent storage for users/favorites |
| Redis                | Tracks daily trending country views    |
| Caddy |	Modern web server used as a reverse proxy with automatic HTTPS|

### Other Libraries And Frameworks

1. **[Express](https://expressjs.com/)** – Minimalist web framework for Node.js.
2. **[JWT](https://jwt.io/)** – JSON Web Token authentication.
3. **[Pino, Pino-Http, Pino-Pretty](https://getpino.io/)** – High-performance structured logging.
4. **[Http-Status-Codes](https://www.npmjs.com/package/http-status-codes)** – HTTP status code constants for cleaner API responses.
5. **[Ioredis](https://github.com/luin/ioredis)** – Advanced Redis client with clustering and pub/sub support.
6. **[Sequelize](https://sequelize.org/)** – Promise-based ORM for PostgreSQL and other relational databases.
7. **[Argon2](https://www.npmjs.com/package/argon2)** – Secure password hashing algorithm used for storing user credentials.

## APIs Used

- 🧾 [REST Countries API](https://restcountries.com)
- 📖 [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/#/)
- 🌍 [OpenStreetMap](https://www.openstreetmap.org)

### External APIs

| Method | Endpoint                                                       | Description                                                       |
| ------ | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `GET`  | `https://restcountries.com/v3.1/all`                           | Fetch data for all countries                                      |
| `GET`  | `https://restcountries.com/v3.1/alpha?codes=USA,JPN,...`       | Fetch multiple countries by comma-separated `cca3` codes          |
| `GET`  | `https://restcountries.com/v3.1/alpha/{code}`                  | Get a single country by 2-letter or 3-letter code                 |
| `GET`  | `https://restcountries.com/v3.1/name/{name}`                   | Search country by full or partial name                            |

### Internal APIs

| Method   | Endpoint               | Description                                           | Auth Required |
| -------- | ---------------------- | ----------------------------------------------------- | ------------- |
| `POST`   | `/api/auth/register`   | Register a new user                                   | No          |
| `POST`   | `/api/auth/login`      | Authenticate a user and return JWT                    | No          |
| `POST`   | `/api/favorites`       | Add a country to user’s favorites                     | Yes         |
| `DELETE` | `/api/favorites/:cca3` | Remove a country from favorites                       | Yes         |
| `GET`    | `/api/favorites`       | Get all favorite countries for authenticated user     | Yes         |
| `POST`   | `/api/trending/track`  | Track a country view (adds to daily Redis sorted set) | No          |
| `GET`    | `/api/trending`        | Get today’s top trending countries (from Redis)       | No          |

## Getting Started (Local Development)

```bash
# 1. Clone the project
git clone https://github.com/your-username/rest-countries-frontend.git
cd rest-countries-frontend

# 2. Install frontend dependencies
cd Frontend
npm install

# 3. Start the frontend
npm run dev
````

## Production Deployment

📦 **Docker Image:** [GitHub Container Registry](https://github.com/nmdra?tab=packages&repo_name=Country-Explorer)  

This will start the following services:

| Service  | Port | Description                           |
| -------- | ---- | ------------------------------------- |
| Frontend | 80   | React app served via production build |
| Backend  | 5000 | Express.js API                        |
| Postgres | —    | Database for users/favorites          |
| Redis    | —    | Tracks daily country views            |

> Optional: You can expose `5432` or `6379` for Postgres/Redis if needed.

### Docker Compose Configuration

```yaml
services:
  backend:
    image: ghcr.io/nmdra/country-explorer-backend
    build:
      context: ./Backend
      target: development 
    container_name: country-backend
    hostname: country-backend
    ports:
      - "5000:5000"
    env_file:
      - ./Backend/.env
    depends_on:
      - postgres
      - redis
    networks:
      - country-network

  frontend:
    image: ghcr.io/nmdra/country-explorer-frontend
    build:
      context: ./Frontend
      target: production 
    container_name: country-frontend
    hostname: country-frontend
    ports:
      - "80:80"
    networks:
      - country-network

  postgres:
    image: postgres:17-alpine
    container_name: country-postgres
    hostname: postgres
    restart: always
    environment:
      POSTGRES_DB: countries
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - country-network

  redis:
    image: redis:alpine
    container_name: country-redis
    hostname: redis
    restart: always
    command: >
      redis-server
      --save 60 1
      --appendonly yes
      --appendfsync everysec
      --loglevel warning
    volumes:
      - redis-data:/data
    networks:
      - country-network

volumes:
  postgres-data:
  redis-data:

networks:
  country-network:
    driver: bridge
```
## Credits

* Built by [Nimendra](https://github.com/nmdra)
* Data from [restcountries.com](https://restcountries.com) and [Wikipedia](https://en.wikipedia.org)
* Maps from [OpenStreetMap](https://www.openstreetmap.org)

