'use client';

import { useState, useEffect } from 'react';

interface MapSearchProps {
  onSearch: (query: string, lat: number, lon: number) => void;
  isLoading: boolean;
}

const MapSearch = ({ onSearch, isLoading }: MapSearchProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.0060 }); // Default to NYC
  const [locationFetched, setLocationFetched] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(true);

  // Only run geolocation in browser context after component mounts
  useEffect(() => {
    let isMounted = true;

    const getLocation = () => {
      setIsLocating(true);
      if (!navigator?.geolocation) {
        setLocationError('Geolocation is not supported by your browser. Using default location.');
        setLocationFetched(true);
        setIsLocating(false);
        return;
      }

      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (isMounted) {
              console.log('Location obtained:', position.coords);
              setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
              });
              setLocationFetched(true);
              setLocationError(null);
              setIsLocating(false);
            }
          },
          (error) => {
            if (isMounted) {
              console.error('Error getting location:', error);
              let errorMessage = 'Error getting your location. Using default location.';
              
              // More descriptive error messages
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  errorMessage = 'Location access was denied. Using default location.';
                  break;
                case error.POSITION_UNAVAILABLE:
                  errorMessage = 'Location information is unavailable. Using default location.';
                  break;
                case error.TIMEOUT:
                  errorMessage = 'The request to get location timed out. Using default location.';
                  break;
              }
              
              setLocationError(errorMessage);
              setLocationFetched(true);
              setIsLocating(false);
            }
          },
          { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0 
          }
        );
      } catch (err) {
        if (isMounted) {
          console.error('Geolocation error:', err);
          setLocationError('Failed to get location. Using default location.');
          setLocationFetched(true);
          setIsLocating(false);
        }
      }
    };

    // Small delay to prevent hydration issues
    const timeoutId = setTimeout(() => {
      getLocation();
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && locationFetched) {
      onSearch(query.trim(), location.lat, location.lon);
    }
  };

  const commonSearchTerms = [
    'hospitals',
    'emergency rooms',
    'clinics',
    'pharmacies',
    'doctors'
  ];

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    if (locationFetched) {
      onSearch(term, location.lat, location.lon);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold text-black mb-4">Search Medical Services</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">
            Search for:
          </label>
          <input
            id="search-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="hospitals, clinics, medical centers"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="flex items-start gap-1 flex-wrap">
          <span className="text-xs mt-1 text-gray-500">Quick search:</span>
          {commonSearchTerms.map(term => (
            <button
              key={term}
              type="button"
              onClick={() => handleQuickSearch(term)}
              disabled={!locationFetched || isLoading}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition"
            >
              {term}
            </button>
          ))}
        </div>
        
        <div className="flex items-start space-x-2 text-sm">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <span className="block text-gray-600">Location:</span>
            {isLocating ? (
              <span className="block italic text-gray-500">Fetching your location...</span>
            ) : (
              <span className="block font-medium text-gray-800">
                {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
              </span>
            )}
            {locationError && (
              <p className="text-xs text-amber-600 mt-1">{locationError}</p>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!locationFetched || isLoading || !query.trim()}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition
            ${(!locationFetched || isLoading || !query.trim()) 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default MapSearch;
