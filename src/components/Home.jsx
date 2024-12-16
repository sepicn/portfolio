function Home() {
  return (
    <div className="flex-[3] transition-all duration-400 dark:bg-black dark:text-white overflow-scroll no-scrollbar h-screen">
      <main className="flex max-w-[1000px] flex-col gap-10 p-5 md:mx-10 md:py-14">
        <div className="space-y-5 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold">About</h2>
          <p className="text-sm text-gray-600 dark:text-gray-200 md:text-base">
            I&apos;m Nikola Šepić, a passionate software engineer based in
            Belgrade, Serbia, holding a Bachelor&apos;s degree in Information
            Technology. <br /> I&apos;m eager to make my mark in the tech
            industry, with a keen interest in web development, especially in
            front-end technologies like React. My dedication to writing
            efficient, well structured code drives my continual learning and
            growth in this ever-evolving field.
            <br /> I believe in the value of collaboration, attention to detail,
            and a proactive approach to problem solving qualities that are
            highly regarded in the industry.
            <br /> Beyond coding, I love diving into a good book, spending
            quality time with my cat, taking relaxing walks, or staying
            energized through workouts at the gym.
          </p>
        </div>

        <div className="max-w-3xl space-y-8">
          <h2 className="text-2xl font-bold md:text-4xl">Projects</h2>
          <div className="max-w-3xl space-y-10">
            <a
              href="https://move-fit.netlify.app/"
              className="block project-card"
            >
              <div className="relative flex flex-col gap-1 border-l p-6 project-dot before:absolute before:left-[-6px] before:top-[50%] before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                <h3 className="font-semibold md:text-lg">Move Fit</h3>
                <p className="text-sm text-gray-600 dark:text-gray-200 md:text-base">
                  MoveFit is a dynamic web application designed to help users
                  discover and learn about various exercises tailored to
                  specific muscle groups. The project leverages data from an API
                  to provide detailed information and visual guidance on a wide
                  range of workouts.
                  <br /> Users can easily filter exercises by selecting a target
                  muscle group, and each exercise has its own dedicated page
                  featuring comprehensive details. These include instructional
                  videos, descriptions on proper form, and GIFs that visually
                  demonstrate the exercise motion, ensuring clarity and ease of
                  understanding. MoveFit also highlights which muscle groups are
                  engaged and lists the necessary equipment for each workout.
                  <br />
                  Built with React, the application utilizes technologies such
                  as React Router for seamless navigation and Material Icons to
                  enhance the user interface, delivering an intuitive and
                  visually appealing experience.
                </p>
              </div>
            </a>
          </div>
          <div className="max-w-3xl space-y-8">
            <a
              href="https://react-the-wild-oasis-site.netlify.app/"
              className="block project-card"
            >
              <div className="relative flex flex-col gap-1 border-l p-6 project-dot before:absolute before:left-[-6px] before:top-[50%] before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                <h3 className="font-semibold md:text-lg">
                  Wild Oasis Internal
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-200 md:text-base">
                  Wild Oasis is a comprehensive web application built for
                  employees of a company that manages rental properties, such as
                  vacation cabins or houses. The platform provides a robust
                  dashboard that displays essential metrics, including the total
                  number of reservations, sales and the current status of rented
                  properties.
                  <br /> Access to the site is secured with protected routes,
                  ensuring that only authorized staff members can view and
                  manage the data. The app integrates with Supabase for database
                  functionality, allowing seamless data entry and management.
                  Employees can easily add new properties, update rental prices,
                  and manage user profiles for clients who have made
                  reservations. Additionally, new staff members can be added to
                  the system through the interface.
                  <br /> The project is developed using React, with CSS modules
                  for styling to maintain a clean and modular design. The
                  integration of Supabase ensures efficient and real-time data
                  management, creating a streamlined experience for property
                  management tasks.
                </p>
              </div>
            </a>
          </div>

          <div className="max-w-3xl space-y-8">
            <a
              href="https://wild-oasis-website-flax.vercel.app/"
              className="block project-card"
            >
              <div className="relative flex flex-col gap-1 border-l p-6 project-dot before:absolute before:left-[-6px] before:top-[50%] before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                <h3 className="font-semibold md:text-lg">
                  Wild Oasis External
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-200 md:text-base">
                  Wild Oasis External is a user-centric web application
                  developed with Next.js, featuring React Server Components,
                  styled with Tailwind CSS, and secured with NextAuth for
                  seamless authentication. It provides an intuitive experience
                  for guests looking to book rental cabins and manage their
                  reservations.
                  <br />
                  Users can easily sign up, select their desired cabin, and
                  choose available dates for their stay. The app instantly
                  displays the total price, and once the reservation details are
                  confirmed, guests can finalize their bookings. Additionally,
                  they have access to a personalized reservation history, where
                  they can update details such as the number of guests or add
                  notes about their stay.
                  <br />
                  The application integrates with a Supabase database, which
                  securely handles and stores user data, including identity
                  verification and information about where the guests are from.
                  With a focus on providing a smooth and efficient booking
                  experience, Wild Oasis External ensures that guests can
                  effortlessly manage their reservations and enjoy a stress-free
                  vacation planning process.
                </p>
              </div>
            </a>
          </div>

          <div className="max-w-3xl space-y-8">
            <a
              href="https://tictactoereact-app.netlify.app/"
              className="block project-card"
            >
              <div className="relative flex flex-col gap-1 border-l p-6 project-dot before:absolute before:left-[-6px] before:top-[50%] before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                <h3 className="font-semibold md:text-lg">TicTacToe Game</h3>
                <p className="text-sm text-gray-600 dark:text-gray-200 md:text-base">
                  TicTacToe is a classic and engaging game built with React,
                  offering a smooth and responsive user experience. The
                  application features an intuitive interface, allowing two
                  players to compete against each other in the timeless game of
                  Xs and Os. <br />
                  The game board dynamically updates as players take turns, with
                  React efficiently handling state changes to keep the gameplay
                  seamless. Winning conditions are automatically detected,
                  displaying a celebratory message for the victor, while ties
                  are also acknowledged. Players can reset the game at any time
                  to start a new match.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="space-y-10">
          <h2 className="text-2xl font-bold md:text-4xl">Certificates</h2>

          <div className="flex flex-col lg:flex-row lg:gap-20">
            <ul>
              <a
                href="https://www.udemy.com/certificate/UC-e1cfe864-8575-428c-811e-7f8016015130/"
                className="block certificate-card"
              >
                <li className="relative flex flex-col gap-1 border-l p-6 certificate-dot before:absolute before:left-[-6px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                  <span className="font-semibold md:text-lg">
                    JavaScript Certificate
                  </span>
                  <span className="font-light">Udemy</span>
                  <span className="text-sm to-gray-400">2023</span>
                </li>
              </a>
              <a
                href="https://www.udemy.com/certificate/UC-dd4630f5-8d19-45d1-aea7-c53aac5a9dd9/"
                className="block certificate-card"
              >
                <li className="relative flex flex-col gap-1 border-l p-6 certificate-dot before:absolute before:left-[-6px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                  <span className="font-semibold md:text-lg">
                    HTML & CSS Ceritificate
                  </span>
                  <span className="font-light">Udemy</span>
                  <span className="text-sm to-gray-400">2023</span>
                </li>
              </a>
              <a
                href="https://www.udemy.com/certificate/UC-3ca34e42-31e6-4d29-8154-88f64ff55dab/"
                className="block certificate-card"
              >
                <li className="relative flex flex-col gap-1 border-l p-6 certificate-dot before:absolute before:left-[-6px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                  <span className="font-semibold md:text-lg">
                    React Ceritificate
                  </span>
                  <span className="font-light">Udemy</span>
                  <span className="text-sm to-gray-400">2024</span>
                </li>
              </a>
            </ul>
            <ul>
              <a
                href="https://www.freecodecamp.org/certification/sepicnikola/responsive-web-design"
                className="block certificate-card"
              >
                <li className="relative flex flex-col gap-1 border-l p-6 certificate-dot before:absolute before:left-[-6px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                  <span className="font-semibold md:text-lg">
                    Responsive Web Design
                  </span>
                  <span className="font-light">freeCodeCamp</span>
                  <span className="text-sm to-gray-400">2023</span>
                </li>
              </a>
              <a
                href="https://www.freecodecamp.org/certification/sepicnikola/javascript-algorithms-and-data-structures"
                className="block certificate-card"
              >
                <li className="relative flex flex-col gap-1 border-l p-6 certificate-dot before:absolute before:left-[-6px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-black dark:before:bg-white before:transform">
                  <span className="font-semibold md:text-lg">
                    JavaScript Algorithms and Data Structures
                  </span>
                  <span className="font-light">freeCodeCamp</span>
                  <span className="text-sm to-gray-400">2023</span>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
