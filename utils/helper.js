const getWeatherIcon = (id, timestamp, sunrise, sunset) => {
    let timeOfDay;
    const clear = "Clear";
    const thunderstorm = "Thunderstorm";
    const cloudy = "Cloudy";
    const overcast = "Overcast";
    const rain = "Rain";
    const drizzle = "Drizzle";
    const snow = "Snow";
    const sleet = "Sleet";
    const hail = "Hail";
    const mist = "Mist";
    const fog = "Fog";
    const dust = "Dust";
    const smoke = "Smoke";
    const wind = "Wind";
    const tornado = "Tornado";
    const haze = "Haze";

    if (timestamp >= sunrise && timestamp < sunset) {
        timeOfDay = "Day";
    } else {
        timeOfDay = "Night";
    }

    switch(id) {
        case 200:
        case 230:
        case 231:
        case 232:
            return timeOfDay + thunderstorm + rain;
        case 201:
        case 202:
            return thunderstorm + rain;
        case 210:
            return timeOfDay + thunderstorm;
        case 211:
        case 212:
        case 221:
            return thunderstorm;
        case 300:
            return timeOfDay + drizzle;
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return drizzle;
        case 500:
            return timeOfDay + rain;
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
          return rain;
        case 600:
          return timeOfDay + snow;
        case 601:
        case 602:
          return snow;
        case 611:
        case 616:
        case 621:
        case 622:
          return sleet;
        case 612:
          return timeOfDay + hail;
        case 613:
          return hail;
        case 615:
        case 620:
          return timeOfDay + sleet;
        case 701:
          return mist;
        case 711:
          return smoke;
        case 721:
          return haze;
        case 731:
          return dust + wind;
        case 741:
          return fog;
        case 751:
        case 761:
        case 762:
          return dust;
        case 771:
          return wind;
        case 781:
          return tornado;
        case 800:
        default:
          return timeOfDay + clear;
        case 801:
          return timeOfDay + cloudy;
        case 802:
          return cloudy;
        case 803:
          return timeOfDay + overcast;
        case 804:
          return overcast;
      }
}

module.exports = {
  getWeatherIcon
}