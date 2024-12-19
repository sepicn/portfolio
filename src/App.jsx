import { useState } from "react"
import HeaderLeft from "./components/HeaderLeft"
import Home from "./components/Home"
import { BiMoon, BiSun } from "react-icons/bi"

function App() {
  const [isDark, setIsDark] = useState(false)

  function toggleDarkMode() {
    setIsDark((mode) => !mode)
    document.documentElement.classList.toggle("dark", !isDark)
  }

  return (
    <div className="win95-bg min-h-screen flex justify-center">
      <div className="w-full max-w-7xl flex flex-col sm:flex-row p-4 gap-4">
        <div className="win95-window sm:h-screen sm:sticky sm:top-4 flex-1 flex flex-col">
          <div className="win95-window-title">
            <span>Profile.exe</span>
            <button
              className="win95-button text-black text-sm px-2 py-0 flex items-center"
              onClick={toggleDarkMode}
            >
              {isDark ? (
                <BiSun className="text-lg" />
              ) : (
                <BiMoon className="text-lg" />
              )}
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <HeaderLeft isDark={isDark} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
        <div className="win95-window flex-[3] flex flex-col">
          <div className="win95-window-title">
            <span>Portfolio.exe</span>
          </div>
          <div className="flex-1">
            <Home />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
