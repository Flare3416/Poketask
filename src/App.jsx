import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Navbar from "./components/Navbar"

const themes = {
  fire: {
    bg: 'red',
    icon: '/theme-1profile.png',
    bgimg: '/background-1.jpg',
    bgClass: 'bg-red-100',
    buttonClass: 'bg-red-500',
    buttonHoverClass: 'hover:bg-red-600',
    scrollbarColor: '#ef4444'
  },
  water: {
    bg: 'blue',
    icon: '/theme-2profile.png',
    bgimg: '/background-2.jpg',
    bgClass: 'bg-blue-100',
    buttonClass: 'bg-blue-500',
    buttonHoverClass: 'hover:bg-blue-600',
    scrollbarColor: '#3b82f6'
  },
  grass: {
    bg: 'green',
    icon: '/theme-3profile.png',
    bgimg: '/background-3.jpg',
    bgClass: 'bg-green-100',
    buttonClass: 'bg-green-500',
    buttonHoverClass: 'hover:bg-green-600',
    scrollbarColor: '#10b981'
  },
  electric: {
    bg: 'yellow',
    icon: '/theme-4profile.png',
    bgimg: '/background-4.jpg',
    bgClass: 'bg-yellow-100',
    buttonClass: 'bg-yellow-500',
    buttonHoverClass: 'hover:bg-yellow-600',
    scrollbarColor: '#eab308'
  },
}

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : 'fire';
  });
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {

    let todosString = localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(todosString)
      setTodos(todos)
    }
    

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, [])

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const handleToggle = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    )
    setTodos(updatedTodos)
    saveToLS(updatedTodos)
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id)
    if (todoToEdit) {
      setTodo(todoToEdit.todo)
      setEditingId(id)
    }
  }

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id)
    setTodos(updatedTodos)
    saveToLS(updatedTodos)
  }

  const handleAdd = () => {
    if (todo.trim() !== "") {
      let updatedTodos
      if (editingId) {
        updatedTodos = todos.map(item =>
          item.id === editingId
            ? { ...item, todo: todo.trim() }
            : item
        )
        setEditingId(null)
      } else {
        updatedTodos = [...todos, { todo: todo.trim(), isCompleted: false, id: uuidv4() }]
      }
      setTodos(updatedTodos)
      saveToLS(updatedTodos)
      setTodo("")
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTodo("")
  }

  const handleThemeChange = (theme) => {
  setCurrentTheme(theme);
  localStorage.setItem("theme", theme);
}
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-cover bg-center" style={{ backgroundImage: `url(${themes[currentTheme].bgimg})`, backgroundPosition: 'center 80%' }}>
      <Navbar currentTheme={currentTheme} setCurrentTheme={handleThemeChange} themes={themes} />

      <div className="flex justify-center items-start pt-4">
        <div className="quest-container rounded-2xl flex justify-center items-start bg-center w-full max-w-2xl mx-4">
          <div className={`${themes[currentTheme].bgClass} p-6 rounded-2xl shadow-xl w-full`}>
            <h2 className="quest-title text-4xl font-extrabold mb-6 flex items-center gap-3">
              <span className="text-yellow-400 drop-shadow-lg animate-bounce">⚡</span>
              <span className="animate-gradient uppercase tracking-wider font-mono py-1 px-3 rounded-lg border-2 border-opacity-20 border-white shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 via-green-500 to-purple-500">
                Quest Log
              </span>
            </h2>

            {/* Fixed input section */}
            <div className="sticky top-0 z-10 bg-inherit pb-4">
              <div className="input-container flex rounded-full overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200">
                <input
                  className="flex-1 px-4 py-3 outline-none bg-gray-100 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-300"
                  placeholder={editingId ? "Edit your task..." : "Add your task here!"}
                  aria-label={editingId ? "Edit task" : "Add a new task"}
                  type="text"
                  value={todo}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
                {editingId && (
                  <button
                    className="px-3 py-1 text-red-500 font-semibold text-sm hover:text-red-600 transition-colors duration-200 flex items-center justify-center"
                    aria-label="Cancel edit"
                    onClick={handleCancelEdit}
                  >
                    <span className="text-xl">×</span>
                  </button>
                )}
                <button
                  className={`${themes[currentTheme].buttonClass} ${themes[currentTheme].buttonHoverClass} px-6 text-white font-semibold text-sm transition-colors duration-200 flex items-center justify-center`}
                  aria-label={editingId ? "Update task" : "Add task"}
                  onClick={handleAdd}
                >
                  <span>{editingId ? "Update" : "Add"}</span>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div 
              className="h-[60vh] overflow-y-auto" 
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: `${themes[currentTheme].scrollbarColor} transparent`
              }}
            >
              <ul className="space-y-3 text-sm pt-2">
                {todos.length === 0 && (
                  <li className="text-center pt-[10vw] text-gray-500 animate-fade-in">
                    <div className="text-6xl mb-3 drop-shadow-sm">🌈</div>
                    <p className="text-xl font-semibold text-gray-600 tracking-wide">
                      Your quest log is empty!
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add a task and begin your journey.
                    </p>
                  </li>
                )}
                {todos.map((item) => (
                  <li key={item.id} className="todo-item flex items-center justify-between group px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors overflow-hidden">
                    <div className="todo-content flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${item.isCompleted
                          ? `${themes[currentTheme].buttonClass} text-white text-xs`
                          : 'border-2 border-gray-500 hover:border-current'
                          }`}
                      >
                        {item.isCompleted && '✓'}
                      </button>
                      <span className={`truncate ${item.isCompleted
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                        }`}>
                        {item.todo}
                      </span>
                    </div>
                    <div className="todo-actions flex items-center gap-2 flex-shrink-0 ml-2">
                      <button
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        onClick={() => handleEdit(item.id)}
                        disabled={editingId === item.id}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => handleDelete(item.id)}
                        disabled={!!editingId}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App