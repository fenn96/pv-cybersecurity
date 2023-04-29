const solarRouter = require('express').Router()
const { tokenExtractor, ownerExtractor, getWeatherData } = require('../utils/middleware')
const Solar = require('../models/solar');
const { default: axios } = require('axios');
const OPENWEATHERAPI = process.env.OPEN_WEATHER_API;
const iconURL = "../img/";

// GET METHOD for getting solar data and sorting by date added
solarRouter.get('/', tokenExtractor, ownerExtractor, (request, response) => {
  const ownerId = request.owner.id;

  Solar.findOne({ ownerId: ownerId }, (err, solar) => {
    if (err) {
      return response.status(500).json({ error: "Error finding solar data" });
    }
    if (!solar) {
      return response.status(404).json({ error: "Solar data not found" });
    }

    let sortedSolarData = solar.solarData.sort((a, b) => a.time - b.time);
    return response.status(200).json({ authenticated: true, solarData: sortedSolarData });
  });
});

solarRouter.put('/weather', tokenExtractor, ownerExtractor, getWeatherData, async (request, response) => {
  const ownerId = request.owner.id;
  const weather = request.weather;

  try {
    Solar.findOneAndUpdate(
      { ownerId: ownerId },
      { $set: { 
        weather: weather
      }},
      (err, solar) => {
        if (err) {
            return response.status(500).json({ error: "Error updating weather data" });
        }
        return response.status(200).json(weather);
      }
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})

solarRouter.put('/geo/:ownerId', async (request, response) => {
  const { lat, lon } = request.body;
  const ownerId = request.params.ownerId;

  try {
    Solar.findOneAndUpdate(
      { ownerId: ownerId },
      { $set: { geo: {lat: lat, lon: lon }} },
      (err, solar) => {
        if (err) {
            return response.status(500).json({ error: "Error updating geolocation data" });
        }
        return response.status(200).json({ solar });
      }
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})

// PUT METHOD for filling solarData for an associated owner
solarRouter.put('/:ownerId', (request, response) => {
    const ownerId = request.params.ownerId;

    let solarData = {
      voltage: request.body.voltage,
      current: request.body.current,
      power: request.body.power,
      time: Date.now()
    };

    Solar.findOneAndUpdate(
      { ownerId: ownerId },
      { $push: { solarData: solarData } },
      (err, solar) => {
        if (err) {
            return response.status(500).json({ error: "Error updating solar data" });
        }
        return response.status(200).json({ solar });
      }
    );
});

// PUT METHOD for clearing solarData for an associated owner
solarRouter.put('/delete/:ownerId', (request, response) => {
    const ownerId = request.params.ownerId;
    let solarData = [];

    Solar.findOneAndUpdate(
      { ownerId: ownerId },
      { $set: { solarData: solarData } },
      { new: true },
      (err, solar) => {
        if (err) {
            return response.status(500).json({ error: "Error updating solar data" });
        }
        return response.status(200).json({ solar });
      }
    );
});

module.exports = solarRouter;