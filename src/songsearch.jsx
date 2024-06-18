import React, { useState } from 'react';

function SongSearch() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log(`Searching for ${query}`);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        className="border border-gray-300 rounded py-2 px-4 w-full"
        placeholder="Search for a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-teal-600 text-white py-2 px-4 rounded mt-2 hover:bg-teal-700"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SongSearch;
