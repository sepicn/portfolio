import { useState } from "react"
import HeaderLeft from "./components/HeaderLeft"
import Home from "./components/Home"

function App() {
  const [isDark, setIsDark] = useState(false)

  function toggleDarkMode() {
    setIsDark((mode) => !mode)
    document.documentElement.classList.toggle("dark", !isDark)
  }

  return (
    <div
      className={`${
        isDark ? "bg-black" : "bg-white"
      } w-full min-h-screen flex justify-center transition-colors duration-300`}
    >
      <div className="w-full max-w-7xl min-h-screen flex flex-col sm:flex-row subpixel-antialiased px-0 lg:px-4">
        <HeaderLeft isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Home />
      </div>
    </div>
  )
}

export default App
