import React, { useState } from 'react';

const Navbar = ({ currentTheme, setCurrentTheme, themes }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setShowDropdown(false);
  };

  return (
    <nav className={`bg-${themes[currentTheme].bg}-500 shadow-lg rounded-b-xl p-4 flex justify-between items-center transition-colors duration-500`}>
      <div className="text-white text-xl font-bold tracking-wide ml-20">PokéTasK</div>

      <ul className="flex gap-6 text-white text-sm font-medium mr-20 items-center">
        <li className="hover:text-gray-300 cursor-pointer">Home</li>
        <li className="hover:text-gray-300 cursor-pointer">Your Task</li>
        <li className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110"
          >
            <img
              src={themes[currentTheme].icon}
              alt="theme icon"
              className="w-full h-full object-cover"
            />
          </button>

          {showDropdown && (
            <ul className="absolute -right-12 mt-2.5 bg-white filter saturate-90 text-black rounded-xl shadow-lg text-sm w-36 z-20 flex flex-col">
              {Object.entries(themes).map(([key, theme]) => (
                <li
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className="pl-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <img src={theme.icon} alt={`${key} icon`} width="40" />
                  <span className="ml-2 font-bold capitalize">{key}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
