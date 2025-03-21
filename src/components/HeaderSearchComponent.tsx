import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';

interface SearchProps {
  onSearch: (city: string) => void;
}
const HeaderSearchComponent = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState('');
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setFavoriteCities(storedFavorites);
  }, []);

  const updateFavorites = (cities: string[]) => {
    localStorage.setItem('favoriteCities', JSON.stringify(cities));
    setFavoriteCities(cities);
  };

  const handleSearch = () => {
    if (search.trim()) {
      onSearch(search); 
      setSearch('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFavoriteClick = (city: string) => {
    onSearch(city);
    setSidebarOpen(false); 
  };

  // Remove
  const handleDeleteFavorite = (city: string) => {
    const updatedFavorites = favoriteCities.filter((fav) => fav !== city);
    updateFavorites(updatedFavorites); 
  };

  return (
    <div className="flex flex-row items-center justify-center w-full max-w-4xl gap-4 mb-6 relative">
      {/* Search Bar */}
      <div className="relative w-full md:w-[600px]">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} className="w-full p-4 pl-12 rounded-md bg-[#011B3F] text-white placeholder-white focus:outline-none" placeholder="Search For a city"/>
        <img onClick={handleSearch} className="absolute left-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] cursor-pointer" src="/search-icon.png" alt="Search Icon"/>
      </div>
      
      <img onClick={toggleSidebar} className="w-[49px] h-[24px] cursor-pointer" src="/Group3.png" alt="Sidebar Icon"/>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 w-72 h-full bg-[#011B3F] text-white p-6 z-[9999] shadow-lg">
          <div className="flex flex-col items-start">
            <p className="text-2xl font-bold mb-6">Favorites</p>

            {/* favorite cities */}
            <ul className="space-y-4">
              {favoriteCities.map((city) => (
                <li key={city} className="flex justify-between items-center gap-10 w-full p-3 rounded-md bg-[#023e8a] shadow-md">
                  <span className="cursor-pointer text-lg hover:text-gray-300 transition" onClick={() => handleFavoriteClick(city)}>
                    {city}
                  </span>
                  <button onClick={() => handleDeleteFavorite(city)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white text-xl cursor-pointer">
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSearchComponent;
