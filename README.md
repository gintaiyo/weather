# Atmospheric Weather Web App

A dynamic, full-screen weather application built with Node.js, Express, EJS, and CSS3. It queries WeatherAPI.com to render live weather data while transforming the entire viewport into a reactive sky canvas that matches the destination city's real-time local time, extreme climate thresholds, and weather conditions.

## 🛠️ Built With

### 🚀 Backend & Server Architecture
- **Express.js** — Web framework for Node.js routing
- **EJS (Embedded JavaScript)** — Server-side HTML templating engine
- **Axios** — HTTP client for weather API requests
- **Dotenv** — Environment variable configuration

---

## Installation Guide

### Prerequisites
- **Node.js** (v16 or higher)
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/signup/)

### 1. Clone or Download the Project
```bash
git clone https://github.com/your-username/atmospheric-weather-app.git
cd atmospheric-weather-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root folder (alongside `server.js`):
```env
PORT=3000
WEATHERAPI_KEY=your_actual_weatherapi_key_here
```

### 4. Run the Server
```bash
npm start
```

### 5. Access in Browser
Open your browser and visit: `http://localhost:3000`

---

## Project Structure

```text
weather-app/
│
├── public/
│   └── css/
│       └── style.css       # Complete CSS animations, gradients, and particle styles
├── views/
│   └── index.ejs           # EJS template with DOM particle scripts
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Example environment file template
├── .gitignore              # Ignores node_modules and .env
├── package.json            # Node.js project manifest and dependencies
├── README.md               # Documentation
└── server.js               # Express application server and weather logic
```

---

## 🌍 Recommended Test Locations

Try searching these cities to experience the various custom weather engines and animations:

| Location | Effect Triggered |
| :--- | :--- |
| **Bergen, Norway** / **Seattle, USA** | 🌧️ Rain Particles & Cloud Overlays |
| **Reykjavik, Iceland** / **Aspen, USA** | ❄️ Floating Snow Particles |
| **Riyadh, Saudi Arabia** / **Death Valley, USA** | ☀️ Extreme Heat Mirage & Scorching Sun |
| **Antarctica** / **Yakutsk, Russia** | 🧊 Frost Vignette & 🌌 Aurora Borealis (at Night) |
| **Cairo, Egypt** / **Doha, Qatar** | 🏜️ Dust / Sandstorm Particles |
| **Tokyo, Japan** | 🌙 Midnight Starry Night Sky |
