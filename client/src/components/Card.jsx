import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';

const Card = ({ data }) => {
  const getWeatherIcon = (condition) => {
    const code = condition?.toLowerCase() || '';
    if (code.includes('clear')) return <Sun className="w-16 h-16 text-yellow-400" />;
    if (code.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />;
    if (code.includes('snow')) return <CloudSnow className="w-16 h-16 text-blue-200" />;
    if (code.includes('thunder')) return <CloudLightning className="w-16 h-16 text-yellow-500" />;
    return <Cloud className="w-16 h-16 text-gray-400" />;
  };

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-1">{data.city}</h2>
          <p className="text-white/70">{data.country}</p>
        </div>
        
        <div className="flex items-center justify-center">
          {getWeatherIcon(data.condition)}
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold text-white mb-2">
            {Math.round(data.temperature)}°C
          </p>
          <p className="text-xl text-white/70 capitalize">{data.condition}</p>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full mt-4">
          <div className="flex flex-col items-center">
            <Thermometer className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-sm text-white/70">Feels like</p>
            <p className="text-lg font-semibold text-white">{Math.round(data.feelsLike)}°C</p>
          </div>
          <div className="flex flex-col items-center">
            <Droplets className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-sm text-white/70">Humidity</p>
            <p className="text-lg font-semibold text-white">{data.humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-sm text-white/70">Wind</p>
            <p className="text-lg font-semibold text-white">{data.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;