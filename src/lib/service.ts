import { APIKEY } from "./environment";

const getCurrentWeather = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${APIKEY}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const get5DayForecast = async (city: string) =>{
  const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=${APIKEY}`
  );
    const data = await response.json();
    return data;
  }

export { getCurrentWeather, get5DayForecast };
