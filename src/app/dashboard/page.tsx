'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MapSearch from '@/components/MapSearch';
import SearchResults from '@/components/SearchResults';

export default function Dashboard() {
  const [searchResults, setSearchResults] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const handleSearch = async (query: string, lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      console.log(`Searching for ${query} at location: ${lat}, ${lon}`);
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search results received:', data);
      setSearchResults(data);
    } catch (err: Error | unknown) {
      console.error('Error searching:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while searching. Please try again.';
      setError(errorMessage);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grey-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image 
                src="/rescue-flow-logo.svg" 
                alt="RescueFlow Logo" 
                width={150} 
                height={30} 
                className="h-8 w-auto cursor-pointer"
              />
            </Link>
          </div>
          
          <h1 className="text-xl text-black font-bold">Dashboard</h1>
          
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Search Form */}
          <div className="md:col-span-1">
            <MapSearch onSearch={handleSearch} isLoading={isLoading} />
            
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold text-black mb-4">Emergency Resources</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-black">For emergencies, call <strong>911</strong> immediately</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-black">Poison Control: <strong>1-800-222-1222</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-black">Find Emergency Shelters: <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Shelter Database</a></span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column - Results */}
          <div className="md:col-span-2">
            {!searchPerformed && !error && (
              <div className="bg-white p-6 rounded-lg shadow-md min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-black mb-2">Use the search panel to find emergency medical services near you.</p>
                  <p className="text-black text-sm">Search for hospitals, clinics, pharmacies, and more.</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-black">Error</h3>
                    <p className="text-sm text-black mt-1">{error}</p>
                    <p className="text-xs text-black mt-2">
                      Please check that the backend server is running at http://localhost:8000
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {(searchPerformed || isLoading) && (
              <SearchResults 
                results={searchResults} 
                loading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
