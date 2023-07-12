require('dotenv').config()
const express = require('express');
const fetch = require("node-fetch");
const cors = require('cors')

const app = express();
app.use(cors())
const baseUrl = 'https://api.weatherapi.com/v1'
const key = process.env.KEY
// Middleware
app.use(express.json());

// Routes
app.post('/getWeather', async (req, res) => {
  const cities = req.body.cities
  if(!req.body.cities)
    res.status(400).json("Missing Parameter cities")
  console.log(cities)
  const citiesWithWeather = {}
  for (const city of cities)
  {
    console.log(city)
    try
    {
        const response = await fetch(`${baseUrl}?key=${key}}&q=${city}`)
        const temp = await response.json();
        if (response.code === '200')
            citiesWithWeather[city] = `${temp.current.temp_c} C`
        else 
            citiesWithWeather[city] = temp.error.message

    }
    catch(error)
    {
        citiesWithWeather[city]=error.message
    }
    
  }
  res.status(200).json(citiesWithWeather)

});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});