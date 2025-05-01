# Country Explorer

A modern, responsive web app to explore country details with maps, flags, and facts using public APIs.

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/nmdra/Country-Explorer)

## Live Demo

- [country-explorer.nimendra.xyz](https://country-explorer.nimendra.xyz) 🟢
- [country-explorer-ruddy-iota.vercel.app](https://country-explorer-ruddy-iota.vercel.app)

## Features

- 🔎 Search for countries with live suggestions
- 🌐 Filter by region and language
- 🧾 View official details like population, capital, timezones, currencies
- 🗺️ Interactive map using OpenStreetMap + Leaflet
- 🤝 Border country navigation 
- 🌗 Dark mode support
- ⚡ Built with React 19 + Vite + Tailwind CSS

## Tech Stack

| Tech              | Description                                 |
|-------------------|---------------------------------------------|
| React 19        | UI framework (SPA with React Router)         |
| Tailwind CSS    | CSS Framework                 |
| React Query     | Data fetching, caching and pagination        |
| Leaflet + React Leaflet | Interactive maps + markers              |
| Vite            | build tool               |

## APIs Used

- 🧾 [REST Countries API](https://restcountries.com) – detailed country data
- 📖 [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/#/) – country introductions
- 🌍 [OpenStreetMap](https://www.openstreetmap.org) – interactive map tiles

## Getting Started

```bash
# 1. Clone the project
git clone https://github.com/your-username/rest-countries-frontend.git
cd rest-countries-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
### Scripts

| Script        | Description                 |
|---------------|-----------------------------|
| `npm run dev` | Start dev server (Vite)     |
| `npm run build` | Production build           |
| `npm run preview` | Preview built app       |


## One-click Deploy

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/nmdra/Country-Explorer)

---

## Credits

- Built by [Nimendra](https://github.com/nmdra)
- Data from [restcountries.com](https://restcountries.com) and [Wikipedia](https://en.wikipedia.org)
- Maps from [OpenStreetMap](https://www.openstreetmap.org)
