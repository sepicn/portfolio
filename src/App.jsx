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
    <>
      <div
        className={`min-h-screen w-full flex flex-col sm:flex-row subpixel-antialiase ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <HeaderLeft isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Home />
      </div>
    </>
  )
}

export default App
