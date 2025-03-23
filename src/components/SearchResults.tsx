import React from 'react';
import Image from 'next/image';

interface Place {
  title?: string;
  name?: string;
  address?: string;
  phone?: string;
  phone_number?: string;
  rating?: number;
  reviews?: number;
  type?: string;
  open_state?: string;
  hours?: string;
  website?: string;
  thumbnail?: string;
  photos?: string[];
  gps_coordinates?: {
    latitude: number;
    longitude: number;
  };
  directions?: string;
}

interface SearchResultsProps {
  results: any;
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-black">Loading results...</p>
        </div>
      </div>
    );
  }

  console.log("Results in component:", results);

  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[200px] flex items-center justify-center">
        <p className="text-black text-center">
          Search for nearby medical facilities to see results.
        </p>
      </div>
    );
  }

  // Check for different possible structures in the API response
  const places = results.local_results || results.places || [];
  
  if (places.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[200px] flex items-center justify-center">
        <p className="text-black text-center">
          No results found. Try another search.
        </p>
      </div>
    );
  }

  // Helper function to ensure image URLs have proper protocol
  const ensureAbsoluteUrl = (url: string | undefined): string => {
    if (!url) return '';
    
    // If the URL starts with '//', add https: to make it absolute
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    return url;
  };

  // Get the search location from the results for map reference
  let searchQuery = '';
  let searchLocation = '';
  
  if (results.search_parameters) {
    searchQuery = results.search_parameters.q || '';
    if (results.search_parameters.ll) {
      // Format: @lat,lon,zoom
      const locationMatch = results.search_parameters.ll.match(/@([\d.-]+),([\d.-]+)/);
      if (locationMatch) {
        searchLocation = `${locationMatch[1]},${locationMatch[2]}`;
      }
    }
  }

  return (
    <div className="space-y-6">
      {searchLocation && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-black mb-4">Location</h2>
          <div className="flex justify-between items-center">
            <p className="text-black">Showing results for "<span className="font-medium">{searchQuery}</span>" near this location</p>
            <a 
              href={`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}/@${searchLocation},14z`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-black mb-4">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {places.map((place: Place, index: number) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-black">{place.title || place.name}</h3>
              
              {place.thumbnail && (
                <div className="my-2">
                  <Image 
                    src={ensureAbsoluteUrl(place.thumbnail)} 
                    alt={place.title || place.name || 'Medical facility'} 
                    width={120} 
                    height={80} 
                    className="rounded-md"
                  />
                </div>
              )}
              
              <div className="space-y-1 text-sm">
                {place.address && (
                  <p className="text-black">
                    <span className="font-medium">Address:</span> {place.address}
                  </p>
                )}
                
                {(place.phone_number || place.phone) && (
                  <p className="text-black">
                    <span className="font-medium">Phone:</span> {place.phone_number || place.phone}
                  </p>
                )}
                
                {place.open_state && (
                  <p className={`${place.open_state.includes('Open') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {place.open_state}
                  </p>
                )}
                
                {place.rating && (
                  <p className="text-black">
                    <span className="font-medium">Rating:</span> {place.rating}/5 
                    {place.reviews && <span> ({place.reviews} reviews)</span>}
                  </p>
                )}
                
                {place.type && (
                  <p className="text-black">
                    <span className="font-medium">Type:</span> {place.type}
                  </p>
                )}
              </div>
              
              <div className="mt-3 space-x-2 flex flex-wrap">
                {place.website && (
                  <a 
                    href={place.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 hover:underline text-sm mb-2"
                  >
                    Visit Website
                  </a>
                )}
                
                {(place.gps_coordinates || place.directions) && (
                  <a 
                    href={place.directions || 
                      (place.gps_coordinates ? 
                        `https://www.google.com/maps/search/?api=1&query=${place.gps_coordinates.latitude},${place.gps_coordinates.longitude}` : 
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title || place.name || '')}`)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 hover:underline text-sm mb-2"
                  >
                    View on Maps
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
