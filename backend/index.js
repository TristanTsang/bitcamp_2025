import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import cors from 'cors'; 

dotenv.config();

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173',
}));

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/review-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a resume PDF file.' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = `Here is a sample of top candidate resumes:

Resume 1: EDUCATION
University of Texas at Austin - B.S. Computer Science
Coursework: Algorithms, Software Design, Computer Architecture, Principles of Machine Learning, Data Structures Activities: TX Convergent, Association of Computing Machinery, Texas Epic
May 2026 (Expected graduation)
SKILLS
Programming Languages: Python, Java, JavaScript, C/C++, CH, Go, MySQL, Kotlin, Linux Frameworks: React, Flask, Node.js, AngularJS, Spring, React Native, Bootstrap, CSS, HTML Databases/Developer Tools: Amazon Web Services (AWS), PostgreSQL, Git, Docker, VS Code
WORK EXPERIENCE
Software Development Intern - Expedia Group, Austin, TX
05/2024 - 07/2024
- Modernized an authentication feature using Java for EG Console and VRBO by creating and testing 5 REST API endpoints to implement secure authorization codes and cross-domain session cookies in OIDC flow
- Developed a system with AWS SES to handle API client credentials in Kotlin including expiry handling, credential rotation, and real-time notifications
- Utilized AuroraDB for persistent storage, Redis for caching, and Kafka for event streaming, improving the performance and reliability of credential operations by 8%
Undergraduate Research Assistant - University of Texas at Austin, Austin, TX
01/2024 - Present
- Created two autoregressive LSTM and BiLSTM neural network models in Python and Tensor Flow for time series soil moisture prediction, achieving test MSEs of 1.265 and 1.086
- Conducted data processing and analysis on over 10,000 NASA CYGNSS Level 3 Soil Moisture Product data points using Pandas and NumPy to create a comprehensive dataset for predictive model training
Software Engineering Intern - Lockheed Martin, Palo Alto, CA
05/2022 - 08/2022
- Developed a Python and Flask desktop application for solar image research, streamlining data acquisition and preliminary analysis
- Integrated MySQL and Amazon S3 databases with solar research backend applications
PROJECTS
CodeAssist
- Utilized AngularJS and Bootstrap to create a responsive website for real-time updates on course enrollments, assignment submissions and instructor feedback
- Implemented a NodeJS backend with PostgreSQL, using connection pooling for efficient data storage and retrieval
Investment Portfolio Optimizer Tool
- Built a full stack tool using Python for data processing, C++ for optimization algorithms, and React for the user interface
- Implemented mean-variance optimization and constraint handling algorithms to maximize portfolio returns
Positive EV & Arbitrage Bot
- Developed a sports betting bot in Python, leveraging positive EV and arbitrage algorithms to automate bets
- Built and maintained an API service that queries 20+ sportsbooks every 5 seconds to provide real-time odds to users and developers
Austin Free Net App
• Developed bus tracking and map features using React Native, JavaScript, and Swift for both iOS and Android platforms
AWARDS
- USA Computing Olympiad Gold Division
- USA Computing Olympiad Silver Division
04/2020
12/2019

Resume 2: EDUCATION
University of Rochester
Bachelor of Science in Computer Science
• Awards: Davis UWC Scholarship, Dean's List, Schwartz Discover Grant
Rochester, New York Anticipated May 2025
EXPERIENCE
Software Engineer Intern
May 2021 - August 2021
MassInvest
NYC, New York
- Work directly with the CEO to build incremental versions of MVPs using Flutterflow and Firebase.
- Implement designs created in Figma to develop a functional mobile application including features such as investing, portfolio tracking, and updating daily educational contents for users.
Computer Vision Engineer
May 2023
- Present
Cognitive Collection Lab (https://collcoglab.bcs.rochester.edu)
Rochester, New York
- Built a 2D marmosets' pose tracking pipeline that achieved an error rate close to that of humans (3-5 pixels) after training and testing on a data set containing 800 1920x1080 frames.
- Direct the assembly of an automatic 3D pose capture system (with Matlab and Python) to reduce time spent manually labeling data by 80% and eliminate all physical interference to the animals' bodies.
Research Assistant
April 2023 - Present
Prof. Anson Kahng's group, University of Rochester
Rochester, New York
- Formulate proofs and write Java simulation to determine the optimal strategy of the non-cooperative, extensive-form game of queuing in omnichannel systems.
- Construct server choosing and allocating strategies that enable agents and schedulers to reduce their delay up to 20%.
Teaching Assistant
CSC 172 - Data Structure and Algorithms, University of Rochester
August 2022 - May 2023
Rochester, New York
- Led weekly lab sessions for 30 students to help them efficiently implement different data structures and algorithms, with my lab's average exam grade of 90% and project grade of 95%.
- Worked closely with the professor and other TAs to enhance students' rate of learning and depth of understanding, with my performance's average rating of 5/5.
Software Engineer Intern
May 2022 - August 2022
Cybozu Inc
Ho Chi Minh City, Viet Nam
- Built RESTful APIs (to authorize users and manage users' seats) that served to Javascript front-end and handled more than 10000 concurrent users.
- Automated testing procedure by writing 100+ unit tests using JTest and Mocha, making the integration of modules easier and increasing the test coverage by 50%.
TECHNICAL SKILLS
Languages: Java, JavaScript, TypeScript, React, C+ +, Python, CSS
Developer Tools: Flutterflow, Firebase, Docker, Heroku, Swagger, OpenAPI, MongoDB, Git, MySQL, PostgreSQL
PROJECTS
Reversi Bot | Java
January 2023
• Built a bot using MiniMax algorithms with/without pruning to play reversi against a human player with different difficulty levels.
Personal Smart Note | PHP, TypeScript, SCSS, Blade, JavaScript, HTML
October 2022
- An app that enables users to create, categorize, share and comment note with other users.
- Won 3rd prize in All In Hackathon 2022 hosted by MLHacking for its usability and scalability.
Resume 3: Northeastern University
Bachelor of Science in Computer Science (Concentration in Artificial Intelligence)
Boston, MA
May 2026
- Honors: GPA: 3.88 | Dean's List | AJC Merit Research Scholar
- Courses: Algorithms/Data Structures, Object-Oriented Design, Database Design, Artificial Intelligence, Computer Systems
EXPERIENCE
Citigroup
Software Engineering Intern
New York, NY
Jun 2024 - Aug 2024
o Reduced the trading desk's workload by 12 hours weekly through optimizing the TA security data upload process with a backend Java and Spring Boot automation pipeline.
- Coordinated with business analyst, QA, DevOps, and trading desk teams to create an end-to-end testing framework, ensuring system quality, security, and user alignment prior to production deployment.
- Improved issue tracking and resolution for support teams by creating SQL database tables and logging systems.
- Northeastern University
 Research Software Developer - Dong Lab
Boston, MA
Jan 2024 - May 2024
- Engineered a modular Python package for modeling molecularly imprinted nanoparticles, bypassing traditional wet lab experiments, thereby reducing bio waste and synthesis time.
- Developed object-oriented base classes and technical documentation, allowing researchers and developers to easily adapt the framework, fostering greater re-usability and collaboration.
- Implemented a network optimization algorithm using simulated annealing with heap and KD-tree data structures, resulting in a 37% reduction in compute time and improved alignment with wet lab results.
LEADERSHIP AND INVOLVEMENT
• Northeastern Electric Racing
Boston, MA
Technical Lead
Sep 2023 - Present
- Developed a full-stack project management dashboard with React, Express, and Prisma, enhancing workflow, project timelines, and team communication across 80+ projects impacting 300+ users.
- Engineered a Design Review Calendar feature using custom React hooks and RESTful API endpoints, leading to streamlined scheduling, enhanced team collaboration, and a 13% reduction in R&D timelines.
PROJECTS
- Battleship Algo: Java, JUnit
- Created a multiplayer Battleship game using Java server and client sockets, applying MVC architecture.
- Designed a rule-based algorithm with a 73% win rate, applying test-driven development with JUnit.
CORE TECHNICAL SKILLS
- Languages: Java, Python, Typescript, Javascript, HTML/CSS, SQL
- Frameworks/Libraries: React, Express, Flask, JUnit, Spring Boot, PyTorch, Pandas, Numpy
- Tools: MySQL, PostgreSQL, Git, Docker, Node, Postman, Linux
Resume 4: WORK EXPERIENCE
Indianapolis, IN
QA Business Analyst Intern
May 2022 - Aug 2022
- Spearheaded the tracking and resolution of over 150 issues, logging concerns and ensuring updates were communicated to the product team within 24 hours.
- Conducted competitive analysis which involved creating 65+ organizational charts and market maps to directly influence three strategic decisions.
- Formulated 120+ detailed test cases that matched specific business requirements, enhancing the coverage of business and system functionalities by 40%.
DataProphet
Cape Town, South Africa
Data Science Intern
Jun 2021 - Aug 2021
- Developed a 3D model using Blender to establish a benchmark in quality assessment for metal ball manufacturing
- Created and implemented a damage recognition system, increasing detection accuracy of deviations by 30%.
- Utilized object detection and TensorFlow in developing ML models that automated 98% of quality control tasks, reducing manual inspection by 95%.
De Pauw University
Greencastle, IN
STEM Liaison
Nov 2020 - Dec 2021
- Developed a social media action plan that increased engagement by 200% and highlighted five grant opportunities.
- Utilized HTML5, ReactS, CSS3, Query, and Bootstrap 4 to develop a comprehensive website that showcased program resources, events, and activities, enhancing visitor interaction by 80%.
- Supported the manager in strategic initiatives, contributing to a 35% increase in program participation.
- Designed and distributed a weekly newsletter via MailChimp to 1,000+ subscribers, featuring important updates and relevant stories that boosted open rates by 20%.
Himachal Road Transport Corporation (HRTC)
Hamirpur, India
Software Engineer Intern
May 2020 - Aug 2020
- Led the development of a full-stack online bus ticket reservation system using React.js and Redux, enhancing the booking process, which resulted in a 30% reduction in ticket purchase time and a 25% increase in customer satisfaction.
- Developed robust backend applications with Node.js and Express, coupled with MongoDB for database management, which improved system efficiency and operational continuity by 35%.
- Integrated APIs for real-time seat availability and payment processing, effectively streamlining transactions and boosting booking volume by 20%.
EDUCATION
DEPAUW UNIVERSITY
Bachelor of Arts (BA)
Greencastle, IN
Aug 2019 - May 2024
Major: Computer Science | Dean's List: Spring 2020, Spring 2021, Fall 2022, Fall 2023
Extracurricular Activities: DePauw Innovations - Chief Marketing Officer, Consulting Group at DePauw - Data Analyst,
DePauw Data Science Group - Executive Board Member, Management Fellow
Certifications: iXperience Summer: Intensive Data Science Program, Scrimba Front-End Developer Career Path
TECHNICAL SKILLS
Programming Languages: C++, Java, Python, R, HTML5, CSS3, JavaScript, TypeScript, SQL, Erlang Database & Data Tools: MongoDB, MySQL, Hadoop, Tableau, Power BI
Software & Development Tools: Git, VS Code, Intelli], Android Studio, R-Studio, Postman, Anaconda, Docker, Jenkins Frameworks, Libraries, Cloud & Design: React.js, Nodejs, Next.js, ¡Query, Redux, GraphQL, Express.js, EJS, Django, Flask, NPM, AJAX, RESTful Services, AWS, TensorFlow, Bootstrap, SASS/SCSS, Jest, Kubernetes, Mongoose, Figma, Adobe XD
PROJECTS
-  DTrack | MERN, REST API, CRUD: Track simplifies job searches, organizing and tracking applications with a user-friendly interface, progress summaries, and key metrics for effective job hunting.
-  Today I Learned | FULL-STACK, REACT, SUPABASE: "TIL" is a web app for users to share and upvote/downvote or dispute interesting facts. It features category-based filtering for efficient fact browsing.
-  iBudget | REACT, JS, SUPABASE: A full-stack budget management application with user authentication, account creation, budget tracking, and secure data management (2nd Place at Headstarter Al Hackathon I)
-  COVID-19 stats | R, SHINY: covid stats (visual) for every country using RShiny with an option of date range. You can hover over countries, zoom in/ zoom out etc.
Resume 5: Education
University of Maryland
Expected Graduation: May 2025
Bachelor of Science in Computer Science
College Park, MD
• Relevant Coursework: Data Structures, Algorithms, Object-Oriented Programming, Web App Development, Data Science, Computer Systems, Organization of Programming Languages, Computer Network Security, Compilers
Skills
Languages JavaScript, TypeScript, Python, Java, Kotlin, C, Ruby, SQL, OCaml, HTML, CSS
Libraries & Frameworks ReactJS, NodeJS, ExpressJS, Redux, MochaJS, JUnit, NumPy, Pandas, Scikit-learn Developer Tools Git, GitHub, Docker, UNIX, Linux, MongoDB, Eclipse, VS Code, XAMPP, Jupyter Notebook
Experience
Fortune 500 Company
June 2024 - August 2024
Software Engineer Intern
City, State
- Spearheaded the front-end development of an audit log using ReactJS, BackboneJS, and MarionetteJS, directly addressing customer needs and improving data transparency for customers
- Collaborated with engineers across cross-functional teams to design and implement a new API endpoint using
 C# and SQL, supporting batch calls for the audit log and significantly improving back-end data retrieval efficiency
- Leveraged Agile methodology and effective communication skills to coordinate with product managers and lead engineers, tracking project milestones and ensuring 100% timely delivery
Fortune 500 Company
June 2023 - Present
Fellow
City, State
- Completed 30 + mock technical interviews, applying software engineering principles and problem-solving skills, resulting in a 34% improvement in interview performance
- Engaged in mentorship with Fortune 500 Company] software engineers, gaining insights into numerous industry standards and cultivating meaningful professional connections
School Name
June 2022 - Present
Database Engineer Intern
City, State
- Lead full-stack development a program's web application, visualizing student engagement data to provide actionable insights, resulting in a >40% increase in student engagement
- Remodeled the data storage and synthesis framework to optimize data collection using JavaScript and Google Sheets, reducing the organization's weekly work hours by 11%, increasing scalability for the program
- Optimized data query times by reducing Google Apps Script API calls and utilizing GViz Query with aggregate functions, decreasing query times from >10,000 ms to 500 ms
Computer Science Tutor
January 2023 - August 2023
- Conducted 80+ tutorial sessions for undergrads in core computer science courses, resulting in an average grade improvement of 5%
- Empowered 11 students to master programming languages (Java, Python, C, OCaml) and core computer science concepts such as object-oriented programming, memory management, algorithms, and discrete mathematics, resulting in 100% academic project completion rates
Projects
Project Name
December 2023
- Developed a full-stack game using JavaScript, HTML/CSS, NodeJS, and MongoDB to enable players to compare each new country's population to the previous, featuring real-time score tracking
- Implemented a responsive UI using ExpressJS and HTML/CSS coupled with RESTful API endpoints in NodeJS and MongoDB data storage, supporting 10 simultaneous users on the leaderboard with <70 ms response time
Class Project
February 2023
- Engineered a Ruby-based translator, leveraging file I/O and regular expressions to parse grammatical structures, translating complex sentences across multiple languages with 100% accuracy
- Implemented a flexible grammar structure to define valid sentence structures for each supported language, allowing sentence generation based on user-defined rules
Resume 6: EDUCATION
Harvard University
Bachelor of Arts in Computer Science
Cambridge, MA
August 2022 - May 2026
Relevant Coursework: Data Structures & Algorithms, Compilers, Operating Systems, Computer Architecture
EXPERIENCE
Software Engineer Intern
May 2-24 - August 2024
Meta
New York, NY
- Developed and optimized backend services for user data processing using Python, improving response time by 30% through efficient data caching strategies
- Collaborated with cross-functional teams on a privacy-preserving API that supports over 500,000 active users, enhancing security compliance and scalability
- Created automated testing pipelines using CI/CD tools, reducing the manual QA workload by 40%
Software Engineer Intern
Google
May 2023 - August 2023
Mountain View, CA
- Designed and implemented a cloud-based microservice architecture for handling real-time analytics, which improved data processing speeds by 40%
- Built end-to-end features using JavaScript (React) and Python (Flask), resulting in the successful launch of a beta product that increased user retention by 15%
- Conducted performance optimization for an existing API, reducing latency by 50% through query optimization and caching mechanisms
Software Engineer Intern
NASA
May 2022 - August 2022
Houston, TX
- Developed a simulation tool in Python to model spacecraft trajectories, which reduced simulation time by 20% and increased accuracy by 15%
- Built and maintained a data visualization dashboard for mission telemetry, providing real-time analytics and insights to engineers and mission control staff
PROJECTS
Custom Compiler and Interpreter
- Built a lightweight compiler and interpreter from scratch for a custom programming language, supporting basic arithmetic operations, control flow, and data types
- Used C++ and LLVM to optimize generated code, improving performance by 35% over the initial unoptimized version
- Developed comprehensive unit and integration tests to ensure correctness and stability
Full-Stack CRUD API
- Developed a fully functional RESTful API in Flask, allowing users to manage an inventory system with create, read, update, and delete operations
- Implemented authentication and authorization features using JWT, securing the API and ensuring only authorized
- Created a front-end interface in React to interact with the API, supporting dynamic table rendering, filtering, and data manipulation
AI/ML Chatbot
- Built a conversational AI chatbot using Python and TensorFlow, capable of responding to user queries and performing basic tasks like setting reminders
- Integrated a fine-tuned GPT-2 model to enhance the chatbot's conversational abilities, resulting in a 90% user satisfaction rate in beta tests
- Developed a data pipeline for training on custom datasets, ensuring a 25% reduction in prediction errors through data augmentation techniques
TECHNICAL SKILLS
Languages: Python, C++, JavaScript, HTML/CSS, SQL (Postgres,) Java, HTML/CSS, R Frameworks: React, Flask, Node.js, TensorFlow
Developer Tools: Git, Docker, Kubernetes, CI/CD (Jenkins), PostgreSQL, MySQL Libraries: GPT-2/3, TensorFlow, Keras


Compare the user's resume with the top resumes and give feedback. Focus on:
- How the user's experience and skills compare to those in the top resumes.
- Key strengths the user should highlight or develop further to be more competitive with top candidates.
- Specific suggestions on how to enhance the user's resume, such as adding more quantifiable results or emphasizing certain skills.
- How the user's experience and projects could align with roles at top companies mentioned in the top resumes.
`;

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: 'application/pdf',
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response?.text ? response.text() : "No feedback received";

    console.log('Generated feedback:', text);

    if (!text) {
      return res.status(500).json({ error: 'No feedback received from the API' });
    }

    res.json({ feedback: text });

  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Something went wrong while reviewing the resume.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
