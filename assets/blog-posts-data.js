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
      <p>The MAGIC Gamma Telescope dataset is a classic binary classification problem: distinguish real gamma-ray signals from background hadron noise, using ten numeric features describing the shape of each detected shower. Simple on paper, useful for stress-testing a handful of algorithms against each other.</p>
      <h3>The lineup</h3>
      <p>I trained five models on the same preprocessed data: <code>KNeighborsClassifier</code>, <code>GaussianNB</code>, <code>LogisticRegression</code>, an SVM with an RBF kernel, and a small feed-forward neural network. Same train/test split, same scaling, so the comparison would actually mean something.</p>
      <h3>What tripped me up</h3>
      <ul>
        <li>Class imbalance skewed early accuracy numbers — precision/recall per class told a truer story than overall accuracy.</li>
        <li>KNN was sensitive to feature scaling in a way the tree-adjacent models weren't; forgetting to scale before fitting quietly wrecked its distance calculations.</li>
        <li>The neural network needed more epochs than I expected before validation loss stabilized.</li>
      </ul>
      <h3>Takeaway</h3>
      <p>SVM and the neural network came out ahead on F1-score, but logistic regression was the most honest about its confidence — its probability outputs were the best calibrated of the five. For a problem like this, that's arguably more useful than a slightly higher accuracy number.</p>
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
      <p>StressGuard is a stress-detection web app with three roles — Admin, Doctor, and Patient — each with a different view into the same underlying data. Built with Streamlit for the UI, scikit-learn for the ML side, SQLite for storage, and ReportLab for generating PDF reports.</p>
      <h3>StressGuard: An Intelligent Healthcare & Stress Monitoring Platform</h3>
      <p>Healthcare is becoming increasingly digital, yet many applications focus on only one aspect of patient care. StressGuard addresses this challenge by integrating machine learning, healthcare management, and wellness tracking into a single platform. Built using Streamlit, SQLite, and scikit-learn, it provides dedicated dashboards for patients, doctors, and administrators, enabling seamless collaboration while supporting informed healthcare decisions through ML-powered stress prediction.</p>
      <p>The platform uses a Logistic Regression model trained on physiological and lifestyle indicators such as age, screen time, heart rate, respiratory rate, body temperature, blood oxygen, sleep duration, REM sleep, and lifestyle metrics to predict stress levels in real time. It also offers prediction history, probability scores, performance metrics, and visualizations to help users better understand their wellness trends.</p>
      <p>Beyond stress prediction, StressGuard includes a complete healthcare workflow featuring role-based authentication, appointment scheduling, secure doctor-patient communication, wellness tracking, support ticket management, automated PDF report generation, and administrative analytics. Patients can monitor their stress, manage appointments, upload reports, and maintain wellness records, while doctors can review patient progress, create clinical notes, and coordinate care. Administrators oversee users, appointments, analytics, and system operations through a centralized dashboard.</p>
      <p>Developed with a modular architecture, the project separates authentication, dashboards, machine learning, reporting, and database management into independent components, making the application scalable, maintainable, and easy to extend with future features.</p>
      <h3>A bug worth remembering</h3>
      <p>One persistent issue: Streamlit tabs would silently switch back to the first tab whenever a badge count changed because the tab label itself included a dynamic number, and Streamlit treats a changed label as a new tab. The fix was to keep every tab label a static string and render the live count inside the tab body instead.</p>
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
      <p>During my 4-week industrial training at BSNL, I gained practical exposure to the fundamentals of telecommunication and network infrastructure. The training provided valuable insight into how modern communication systems operate and how large-scale telecom networks are deployed and maintained.</p>
      <p>Throughout the program, I explored key areas including telecommunication networks, switching systems, optical fiber communication (OFC), broadband infrastructure, and mobile communication technologies. I also developed a better understanding of network architecture, communication protocols, and the essential role networking technologies play in delivering reliable connectivity.</p>
      <p>One of the most valuable aspects of the training was observing real-world telecom operations, from infrastructure deployment to network maintenance and service management. This experience strengthened my interest in computer networks and provided practical knowledge that complements my academic studies while giving me a deeper appreciation of the technologies that power modern communication.</p>
    `
  }
];