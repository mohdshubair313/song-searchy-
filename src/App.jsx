import React, { useState } from 'react';
import SearchBar from './components/searchBar';
import SongList from './components/songList';
import { searchSongs } from './spotify';
import './style.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = async (query) => {
    const results = await searchSongs(query);
    setSongs(results);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <header className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-4">Song Search</h1>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      </header>
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} />
    </div>
  );
}

export default App;
