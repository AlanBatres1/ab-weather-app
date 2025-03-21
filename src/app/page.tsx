"use client";
import { getCurrentWeather, get5DayForecast } from "@/lib/service";
import { useState, useEffect } from "react";
import CurrentWeatherComponent from "@/components/CurrentWeatherComponent";
import FiveDayForecastComponent from "@/components/FiveDayForecastComponent";
import HeaderSearchComponent from "@/components/HeaderSearchComponent";

export default function Home() {
  const [city, setCity] = useState('Stockton');
  const [currentWeather, setCurrentWeather] = useState<any>({});
  const [forecast, setForecast] = useState<any[]>([]);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await get5DayForecast(city);

      if (weatherData && forecastData?.list) {
        setCurrentWeather(weatherData);

        const dailyForecast = forecastData.list
          .filter((item: any) => item.dt_txt && typeof item.dt_txt === "string" && item.dt_txt.includes("12:00:00"))
          .map((item: any) => ({
            date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
            icon: item.weather[0].main,
            highTemp: Math.round(item.main.temp_max),
            lowTemp: Math.round(item.main.temp_min)
          }));
        setForecast(dailyForecast);
      }
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setFavoriteCities(storedFavorites);
  }, []);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const handleFavoriteToggle = (city: string) => {
    const updatedFavorites = favoriteCities.includes(city)
      ? favoriteCities.filter((fav) => fav !== city)
      : [...favoriteCities, city];

    setFavoriteCities(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-[url('/Bgweather1.png')] text-white font-[Kanit] flex flex-col justify-center items-center bg-cover bg-center p-8">
      <HeaderSearchComponent onSearch={handleSearch} />

      <div className="flex flex-col xl:flex-row justify-center items-center w-full max-w-6xl gap-12">
        {currentWeather?.main && (
          <div className="flex flex-col items-center text-center space-y-6">
            <p className="text-4xl font-bold">Current Weather</p>
            <CurrentWeatherComponent
              city={city}
              temperature={Math.round(currentWeather.main.temp)}
              description={currentWeather.weather[0].description}
              highTemp={Math.round(currentWeather.main.temp_max)}
              lowTemp={Math.round(currentWeather.main.temp_min)}
              iconUrl={`/${currentWeather.weather[0].main}.svg`}
              favoriteCities={favoriteCities}              
              onFavoriteToggle={handleFavoriteToggle}       
            />
          </div>
        )}

        {forecast.length > 0 && (
          <div className="flex flex-col items-center text-center space-y-6">
            <p className="text-4xl font-bold">5 Day Forecast</p>
            <FiveDayForecastComponent forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}
