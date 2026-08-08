const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.process?.env?.PORT || process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.post('/', async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.WEATHERAPI_KEY;

  if (!city || city.trim() === '') {
    return res.render('index', { weather: null, error: 'Please enter a city name.' });
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city.trim())}&aqi=no`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const localTimeStr = data.location.localtime;
    const localHour = parseInt(localTimeStr.split(' ')[1].split(':')[0], 10);

    let timeOfDay = 'night';
    if (data.current.is_day === 1) {
      if (localHour >= 5 && localHour <= 7) {
        timeOfDay = 'sunrise';
      } else if (localHour >= 18 && localHour <= 20) {
        timeOfDay = 'sunset';
      } else {
        timeOfDay = 'day';
      }
    } else {
      timeOfDay = 'night';
    }

    const tempC = Math.round(data.current.temp_c);
    const isExtremeHeat = tempC >= 35;
    const isExtremeCold = tempC <= -10;
    const isAurora = isExtremeCold && timeOfDay === 'night';

    const conditionText = data.current.condition.text;
    const conditionLower = conditionText.toLowerCase();

    let precipType = 'none';
    if (
      conditionLower.includes('rain') ||
      conditionLower.includes('drizzle') ||
      conditionLower.includes('shower') ||
      conditionLower.includes('thunder')
    ) {
      precipType = 'rain';
    } else if (
      conditionLower.includes('snow') ||
      conditionLower.includes('sleet') ||
      conditionLower.includes('blizzard') ||
      conditionLower.includes('ice')
    ) {
      precipType = 'snow';
    } else if (
      conditionLower.includes('sand') ||
      conditionLower.includes('dust') ||
      conditionLower.includes('haze')
    ) {
      precipType = 'dust';
    }

    const isCloudy =
      conditionLower.includes('cloud') ||
      conditionLower.includes('overcast') ||
      conditionLower.includes('fog') ||
      data.current.cloud > 25;

    const weather = {
      city: data.location.name,
      region: data.location.region,
      country: data.location.country,
      localTime: localTimeStr,
      timeOfDay: timeOfDay,
      precipType: precipType,
      isCloudy: isCloudy,
      isExtremeHeat: isExtremeHeat,
      isExtremeCold: isExtremeCold,
      isAurora: isAurora,
      tempC: tempC,
      feelsLikeC: Math.round(data.current.feelslike_c),
      condition: conditionText,
      icon: `https:${data.current.condition.icon}`,
      humidity: data.current.humidity,
      windKph: data.current.wind_kph,
      uv: data.current.uv,
      pressureMb: data.current.pressure_mb,
    };

    res.render('index', { weather, error: null });
  } catch (error) {
    let errorMessage = 'Unable to fetch weather data.';
    if (error.response && error.response.status === 400) {
      errorMessage = 'City not found. Please check spelling.';
    } else if (error.response && error.response.status === 403) {
      errorMessage = 'Invalid API key in .env file.';
    }
    res.render('index', { weather: null, error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
