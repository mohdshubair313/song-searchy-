import React from 'react';

function Header({ toggleDarkMode, darkMode }) {
  return (
    <header className="flex justify-between items-center py-4 bg-teal-500">
      <h1 className="text-2xl font-bold text-white">Song Search App</h1>
      <button
        className="bg-gray-800 text-white py-2 px-4 rounded"
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

export default Header;
