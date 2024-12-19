import {
  BiCurrentLocation,
  BiEnvelope,
  BiLogoGithub,
  BiLogoLinkedin,
  BiPhone,
} from "react-icons/bi"
import { BsFileEarmarkPersonFill } from "react-icons/bs"
import { useState, useEffect, useRef } from "react"

function HeaderLeft() {
  const [scrambleTexts, setScrambleTexts] = useState({})
  const scrambleIntervals = useRef({})

  const generateRandomText = (length) => {
    const chars = "01234567890!@#$%^&*()_+-=[]{}|;:,.<>?"
    return Array(length)
      .fill()
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("")
  }

  useEffect(() => {
    const skills = [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind",
      "Next.js",
      "Node.js",
    ]
    const intervals = scrambleIntervals.current

    // Start scramble for all skills
    skills.forEach((skill) => {
      intervals[skill] = setInterval(() => {
        setScrambleTexts((prev) => ({
          ...prev,
          [skill]: generateRandomText(skill.length),
        }))
      }, 50)
    })

    return () => {
      // Cleanup all intervals using the stored reference
      Object.values(intervals).forEach((interval) => {
        clearInterval(interval)
      })
    }
  }, [])

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="win95-border p-1">
            <img src="/image.png" alt="CV-Image" className="w-32" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl">
              Nikola <span className="font-bold">Šepić</span>
            </h1>
            <h3 className="text-xl">Front-End Developer</h3>
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Contact</div>
          <div className="p-2 space-y-2">
            <div className="flex items-center gap-2">
              <BiCurrentLocation className="text-2xl" />
              <span>Belgrade Serbia</span>
            </div>
            <a href="mailto:sepicnikola@gmail.com" className="social-button">
              <BiEnvelope className="text-2xl" />
              <span>sepicnikola@gmail.com</span>
            </a>
            <a href="tel:+381637624555" className="social-button">
              <BiPhone className="text-2xl" />
              <span>+381 63 7624 555</span>
            </a>
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Social</div>
          <div className="p-2 space-y-2">
            <a href="https://github.com/sepicn" className="social-button">
              <BiLogoGithub className="text-2xl" />
              <span>sepicn</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sepicn/"
              className="social-button"
            >
              <BiLogoLinkedin className="text-2xl" />
              <span>sepicn</span>
            </a>
            <a
              href="/CV.pdf"
              download="Nikola_Sepic_CV.pdf"
              className="social-button"
            >
              <BsFileEarmarkPersonFill className="text-2xl" />
              <span>Curriculum vitae</span>
            </a>
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Education</div>
          <div className="p-2">
            <div className="space-y-1">
              <span className="font-bold">
                Bachelor of Science in Information Technology
              </span>
              <div className="text-sm">
                <div>Singidunum University</div>
                <div>2020-2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Skills</div>
          <div className="skills-container relative">
            <div className="skills-title">root@portfolio:~# ./skills.sh</div>
            <div className="flex flex-col">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Tailwind",
                "Next.js",
                "Node.js",
              ].map((skill) => (
                <div key={skill} className="skill-button">
                  <span className="skill-text">{skill}</span>
                  <span className="scramble-text">
                    {scrambleTexts[skill] || generateRandomText(skill.length)}
                  </span>
                </div>
              ))}
            </div>
            <div className="terminal-cursor">root@portfolio:~#</div>
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Hobbies</div>
          <div className="p-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Reading</li>
              <li>Learning</li>
              <li>Gym</li>
              <li>Gaming</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderLeft
