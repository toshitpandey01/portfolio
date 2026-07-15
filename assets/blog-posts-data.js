const BLOG_POSTS = [
  {
    id: "magic-gamma-classification",
    title: "Five models, one dataset: classifying gamma telescope events",
    filename: "magic_gamma_classification.md",
    date: "2026-07-10",
    tags: ["machine-learning", "python", "scikit-learn"],
    excerpt: "I trained KNN, Naive Bayes, Logistic Regression, SVM, and a small neural network on the MAGIC Gamma Telescope dataset — and compared how each one actually behaves, not just its accuracy score.",
    content: `
      <h3>Special Thanks To <a href="https://www.kylieying.com/" target="_blank" rel="noopener noreferrer">Kylie Ying</a></h3>
      <p style="text-align: justify;">The MAGIC Gamma Telescope dataset is a classic binary classification problem: distinguish real gamma-ray signals from background hadron noise, using ten numeric features describing the shape of each detected shower. Simple on paper, useful for stress-testing a handful of algorithms against each other.</p>
      <h3>The lineup</h3>
      <p style="text-align: justify;">I trained five models on the same preprocessed data: <code>KNeighborsClassifier</code>, <code>GaussianNB</code>, <code>LogisticRegression</code>, an SVM with an RBF kernel, and a small feed-forward neural network. Same train/test split, same scaling, so the comparison would actually mean something.</p>
      <h3>What tripped me up</h3>
      <ul>
        <li>Class imbalance skewed early accuracy numbers — precision/recall per class told a truer story than overall accuracy.</li>
        <li>KNN was sensitive to feature scaling in a way the tree-adjacent models weren't; forgetting to scale before fitting quietly wrecked its distance calculations.</li>
        <li>The neural network needed more epochs than I expected before validation loss stabilized.</li>
      </ul>
      <h3>Takeaway</h3>
      <p style="text-align: justify;">SVM and the neural network came out ahead on F1-score, but logistic regression was the most honest about its confidence — its probability outputs were the best calibrated of the five. For a problem like this, that's arguably more useful than a slightly higher accuracy number.</p>
    `
  },
  {
    id: "stressguard-architecture",
    title: "Building StressGuard: a multi-role stress detection web app",
    filename: "stressguard_architecture.md",
    date: "2026-06-28",
    tags: ["streamlit", "python", "sqlite", "project"],
    excerpt: "Notes from building StressGuard end-to-end — Admin, Doctor, and Patient roles, live notifications, PDF reports, and the bugs that came with all of it.",
    content: `
      <p style="text-align: justify;">StressGuard is a stress-detection web app with three roles — Admin, Doctor, and Patient — each with a different view into the same underlying data. Built with Streamlit for the UI, scikit-learn for the ML side, SQLite for storage, and ReportLab for generating PDF reports.</p>
      <h3>StressGuard: An Intelligent Healthcare & Stress Monitoring Platform</h3>
      <p style="text-align: justify;">Healthcare is becoming increasingly digital, yet many applications focus on only one aspect of patient care. StressGuard addresses this challenge by integrating machine learning, healthcare management, and wellness tracking into a single platform. Built using Streamlit, SQLite, and scikit-learn, it provides dedicated dashboards for patients, doctors, and administrators, enabling seamless collaboration while supporting informed healthcare decisions through ML-powered stress prediction.</p>
      <p style="text-align: justify;">The platform uses a Logistic Regression model trained on physiological and lifestyle indicators such as age, screen time, heart rate, respiratory rate, body temperature, blood oxygen, sleep duration, REM sleep, and lifestyle metrics to predict stress levels in real time. It also offers prediction history, probability scores, performance metrics, and visualizations to help users better understand their wellness trends.</p>
      <p style="text-align: justify;">Beyond stress prediction, StressGuard includes a complete healthcare workflow featuring role-based authentication, appointment scheduling, secure doctor-patient communication, wellness tracking, support ticket management, automated PDF report generation, and administrative analytics. Patients can monitor their stress, manage appointments, upload reports, and maintain wellness records, while doctors can review patient progress, create clinical notes, and coordinate care. Administrators oversee users, appointments, analytics, and system operations through a centralized dashboard.</p>
      <p style="text-align: justify;">Developed with a modular architecture, the project separates authentication, dashboards, machine learning, reporting, and database management into independent components, making the application scalable, maintainable, and easy to extend with future features.</p>
      <h3>A bug worth remembering</h3>
      <p style="text-align: justify;">One persistent issue: Streamlit tabs would silently switch back to the first tab whenever a badge count changed because the tab label itself included a dynamic number, and Streamlit treats a changed label as a new tab. The fix was to keep every tab label a static string and render the live count inside the tab body instead.</p>
    `
  },
  {
    id: "sih-2025",
    title: "Building ResQ: Our Smart India Hackathon 2025 (Internal Hackathon) Journey",
    filename: "Smart_India_Hackathon.md",
    date: "2025-09-25",
    tags: ["Hackathon", "Innovation", "Teamwork", "Problem-Solving"],
    excerpt: "Sharing my journey through Smart India Hackathon 2025, from brainstorming ideas and teamwork to building innovative solutions for real-world problems.",
    content: `
      <p style="text-align: justify;">Before getting started, I'd like to thank my teammates, Bhoomi Gupta (Team Leader), Diksha Joshi, Rajnandni Kumari, Advaita Singh and Gaurav Papnai, for making this journey so memorable. From brainstorming ideas to solving last-minute challenges, every discussion helped shape our project. I'm truly grateful to have worked with such an amazing team</p>
      <h3>My Smart India Hackathon 2025 (Internal Hackathon) Journey</h3>
      <p style="text-align: justify;">Participating in the institute-level selection round for Smart India Hackathon 2025</strong> was an incredible opportunity to collaborate, innovate, and solve a real-world problem. Our team, <strong>GEO-GENIUS</strong>, worked on <strong>Problem Statement ID 25139</strong> under the <strong>Disaster Management</strong> theme, where we proposed <strong>ResQ</strong>, an intelligent disaster management platform focused on improving emergency response, communication, and resource coordination during disasters.</p>
      <figure>
        <img src="assets/blog_images/1.png" alt="Project Overview">
        <figcaption>Overview of the ResQ project.</figcaption>
      </figure>
      <h3>The Problem</h3>
      <p style="text-align: justify;">Natural disasters such as floods, earthquakes, and landslides often disrupt communication infrastructure, making it difficult for people to receive emergency alerts, contact rescue teams, or locate nearby shelters. These delays can significantly impact rescue operations and resource distribution. Our objective was to design a platform capable of maintaining communication and providing intelligent assistance even when conventional networks fail.</p>
      <h3>Our Solution: ResQ</h3>
      <p style="text-align: justify;">ResQ is a multi-hazard disaster management platform that combines <strong>machine learning</strong>, <strong>offline communication</strong>, and <strong>real-time monitoring</strong> to assist civilians, emergency responders, and administrators during crisis situations. The platform focuses on delivering timely information and enabling efficient coordination throughout the disaster response lifecycle.</p>
      <p style="text-align: justify;">Its core capabilities include:</p>
      <ul>
        <li>Real-time disaster monitoring and emergency alerts</li>
        <li>Bluetooth Mesh &amp; LoRaWAN-based offline communication</li>
        <li>ML-powered disaster prediction and risk analysis</li>
        <li>Safe shelter navigation and rescue guidance</li>
        <li>Smart resource allocation and coordination</li>
        <li>Quick SOS emergency assistance</li>
      </ul>
      <figure>
        <img src="assets/blog_images/2.png" alt="Solution Architecture">
        <figcaption>Solution architecture highlighting the proposed approach, core features, and end-to-end disaster response workflow.</figcaption>
      </figure>
      <h3>System Workflow</h3>
      <p style="text-align: justify;">The application follows a role-based workflow designed for civilians, responders, and administrators. Civilians can receive alerts, request assistance, locate shelters, and communicate during emergencies. Responders gain access to live incident information, optimized rescue routes, and resource availability, while administrators oversee overall disaster operations through a centralized dashboard.</p>
      <figure>
        <img src="assets/blog_images/3.png" alt="Project Workflow">
        <figcaption>Project flow diagram and application workflow illustrating user interactions for administrators, responders, and civilians.</figcaption>
      </figure>
      <h3>Technology Stack</h3>
      <p style="text-align: justify;">To build a scalable and reliable solution, we proposed a modern technology stack comprising React.js, TensorFlow, Scikit-learn, OpenCV, Apache Kafka, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, and cloud platforms such as AWS and Azure. Each team member contributed according to their area of expertise, enabling effective collaboration throughout the project.</p>
      <figure>
        <img src="assets/blog_images/4.png" alt="Technology Stack">
        <figcaption>Technology stack and team composition showcasing the proposed system architecture and project contributors.</figcaption>
      </figure>
      <h3>Prototype Design</h3>
      <p style="text-align: justify;">We also designed a user-friendly interface for both web and mobile platforms. The prototype demonstrates role-based dashboards, interactive disaster maps, emergency alerts, rescue coordination, shelter navigation, and resource tracking. The design emphasizes accessibility and ease of use during high-pressure emergency situations.</p>
      <figure>
        <img src="assets/blog_images/5.png" alt="Prototype">
        <figcaption>Prototype designs and user interface layouts.</figcaption>
      </figure>
      <h3>Challenges and Learning</h3>
      <p style="text-align: justify;">Developing ResQ required addressing several real-world challenges, including unreliable communication networks, disaster prediction, secure data handling, resource optimization, and system scalability. Designing solutions for these challenges strengthened our understanding of system architecture, backend development, cloud technologies, and machine learning while highlighting the importance of teamwork and problem-solving.</p>
      <figure>
        <img src="assets/blog_images/6.png" alt="Challenges">
        <figcaption>Feasibility analysis, implementation challenges, proposed solutions, and the expected impact of the ResQ platform.</figcaption>
      </figure>
      <p style="text-align; justify">Participating in Smart India Hackathon 2025 (Internal Hackathon) was a rewarding experience that strengthened my technical, problem-solving, and teamwork skills. Working on ResQ gave our team the opportunity to design an innovative solution for a real-world disaster management challenge while learning from every stage of the development process.</p>
      <figure>
        <img src="assets/blog_images/SIH_Certificate.png" alt="Participation Certificate">
        <figcaption>Participation Certificate, SIH 2025 (Internal Hackathon).</figcaption>
      </figure>
    `
  },
  {
    id: "BSNL-Industrial-Training",
    title: "BSNL Industrial Training",
    filename: "BSNL_Industrial_Training.md",
    date: "2025-08-15",
    tags: ["networking", "telecommunication", "bsnl", "industrial-training"],
    excerpt: "A summary of my 4-week industrial training at BSNL, where I gained hands-on experience with telecommunication networks, optical fiber communication, broadband infrastructure, switching systems, and mobile communication technologies.",
    content: `
      <h3>My Industrial Training Experience at BSNL</h3>
      <p style="text-align: justify;">During my 4-week industrial training at BSNL, I gained practical exposure to the fundamentals of telecommunication and network infrastructure. The training provided valuable insight into how modern communication systems operate and how large-scale telecom networks are deployed and maintained.</p>
      <figure>
        <img src="assets/blog_images/BSNL_Certificate.jpeg" alt="Certificate">
        <figcaption>Certificate of completion</figcaption>
      </figure>
      <p style="text-align: justify;">Throughout the program, I explored key areas including telecommunication networks, switching systems, optical fiber communication (OFC), broadband infrastructure, and mobile communication technologies. I also developed a better understanding of network architecture, communication protocols, and the essential role networking technologies play in delivering reliable connectivity.</p>
      <p style="text-align: justify;">One of the most valuable aspects of the training was observing real-world telecom operations, from infrastructure deployment to network maintenance and service management. This experience strengthened my interest in computer networks and provided practical knowledge that complements my academic studies while giving me a deeper appreciation of the technologies that power modern communication.</p>
    `
  }
];