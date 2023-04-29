require('dotenv').config({path: './process.env' })
const jwt = require('jsonwebtoken')
const logger = require('./logger');
const { default: axios } = require('axios');
const { getWeatherIcon } = require('./helper');
const OPENWEATHERAPI = process.env.OPEN_WEATHER_API;

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'Email already registered'})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const ownerExtractor = (request, response, next) => {
  request.owner = jwt.verify(request.token, process.env.SECRET)
  next()
}

const getWeatherData = async (request, response, next) => {
  const { lat, lon } = request.body;

  try {
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPENWEATHERAPI}`);
    const weatherData = weatherResponse.data;

    const weather = {
      location: weatherData.name,
      description: weatherData.weather[0].main,
      iconPath: getWeatherIcon(weatherData.weather[0].id, weatherData.dt, weatherData.sys.sunrise, weatherData.sys.sunset),
      temp: Math.round(weatherData.main.temp),
      temp_feels_like: Math.round(weatherData.main.feels_like),
      humidity: Math.round(weatherData.main.humidity),
      wind_speed: Math.round(weatherData.wind.speed)
    }

    request.weather = weather;
    next()
  } catch {
    console.log("Error fetching weather data.");
    request.weather = {};
    next()
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  ownerExtractor,
  getWeatherData
}