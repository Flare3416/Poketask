import { useState } from 'react';
import Navbar from "./components/Navbar";

const themes = {
  fire: { bg: 'red', icon: '/theme-1profile.png', bgimg: '/background-1.jpg' },
  water: { bg: 'blue', icon: '/theme-2profile.png', bgimg: '/background-2.jpg' },
  grass: { bg: 'green', icon: '/theme-3profile.png', bgimg: '/background-3.jpg' },
  electric: { bg: 'yellow', icon: '/theme-4profile.png', bgimg: '/background-4.jpg' },
};

function App() {
  const [currentTheme, setCurrentTheme] = useState('fire');

  const handleEdit = ()=>{

  }

  const handleDelete = ()=>{

  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-cover bg-center " style={{ backgroundImage: `url(${themes[currentTheme].bgimg})`, backgroundPosition: 'center 80%' }}>
      <Navbar
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        themes={themes}
      />

      <div className="  flex justify-center items-center">
        <div className="w-[40vw] h-[80vh] mt-10 border rounded-2xl flex justify-center items-center bg-center">
          <div className={`bg-${themes[currentTheme].bg}-100 p-6 rounded-2xl shadow-xl w-full h-full overflow-auto`}>

            <h2 className="text-4xl font-extrabold mb-6 flex items-center gap-3">
              <span className="text-yellow-400 drop-shadow-lg animate-slow-bounce">⚡</span>
              <span className="uppercase tracking-wider animate-gradient bg-gradient-to-r from-red-500 via-yellow-400 via-blue-500 via-green-500 to-purple-500 text-transparent bg-clip-text font-mono py-1 px-3 rounded-lg border-2 border-opacity-20 border-white shadow-lg">
                Quest Log
              </span>
            </h2>
            <div className="flex mb-6 rounded-full overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200">
              <input
                className="flex-1 px-4 py-3 outline-none bg-gray-100 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-300"
                placeholder="Gotta catch 'em all... add your task here!"
                aria-label="Add a new Pokemon task"
                type="text"
              />
              <button
                className={`bg-${themes[currentTheme].bg}-500 px-6 text-white font-semibold text-sm hover:bg-${themes[currentTheme].bg}-600 transition-colors duration-200 flex items-center justify-center`}
                aria-label="Add task"
              >
                <span>Add</span>

              </button>
            </div>
            <ul class="space-y-3 text-sm">
              {/* Completed Task */}
              <li class="flex items-center justify-between group px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div class="flex items-center gap-3">
                  <span class={`w-5 h-5 rounded-full bg-${themes[currentTheme].bg}-500 text-white text-xs flex items-center justify-center`}>
                    ✓
                  </span>
                  <span class="line-through text-gray-500">
                    I can't believe I'm doing this
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="p-1 text-gray-400 hover:text-blue-500 transition-colors" onClick={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="p-1 text-gray-400 hover:text-red-500 transition-colors" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>

              {/* Active Task */}
              <li class="flex items-center justify-between group px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div class="flex items-center gap-3">
                  <span
                    class="w-5 h-5 border-2 border-gray-500 rounded-full inline-block transition-colors group-hover:border-current"
                    style={{ borderColor: themes[currentTheme].bgHex }}
                  ></span>
                  <span class="text-gray-800">How you make all of this so easy</span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="p-1 text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>

    </div >


  );
}

export default App;