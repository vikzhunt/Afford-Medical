import React, { useState } from 'react';
import { CloudSun } from 'lucide-react';
import Searchbar from './Searchbar';
import Card from './Card';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);


  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch("http://localhost:8080/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ location: city })
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch weather");
      }
  
      const data = await res.json();
      const current = data.current;
      const forecastList = data.forecast.list.slice(0, 5); 
  
      const formattedWeather = {
        city: current.name,
        country: current.sys.country,
        temperature: current.main.temp,
        feelsLike: current.main.feels_like,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        condition: current.weather[0].main,
        description: current.weather[0].description,
      };
  
      const formattedForecast = forecastList.map((item) => ({
        time: item.dt_txt,
        temp: item.main.temp,
        condition: item.weather[0].main,
        description: item.weather[0].description,
      }));
  
      setWeather(formattedWeather);
      setForecast(formattedForecast);
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather. Please try again.");
    }
  
    setLoading(false);
  };
  
  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center py-12 px-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="flex items-center gap-3">
          <CloudSun className="w-10 h-10 text-white" />
          <h1 className="text-3xl font-bold text-white">Weather Dashboard</h1>
        </div>

        <Searchbar onSearch={fetchWeather} isLoading={loading} />

        {loading && (
          <div className="text-white">Loading weather data...</div>
        )}

        {error && (
          <div className="w-full max-w-md bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-lg p-4">
            <p className="text-red-200 text-center">{error}</p>
          </div>
        )}

        {weather && !loading && !error && (
          <Card data={weather} />
        )}
        {forecast && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-full max-w-md mt-4">
            <h2 className="text-xl font-semibold text-white mb-2 text-center">Forecast</h2>
            <ul className="space-y-2">
            {forecast.map((item, index) => (
                <li key={index} className="flex justify-between text-white text-sm border-b border-white/10 pb-1">
                <span>{new Date(item.time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                <span>{item.temp}°C</span>
                <span>{item.condition}</span>
                </li>
            ))}
            </ul>
        </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;