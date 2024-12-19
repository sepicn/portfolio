function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="win95-window">
          <div className="win95-window-title">About</div>
          <div className="terminal-container">
            <div className="terminal-title">
              root@portfolio ~/about % cat profile.txt
            </div>
            <div className="terminal-text">
              <p className="text-lg">
                I&apos;m Nikola Šepić, a passionate software engineer based in
                Belgrade, Serbia, holding a Bachelor&apos;s degree in
                Information Technology.
              </p>
              <p className="text-lg">
                I&apos;m eager to make my mark in the tech industry, with a keen
                interest in web development, especially in front-end
                technologies like React. My dedication to writing efficient,
                well structured code drives my continual learning and growth in
                this ever-evolving field.
              </p>
              <p className="text-lg">
                I believe in the value of collaboration, attention to detail,
                and a proactive approach to problem solving qualities that are
                highly regarded in the industry.
              </p>
              <p className="text-lg">
                Beyond coding, I love diving into a good book, spending quality
                time with my cat, taking relaxing walks, or staying energized
                through workouts at the gym.
              </p>
            </div>
            <div className="terminal-cursor">root@portfolio ~/about %</div>
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Projects</div>
          <div className="p-2 space-y-4">
            {[
              {
                title: "Move Fit",
                url: "https://move-fit.netlify.app/",
                description: `MoveFit is a dynamic web application designed to help users discover and learn about various exercises tailored to specific muscle groups. The project leverages data from an API to provide detailed information and visual guidance on a wide range of workouts.

Users can easily filter exercises by selecting a target muscle group, and each exercise has its own dedicated page featuring comprehensive details. These include instructional videos, descriptions on proper form, and GIFs that visually demonstrate the exercise motion, ensuring clarity and ease of understanding. MoveFit also highlights which muscle groups are engaged and lists the necessary equipment for each workout.

Built with React, the application utilizes technologies such as React Router for seamless navigation and Material Icons to enhance the user interface, delivering an intuitive and visually appealing experience.`,
              },
              {
                title: "Wild Oasis Internal",
                url: "https://react-the-wild-oasis-site.netlify.app/",
                description: `Wild Oasis is a comprehensive web application built for employees of a company that manages rental properties, such as vacation cabins or houses. The platform provides a robust dashboard that displays essential metrics, including the total number of reservations, sales and the current status of rented properties.

Access to the site is secured with protected routes, ensuring that only authorized staff members can view and manage the data. The app integrates with Supabase for database functionality, allowing seamless data entry and management. Employees can easily add new properties, update rental prices, and manage user profiles for clients who have made reservations. Additionally, new staff members can be added to the system through the interface.

The project is developed using React, with CSS modules for styling to maintain a clean and modular design. The integration of Supabase ensures efficient and real-time data management, creating a streamlined experience for property management tasks.`,
              },
              {
                title: "Wild Oasis External",
                url: "https://wild-oasis-website-flax.vercel.app/",
                description: `Wild Oasis External is a user-centric web application developed with Next.js, featuring React Server Components, styled with Tailwind CSS, and secured with NextAuth for seamless authentication. It provides an intuitive experience for guests looking to book rental cabins and manage their reservations.

Users can easily sign up, select their desired cabin, and choose available dates for their stay. The app instantly displays the total price, and once the reservation details are confirmed, guests can finalize their bookings. Additionally, they have access to a personalized reservation history, where they can update details such as the number of guests or add notes about their stay.

The application integrates with a Supabase database, which securely handles and stores user data, including identity verification and information about where the guests are from. With a focus on providing a smooth and efficient booking experience, Wild Oasis External ensures that guests can effortlessly manage their reservations and enjoy a stress-free vacation planning process.`,
              },
              {
                title: "TicTacToe Game",
                url: "https://tictactoereact-app.netlify.app/",
                description: `TicTacToe is a classic and engaging game built with React, offering a smooth and responsive user experience. The application features an intuitive interface, allowing two players to compete against each other in the timeless game of Xs and Os.

The game board dynamically updates as players take turns, with React efficiently handling state changes to keep the gameplay seamless. Winning conditions are automatically detected, displaying a celebratory message for the victor, while ties are also acknowledged. Players can reset the game at any time to start a new match.`,
              },
            ].map((project) => (
              <div key={project.title} className="win95-window">
                <div className="win95-window-title">
                  <span>{project.title}</span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-button"
                  >
                    Visit Site
                  </a>
                </div>
                <div className="p-2">
                  <p className="text-sm whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="win95-window">
          <div className="win95-window-title">Certificates</div>
          <div className="p-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                {[
                  {
                    title: "JavaScript Certificate",
                    org: "Udemy",
                    year: "2023",
                    url: "https://www.udemy.com/certificate/UC-e1cfe864-8575-428c-811e-7f8016015130/",
                  },
                  {
                    title: "HTML & CSS Certificate",
                    org: "Udemy",
                    year: "2023",
                    url: "https://www.udemy.com/certificate/UC-dd4630f5-8d19-45d1-aea7-c53aac5a9dd9/",
                  },
                  {
                    title: "React Certificate",
                    org: "Udemy",
                    year: "2024",
                    url: "https://www.udemy.com/certificate/UC-3ca34e42-31e6-4d29-8154-88f64ff55dab/",
                  },
                ].map((cert) => (
                  <div key={cert.title} className="win95-window">
                    <div className="win95-window-title">
                      <span>{cert.title}</span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-button"
                      >
                        View
                      </a>
                    </div>
                    <div className="p-2">
                      <div className="text-sm mb-1">{cert.org}</div>
                      <div className="certificate-year">{cert.year}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  {
                    title: "Responsive Web Design",
                    org: "freeCodeCamp",
                    year: "2023",
                    url: "https://www.freecodecamp.org/certification/sepicnikola/responsive-web-design",
                  },
                  {
                    title: "JavaScript Algorithms and Data Structures",
                    org: "freeCodeCamp",
                    year: "2023",
                    url: "https://www.freecodecamp.org/certification/sepicnikola/javascript-algorithms-and-data-structures",
                  },
                ].map((cert) => (
                  <div key={cert.title} className="win95-window">
                    <div className="win95-window-title">
                      <span>{cert.title}</span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-button"
                      >
                        View
                      </a>
                    </div>
                    <div className="p-2">
                      <div className="text-sm mb-1">{cert.org}</div>
                      <div className="certificate-year">{cert.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
