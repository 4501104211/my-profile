"use client";

import { useState, useEffect } from 'react';

export default function CurrentTime() {
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('Show My Location');
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const getLocation = () => {
    if (permissionDenied) {
      setLocation('Please enable location in browser settings');
      return;
    }

    setLoading(true);

    if (!navigator.geolocation) {
      setLocation('Geolocation is not supported');
      setLoading(false);
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      try {
        const lat = position.coords.latitude.toFixed(2);
        const long = position.coords.longitude.toFixed(2);
        setLocation(`Lat: ${lat}, Long: ${long}`);
        setPermissionDenied(false);
      } catch (error) {
        console.error('Error formatting location:', error);
        setLocation('Error formatting location');
      } finally {
        setLoading(false);
      }
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error('Geolocation error:', error);
      
      switch (error.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          setPermissionDenied(true);
          setLocation('Please allow location access in settings');
          break;
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          setLocation('Location unavailable');
          break;
        case GeolocationPositionError.TIMEOUT:
          setLocation('Location request timed out');
          break;
        default:
          setLocation('Error getting location');
      }
      setLoading(false);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    try {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } catch (error) {
      console.error('Geolocation request error:', error);
      setLocation('Error requesting location');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-500 text-sm mb-1">Current Time</p>
        <p className="text-3xl font-mono">{time}</p>
        <button 
          onClick={getLocation}
          disabled={loading}
          className={`text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 mt-1 disabled:opacity-50 ${permissionDenied ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <span className={`w-3 h-3 rounded-full ${permissionDenied ? 'bg-red-400' : 'bg-green-400'} ${loading ? 'animate-pulse' : ''}`} />
          {loading ? 'Getting location...' : location}
        </button>
        {permissionDenied && (
          <p className="text-xs text-red-400 mt-1">
            Location access denied. Please check your browser settings.
          </p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">
          When I don&apos;t have anything to do, I just create random thing like below:
        </p>
        <div className="flex gap-3">
          <span className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-gray-800/70 transition-colors cursor-pointer">🎮</span>
          <span className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-gray-800/70 transition-colors cursor-pointer">🎨</span>
          <span className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-gray-800/70 transition-colors cursor-pointer">📚</span>
          <span className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-gray-800/70 transition-colors cursor-pointer">🎵</span>
          <span className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-gray-800/70 transition-colors cursor-pointer">⚡</span>
        </div>
      </div>
    </div>
  );
} 