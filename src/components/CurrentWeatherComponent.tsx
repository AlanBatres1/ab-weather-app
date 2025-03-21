import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';

interface WeatherProps {
  city: string;
  temperature: number;
  description: string;
  highTemp: number;
  lowTemp: number;
  iconUrl: string;
  favoriteCities: string[]; 
  onFavoriteToggle: (city: string) => void; 
}

const CurrentWeatherComponent = ({ city, temperature, description, highTemp, lowTemp, iconUrl, favoriteCities, onFavoriteToggle }: WeatherProps) => {
  const isFavorite = favoriteCities.includes(city);

  const handleToggleFavorite = () => {
    onFavoriteToggle(city); 
  };

  return (
    <Card className="flex flex-col justify-center items-center text-white w-[370px] md:w-[500px] h-[480px] bg-gradient-to-b from-[#011B3F] to-[#7694A7] border-none p-8 space-y-6 gap-5 relative">
      <p className="text-4xl font-bold">{city}</p>
      <img className="w-[164px] h-[108px]" src={iconUrl} alt="Weather Icon" />
      <p className="text-5xl font-bold">{temperature}℉</p>
      <p className="text-2xl font-bold">{description}</p>
      <div className="flex gap-5">
        <p className="text-2xl font-semibold">H: {highTemp}°</p>
        <p className="text-2xl font-semibold text-[#CCCCCC]">L: {lowTemp}°</p>
      </div>

      {/* Heart icon */}
      <img className="absolute top-5 right-5 w-8 h-8 cursor-pointer" src={isFavorite ? "/heartToggle.svg" : "/heart.svg"} alt="toggle" onClick={handleToggleFavorite}/>
    </Card>
  );
};

export default CurrentWeatherComponent;
