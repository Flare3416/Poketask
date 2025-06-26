import { useState } from 'react';
import Navbar from "./components/Navbar";

const themes = {
  fire: { bg: 'bg-red-100', color: 'bg-red-500', icon: '/theme-1profile.png' },
  water: { bg: 'bg-blue-100', color: 'bg-blue-500', icon: '/theme-2profile.png' },
  grass: { bg: 'bg-green-100', color: 'bg-green-500', icon: '/theme-3profile.png' },
  electric: { bg: 'bg-yellow-100', color: 'bg-yellow-400', icon: '/theme-4profile.png' },
};

function App() {
  const [currentTheme, setCurrentTheme] = useState('fire');

  return (
    <div className={`${themes[currentTheme].bg} min-h-screen transition-colors duration-500`}>
      <Navbar
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        themes={themes}
      />
    </div>
  );
}

export default App;