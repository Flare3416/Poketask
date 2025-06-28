import React, { useState } from 'react';

const Navbar = ({ currentTheme, setCurrentTheme, themes }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setShowDropdown(false);
  };

  return (
    <nav className={`${themes[currentTheme].buttonClass} shadow-lg rounded-b-xl p-2 md:p-4 flex justify-between items-center transition-colors duration-500`}>
      {/* Logo/Title - responsive sizing and margins */}
      <div className="text-white text-lg sm:text-xl font-bold tracking-wide ml-4 sm:ml-10 md:ml-20">
        PokéTasK
      </div>

      {/* Navigation Links - responsive gap, text size and margins */}
      <ul className="flex gap-2 sm:gap-4 md:gap-6 text-white text-xs sm:text-sm font-medium mr-4 sm:mr-10 md:mr-20 items-center">
        <li className="hover:text-gray-300 cursor-pointer hidden sm:block">Home</li>
        <li className="hover:text-gray-300 cursor-pointer hidden sm:block">Your Task</li>
        
        {/* Theme Selector - responsive sizing */}
        <li className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110"
          >
            <img
              src={themes[currentTheme].icon}
              alt="theme icon"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown - responsive positioning and sizing */}
          {showDropdown && (
            <ul className="absolute right-0 sm:-right-12 mt-2 bg-white filter saturate-90 text-black rounded-lg md:rounded-xl shadow-lg text-xs sm:text-sm w-28 sm:w-36 z-20 flex flex-col">
              {Object.entries(themes).map(([key, theme]) => (
                <li
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className="pl-1 sm:pl-2 py-1 sm:py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <img 
                    src={theme.icon} 
                    alt={`${key} icon`} 
                    width="30" 
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <span className="ml-1 sm:ml-2 font-bold capitalize text-xs sm:text-sm">
                    {key}
                  </span>
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