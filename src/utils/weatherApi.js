import { request } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return request(url);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  console.log("Weather Condition from API:", result.condition);

  return result;
};

export const isDay = ({ sunrise, sunset }, now = Date.now()) => {
  return now > sunrise * 1000 && now < sunset * 1000;
};

export const getWeatherType = (temperature) => {
  return temperature <= 65 ? "cold" : temperature <= 85 ? "warm" : "hot";
};
