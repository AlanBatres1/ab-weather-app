import React from 'react';
import { Card } from './ui/card';

const FiveDayForecastComponent = ({ forecast }: { forecast: any[] }) => {
  const getWeatherIcon = (weatherMain: string) => {
    // Not sure why some images dont work
    switch (weatherMain) {
      case "Clouds": 
      return "/Clouds.svg";

      case "Clear":
         return "/Clear.svg";

      case "Rain": 
      return "/Rain.svg";

      case "Thunderstorm": 
      return "/Thunderstorm.svg";

      case "Snow": 
      return "/Snow.svg";

      case "Mist": case "Fog": case "Haze": 
      return "/Mist.svg";

      default: return "";
    }
  };

  return (
    <Card className="text-white w-[370px] md:w-[700px] bg-gradient-to-b from-[#011B3F] to-[#7694A7] gap-[22px] border-none p-8 space-y-6">
      {forecast.map((day, index) => (
        <div key={index}>
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">{day.date}</p>
            <img className="w-[49px] h-[44px]" src={getWeatherIcon(day.icon)} alt="Weather Icon" />
            <p className="font-semibold text-2xl">H: {day.highTemp}°</p>
            <p className="font-semibold text-2xl text-[#CCCCCC]">L: {day.lowTemp}°</p>
          </div>
          {index < forecast.length - 1 && <hr />}
        </div>
      ))}
    </Card>
  );
};

export default FiveDayForecastComponent;
