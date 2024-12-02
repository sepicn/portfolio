import {
  BiCurrentLocation,
  BiEnvelope,
  BiLogoGithub,
  BiLogoLinkedin,
  BiMoon,
  BiPhone,
  BiSun,
} from "react-icons/bi"
import image from "../../public/image.png"
import PropTypes from "prop-types"
import {
  BsFileEarmarkPerson,
  BsFileEarmarkPersonFill,
  BsFilePerson,
} from "react-icons/bs"

function HeaderLeft({ isDark, toggleDarkMode }) {
  return (
    <div className="h-screen overflow-scroll no-scrollbar  flex-1 relative p-10 transition-all duration-400 dark:bg-black dark:text-white sm:border-r dark:border-gray-700">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <img src={image} alt="CV-Image" className="w-32 rounded-full" />

          <div className="text-center space-y-1 ">
            <h1 className="text-4xl font-light">
              Nikola <span className="font-semibold">Šepić</span>
            </h1>
            <h3 className="text-2xl font-light">Front-End Developer</h3>
          </div>

          <button
            className="absolute right-10 top-10 "
            onClick={toggleDarkMode}
          >
            {isDark ? (
              <BiSun className="text-2xl" />
            ) : (
              <BiMoon className="text-2xl" />
            )}
          </button>
        </div>

        <div className="flex flex-col items-start justify-start gap-5 border-b p-5 dark:border-gray-700">
          <div className="space-y-3">
            <li className="flex items-center gap-2 ">
              <BiCurrentLocation className="text-2xl" />
              <span>Belgrade Serbia</span>
            </li>
            <li className="flex items-center gap-2 duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-black rounded-sm">
              <BiEnvelope className="text-2xl" />
              <a href="mailto:sepicnikola@gmail.com">
                <span>sepicnikola@gmail.com</span>
              </a>
            </li>
            <li className="flex items-center gap-2 duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-black rounded-sm ">
              <BiPhone className="text-2xl" />
              <a href="tel:+381637624555">
                <span className="">+381 63 7624 555</span>
              </a>
            </li>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-5 border-b p-5 dark:border-gray-700 ">
          <h2 className="text-base font-semibold md:text-2xl">SOCIAL</h2>
          <ul className="space-y-3">
            <div className="duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-black rounded-sm">
              <a href="https://github.com/sepicn">
                <li className="flex items-center gap-2 ">
                  <BiLogoGithub className="text-2xl" />
                  <span className="font-semibold">sepicn</span>
                </li>
              </a>
            </div>

            <div className="duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-black rounded-sm">
              <a href="https://www.linkedin.com/in/sepicn/">
                <li className="flex items-center gap-2 ">
                  <BiLogoLinkedin className="text-2xl" />
                  <span className="font-semibold">sepicn</span>
                </li>
              </a>
            </div>

            <div className="duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-black rounded-sm">
              <a href="../../public/CV.pdf" download="Nikola_Sepic_CV.pdf">
                <li className="flex items-center gap-2 ">
                  <BsFileEarmarkPersonFill className="text-2xl" />
                  <span className="font-semibold">Curriculum vitae</span>
                </li>
              </a>
            </div>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-start gap-5 border-b p-5 dark:border-gray-700">
          <h2
            className="text-base font-semibold md:text-2xl
          "
          >
            EDUCATION
          </h2>

          <ul>
            <li className="relative flex flex-col gap-1 border-l p-6 before:absolute before:left-[-6px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
              <span className="font-semibold md:text-lg">
                Bachelor of Science in Information Technology
              </span>
              <span className="font-light">Singidunum University</span>
              <span className="text-sm to-gray-400">2020-2024</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start justify-start gap-5 border-b p-5 dark:border-gray-700 ">
          <h2 className="text-base font-semibold">SKILLS</h2>

          <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                HTML
              </span>
              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                CSS
              </span>
              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                JavaScript
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                React
              </span>
              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                Tailwind
              </span>
              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                Next.js
              </span>

              <span className="rounded-xl bg-black text-white p-3 text-center dark:bg-white dark:text-black">
                Node.js
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-5 border-b p-5 dark:border-gray-700">
          <h2 className="text-base font-semibold">HOBBIES</h2>

          <div className="flex flex-wrap gap-16 p-3">
            <ul className="flex list-disc flex-col gap-3">
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
HeaderLeft.propTypes = {
  isDark: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
}

export default HeaderLeft
