// Prodigy Pathways - Main JavaScript File
// ==========================================

// Global variables
let currentUser = null;
let currentDomain = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizQuestions = [];
let selectedAnswer = null;
let quizSettings = {
  numberOfQuestions: null,
  difficulty: null,
};
let userPerformance = {};
let isGeneratingQuestions = false;

// Domain Mapping - Maps quiz domains to dashboard resource domains
const domainMapping = {
  // Technology & Programming
  'programming': 'programming',
  'web-development': 'programming',
  'mobile-development': 'programming',
  'game-development': 'programming',
  'software-engineering': 'programming',
  'devops': 'programming',
  'cybersecurity': 'programming',
  'blockchain': 'programming',
  
  // AI & Data Science
  'artificial-intelligence': 'ai',
  'machine-learning': 'ai',
  'data-science': 'data-science',
  'deep-learning': 'ai',
  'computer-vision': 'ai',
  'nlp': 'ai',
  'robotics': 'ai',
  
  // Business & Finance
  'business': 'business',
  'finance': 'finance',
  'accounting': 'finance',
  'economics': 'business',
  'entrepreneurship': 'business',
  
  // Design & Creative
  'fashion': 'fashion',
  'graphic-design': 'programming',
  'ui-ux': 'programming',
  
  // Healthcare
  'medicine': 'medicine',
  'nursing': 'medicine',
  'pharmacy': 'medicine',
  'healthcare': 'medicine',
  
  // Law & Social
  'law': 'law',
  'legal-studies': 'law',
  
  // Culinary
  'culinary': 'culinary',
  'culinary-arts': 'culinary',
  
  // Default fallback
  'default': 'programming'
};

// Function to map quiz domain to dashboard domain
function mapDomainToDashboard(quizDomain) {
  const normalized = quizDomain.toLowerCase().replace(/\s+/g, '-');
  return domainMapping[normalized] || domainMapping['default'];
}

// Function to redirect to domain dashboard
function goToDomainDashboard() {
  if (!currentDomain) {
    alert('Please complete a quiz first to access interview preparation!');
    return;
  }
  
  // Map the quiz domain to dashboard domain
  const dashboardDomain = mapDomainToDashboard(currentDomain);
  
  // Store domain selection in localStorage
  localStorage.setItem('selectedDomain', dashboardDomain);
  localStorage.setItem('currentUser', JSON.stringify({
    name: currentUser,
    domain: currentDomain
  }));
  
  // Redirect to domain dashboard
  window.location.href = 'domain-dashboard.html';
}


// Quiz questions database
const questionDatabase = {
  programming: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      topic: "Algorithms",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=binary+search+algorithm",
        website: "https://www.geeksforgeeks.org/binary-search/",
        course: "https://www.coursera.org/learn/algorithms-part1",
      },
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correct: 2,
      topic: "JavaScript Basics",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=javascript+data+types",
        website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
        course: "https://www.udemy.com/course/the-complete-javascript-course/",
      },
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Automated Program Interaction",
        "Application Process Integration",
      ],
      correct: 0,
      topic: "Web Development",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=what+is+api+programming",
        website: "https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces",
        course: "https://www.codecademy.com/learn/learn-api",
      },
    },
    {
      question: "Which Python data structure is ordered and changeable?",
      options: ["Tuple", "Set", "List", "Dictionary"],
      correct: 2,
      topic: "Python Data Structures",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=python+data+structures",
        website: "https://www.w3schools.com/python/python_lists.asp",
        course: "https://www.codecademy.com/learn/learn-python-3",
      },
    },
    {
      question: "What is the correct syntax for a for loop in Java?",
      options: [
        "for i in range(10):",
        "for (int i = 0; i < 10; i++)",
        "for i = 0 to 10",
        "foreach (i in 10)",
      ],
      correct: 1,
      topic: "Java Syntax",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=java+for+loop+tutorial",
        website: "https://www.w3schools.com/java/java_for_loop.asp",
        course: "https://www.codecademy.com/learn/learn-java",
      },
    },
  ],
  ai: [
    {
      question: "What is machine learning?",
      options: [
        "A programming language",
        "A subset of artificial intelligence that enables computers to learn without being explicitly programmed",
        "A type of database",
        "A web development framework",
      ],
      correct: 1,
      topic: "Machine Learning Basics",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=machine+learning+basics",
        website: "https://www.ibm.com/cloud/learn/machine-learning",
        course: "https://www.coursera.org/learn/machine-learning",
      },
    },
    {
      question: "What is a neural network inspired by?",
      options: ["Computer circuits", "The human brain", "Mathematical equations", "Network topology"],
      correct: 1,
      topic: "Neural Networks",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=neural+networks+explained",
        website: "https://www.investopedia.com/terms/n/neuralnetwork.asp",
        course: "https://www.deeplearning.ai/",
      },
    },
    {
      question: "In supervised learning, what is provided during training?",
      options: [
        "Only input data",
        "Only output data",
        "Both input data and correct answers (labels)",
        "Neither input nor output data",
      ],
      correct: 2,
      topic: "Supervised Learning",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=supervised+learning+explained",
        website: "https://www.geeksforgeeks.org/supervised-unsupervised-learning/",
        course: "https://www.udacity.com/course/machine-learning-nanodegree--nd009t",
      },
    },
    {
      question: "What does 'overfitting' mean in machine learning?",
      options: [
        "The model performs well on training data but poorly on new data",
        "The model uses too much memory",
        "The model trains too quickly",
        "The model has too few parameters",
      ],
      correct: 0,
      topic: "Model Training",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=overfitting+machine+learning",
        website: "https://www.ibm.com/cloud/learn/overfitting",
        course: "https://www.coursera.org/specializations/deep-learning",
      },
    },
    {
      question: "Which algorithm is commonly used for image recognition?",
      options: ["Linear Regression", "Decision Trees", "Convolutional Neural Networks", "K-Means"],
      correct: 2,
      topic: "Deep Learning Applications",
      difficulty: "hard",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=CNN+image+recognition",
        website: "https://www.tensorflow.org/tutorials/images/cnn",
        course: "https://www.fast.ai/",
      },
    },
  ],
  mathematics: [
    {
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      correct: 1,
      topic: "Calculus - Derivatives",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=derivative+of+x+squared",
        website: "https://www.khanacademy.org/math/calculus-1/cs1-derivatives",
        course: "https://www.coursera.org/learn/calculus1",
      },
    },
    {
      question: "What is the value of π (pi) to 2 decimal places?",
      options: ["3.14", "3.15", "3.13", "3.16"],
      correct: 0,
      topic: "Constants and Numbers",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=what+is+pi+mathematics",
        website: "https://www.mathsisfun.com/numbers/pi.html",
        course: "https://www.khanacademy.org/math/geometry",
      },
    },
    {
      question: "In a right triangle, what is the relationship between the sides?",
      options: [
        "a + b = c",
        "a² + b² = c²",
        "a × b = c",
        "a² × b² = c²",
      ],
      correct: 1,
      topic: "Geometry - Pythagorean Theorem",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=pythagorean+theorem+explained",
        website: "https://www.mathsisfun.com/pythagoras.html",
        course: "https://www.khanacademy.org/math/geometry",
      },
    },
    {
      question: "What is the integral of 2x?",
      options: ["x² + C", "2", "x + C", "x²"],
      correct: 0,
      topic: "Calculus - Integration",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=integral+of+2x",
        website: "https://www.khanacademy.org/math/calculus-1/cs1-integrals",
        course: "https://www.coursera.org/learn/calculus1",
      },
    },
    {
      question: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
      options: ["a + d - b - c", "ad - bc", "ac - bd", "a × d × b × c"],
      correct: 1,
      topic: "Linear Algebra - Determinants",
      difficulty: "hard",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=determinant+2x2+matrix",
        website: "https://www.mathsisfun.com/algebra/matrix-determinant.html",
        course: "https://www.khanacademy.org/math/linear-algebra",
      },
    },
  ],
  science: [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correct: 0,
      topic: "Chemistry - Basic Compounds",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=water+chemical+formula",
        website: "https://www.britannica.com/science/water",
        course: "https://www.khanacademy.org/science/chemistry",
      },
    },
    {
      question: "What force keeps planets in orbit around the sun?",
      options: ["Magnetic force", "Nuclear force", "Gravitational force", "Electric force"],
      correct: 2,
      topic: "Physics - Forces",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=gravity+planetary+orbits",
        website: "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-gravity-k4.html",
        course: "https://www.khanacademy.org/science/physics",
      },
    },
    {
      question: "Which organelle is known as the 'powerhouse of the cell'?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      correct: 1,
      topic: "Biology - Cell Structure",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=mitochondria+powerhouse+cell",
        website: "https://www.britannica.com/science/mitochondrion",
        course: "https://www.khanacademy.org/science/biology",
      },
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["300,000 km/s", "299,792,458 m/s", "186,282 miles/s", "All of the above"],
      correct: 3,
      topic: "Physics - Constants",
      difficulty: "medium",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=speed+of+light+physics",
        website: "https://www.britannica.com/science/speed-of-light",
        course: "https://www.coursera.org/learn/quantum-physics",
      },
    },
    {
      question: "What is the process by which plants convert sunlight into energy?",
      options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
      correct: 1,
      topic: "Biology - Plant Processes",
      difficulty: "easy",
      resources: {
        youtube: "https://www.youtube.com/results?search_query=photosynthesis+explained",
        website: "https://www.britannica.com/science/photosynthesis",
        course: "https://www.khanacademy.org/science/biology",
      },
    },
  ],
  
  fashion: [
    {
      question: "What is the term for a loose-fitting, knee-length garment worn in South Asia?",
      options: ["Kurta", "Kimono", "Caftan", "Poncho"],
      correct: 0,
      topic: "Fashion Basics",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "Which fashion house is known for the iconic interlocking 'CC' logo?",
      options: ["Gucci", "Chanel", "Prada", "Louis Vuitton"],
      correct: 1,
      topic: "Fashion Brands",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What does 'haute couture' literally mean in French?",
      options: ["High fashion", "High sewing", "Expensive clothes", "Custom made"],
      correct: 1,
      topic: "Fashion Terminology",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is the basic stitch used in hand sewing and embroidery?",
      options: ["Chain stitch", "Running stitch", "Cross stitch", "Blanket stitch"],
      correct: 1,
      topic: "Fashion Design",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "Which fabric is known as the 'queen of textiles'?",
      options: ["Cotton", "Wool", "Silk", "Linen"],
      correct: 2,
      topic: "Textiles",
      difficulty: "medium",
      resources: {}
    }
  ],
  
  business: [
    {
      question: "What does ROI stand for in business?",
      options: ["Return on Investment", "Rate of Interest", "Revenue over Income", "Risk of Investment"],
      correct: 0,
      topic: "Business Basics",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is a SWOT analysis used for?",
      options: ["Financial planning", "Strategic planning", "Product design", "Customer service"],
      correct: 1,
      topic: "Business Strategy",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What does B2B stand for?",
      options: ["Business to Business", "Back to Basics", "Business to Bank", "Brand to Brand"],
      correct: 0,
      topic: "Business Models",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is the difference between revenue and profit?",
      options: ["Revenue is income, profit is income minus expenses", "They are the same", "Profit comes before revenue", "Revenue is yearly, profit is monthly"],
      correct: 0,
      topic: "Finance",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is market segmentation?",
      options: ["Dividing customers into groups", "Dividing products into categories", "Dividing time periods", "Dividing revenue streams"],
      correct: 0,
      topic: "Marketing",
      difficulty: "medium",
      resources: {}
    }
  ],
  
  medicine: [
    {
      question: "What is the normal human body temperature in Celsius?",
      options: ["35°C", "36°C", "37°C", "38°C"],
      correct: 2,
      topic: "Medical Basics",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "Which organ produces insulin?",
      options: ["Liver", "Kidney", "Pancreas", "Spleen"],
      correct: 2,
      topic: "Anatomy",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What does CPR stand for?",
      options: ["Cardiac Pulmonary Revival", "Cardiopulmonary Resuscitation", "Cardiac Pressure Relief", "Cardio Pump Restoration"],
      correct: 1,
      topic: "Emergency Medicine",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Liver", "Brain", "Skin", "Heart"],
      correct: 2,
      topic: "Anatomy",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is hypertension?",
      options: ["Low blood pressure", "High blood pressure", "Irregular heartbeat", "High cholesterol"],
      correct: 1,
      topic: "Diseases",
      difficulty: "medium",
      resources: {}
    }
  ],
  
  finance: [
    {
      question: "What does APR stand for in finance?",
      options: ["Annual Percentage Rate", "Average Payment Rate", "Annual Premium Rate", "Approved Payment Record"],
      correct: 0,
      topic: "Finance Basics",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is a stock dividend?",
      options: ["Cash payment to shareholders", "Additional shares given to shareholders", "Interest on bonds", "Tax refund"],
      correct: 1,
      topic: "Investments",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is compound interest?",
      options: ["Interest on principal only", "Interest on principal and accumulated interest", "Fixed interest rate", "Simple interest"],
      correct: 1,
      topic: "Banking",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is a mutual fund?",
      options: ["A savings account", "A pooled investment vehicle", "A type of insurance", "A government bond"],
      correct: 1,
      topic: "Investments",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What does diversification mean in investing?",
      options: ["Buying one stock", "Spreading investments across different assets", "Selling all investments", "Keeping cash only"],
      correct: 1,
      topic: "Investment Strategy",
      difficulty: "medium",
      resources: {}
    }
  ],
  
  law: [
    {
      question: "What does 'pro bono' mean?",
      options: ["For money", "For free/public good", "For profit", "For business"],
      correct: 1,
      topic: "Legal Terminology",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is the burden of proof in a criminal case?",
      options: ["Preponderance of evidence", "Beyond reasonable doubt", "Clear and convincing", "Any evidence"],
      correct: 1,
      topic: "Criminal Law",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is a contract?",
      options: ["A verbal agreement", "A legally binding agreement", "A business plan", "A court order"],
      correct: 1,
      topic: "Contract Law",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What does 'habeas corpus' mean?",
      options: ["Have the body", "Know the crime", "Prove innocence", "Pay the fine"],
      correct: 0,
      topic: "Legal Terminology",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is intellectual property?",
      options: ["Physical property", "Smart investments", "Creations of the mind", "Legal documents"],
      correct: 2,
      topic: "IP Law",
      difficulty: "medium",
      resources: {}
    }
  ],
  
  culinary: [
    {
      question: "What are the five basic tastes?",
      options: ["Sweet, salty, sour, bitter, umami", "Sweet, spicy, sour, bitter, savory", "Sweet, salty, hot, cold, sour", "Sweet, salty, sour, tangy, rich"],
      correct: 0,
      topic: "Culinary Basics",
      difficulty: "medium",
      resources: {}
    },
    {
      question: "What is mise en place?",
      options: ["A cooking technique", "Preparing and organizing ingredients before cooking", "A type of sauce", "A French dessert"],
      correct: 1,
      topic: "Culinary Terminology",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "At what temperature does water boil at sea level?",
      options: ["90°C / 194°F", "100°C / 212°F", "110°C / 230°F", "120°C / 248°F"],
      correct: 1,
      topic: "Cooking Science",
      difficulty: "easy",
      resources: {}
    },
    {
      question: "What is the mother sauce in French cuisine?",
      options: ["Marinara", "Béchamel, Velouté, Espagnole, Hollandaise, Tomato", "Pesto", "Carbonara"],
      correct: 1,
      topic: "Culinary Arts",
      difficulty: "hard",
      resources: {}
    },
    {
      question: "What does 'al dente' mean?",
      options: ["Fully cooked", "Cooked but still firm to bite", "Undercooked", "Overcooked"],
      correct: 1,
      topic: "Cooking Terms",
      difficulty: "easy",
      resources: {}
    }
  ]
};

// Add more question templates for different domains
const questionTemplates = {
  programming: {
    easy: questionDatabase.programming.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.programming.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.programming.filter(q => q.difficulty === 'hard'),
  },
  ai: {
    easy: questionDatabase.ai.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.ai.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.ai.filter(q => q.difficulty === 'hard'),
  },
  mathematics: {
    easy: questionDatabase.mathematics.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.mathematics.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.mathematics.filter(q => q.difficulty === 'hard'),
  },
  science: {
    easy: questionDatabase.science.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.science.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.science.filter(q => q.difficulty === 'hard'),
  },
  fashion: {
    easy: questionDatabase.fashion.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.fashion.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.fashion.filter(q => q.difficulty === 'hard'),
  },
  business: {
    easy: questionDatabase.business.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.business.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.business.filter(q => q.difficulty === 'hard'),
  },
  medicine: {
    easy: questionDatabase.medicine.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.medicine.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.medicine.filter(q => q.difficulty === 'hard'),
  },
  finance: {
    easy: questionDatabase.finance.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.finance.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.finance.filter(q => q.difficulty === 'hard'),
  },
  law: {
    easy: questionDatabase.law.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.law.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.law.filter(q => q.difficulty === 'hard'),
  },
  culinary: {
    easy: questionDatabase.culinary.filter(q => q.difficulty === 'easy'),
    medium: questionDatabase.culinary.filter(q => q.difficulty === 'medium'),
    hard: questionDatabase.culinary.filter(q => q.difficulty === 'hard'),
  },
};

// Navigation functions
function showLanding() {
  hideAllPages();
  document.getElementById("landingPage").classList.remove("hidden");
}

function showLogin() {
  hideAllPages();
  document.getElementById("loginPage").classList.remove("hidden");
}

function showRegister() {
  hideAllPages();
  document.getElementById("registerPage").classList.remove("hidden");
}

function hideAllPages() {
  const pages = [
    "landingPage",
    "loginPage",
    "registerPage",
    "quizSetupPage",
    "loadingPage",
    "quizPage",
    "resultsPage",
  ];
  pages.forEach((page) => {
    document.getElementById(page).classList.add("hidden");
  });
}

function showQuizSetup() {
  hideAllPages();
  document.getElementById("quizSetupPage").classList.remove("hidden");
  document.getElementById(
    "setupWelcome"
  ).textContent = `Welcome ${currentUser}! Let's customize your ${currentDomain.replace(
    "-",
    " "
  )} quiz.`;
}

// Registration handler
async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value;
  const age = document.getElementById("registerAge").value;
  const email = document.getElementById("registerEmail").value;
  const phone = document.getElementById("registerPhone").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Check if Firebase is available and working
    if (window.firebase && window.firebase.auth && !isFirebaseBlocked()) {
      // Use Firebase Auth
      const userCredential =
        await window.firebase.createUserWithEmailAndPassword(
          window.firebase.auth,
          email,
          password
        );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        name: name,
        email: email,
        age: parseInt(age),
        phone: phone,
        domain: "",
        createdAt: new Date(),
        lastLogin: new Date(),
        totalQuizzes: 0,
        averageScore: 0,
        preferredDifficulty: "medium",
        learningStreak: 0,
      };

      await window.dbManager.createUser(userData);
    } else {
      // Fallback to localStorage
      const userData = {
        uid: "local_" + Date.now(),
        name: name,
        email: email,
        age: parseInt(age),
        phone: phone,
        domain: "",
        createdAt: new Date(),
        lastLogin: new Date(),
        totalQuizzes: 0,
        averageScore: 0,
        preferredDifficulty: "medium",
        learningStreak: 0,
      };

      // Store in localStorage
      localStorage.setItem("userData_" + email, JSON.stringify(userData));
      localStorage.setItem("userPassword_" + email, btoa(password)); // Simple encoding
    }

    alert("Registration successful! Please login to continue.");
    showLogin();
  } catch (error) {
    console.error("Registration error:", error);
    logFirebaseError(error);

    // Fallback to localStorage if Firebase fails
    const userData = {
      uid: "local_" + Date.now(),
      name: name,
      email: email,
      age: parseInt(age),
      phone: phone,
      domain: "",
      createdAt: new Date(),
      lastLogin: new Date(),
      totalQuizzes: 0,
      averageScore: 0,
      preferredDifficulty: "medium",
      learningStreak: 0,
    };

    localStorage.setItem("userData_" + email, JSON.stringify(userData));
    localStorage.setItem("userPassword_" + email, btoa(password));

    alert("Registration successful! (Using local storage)");
    showLogin();
  }
}

// Login handler
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginName").value; // Using email as login
  const password = document.getElementById("loginPassword").value;
  const domain = document.getElementById("loginDomain").value;

  try {
    // Check if Firebase is available and working
    if (window.firebase && window.firebase.auth && !isFirebaseBlocked()) {
      // Use Firebase Auth
      const userCredential = await window.firebase.signInWithEmailAndPassword(
        window.firebase.auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = await window.dbManager.getUser(user.uid);
      if (userData) {
        currentUser = userData.name;
        currentDomain = domain;

        await window.dbManager.updateUser(user.uid, { domain: domain });
        userPerformance = await window.dbManager.getUserQuizResults(
          user.uid,
          10
        );

        showQuizSetup();
      } else {
        alert("User data not found. Please register first.");
      }
    } else {
      // Fallback to localStorage
      const storedUserData = localStorage.getItem("userData_" + email);
      const storedPassword = localStorage.getItem("userPassword_" + email);

      if (storedUserData && storedPassword) {
        const userData = JSON.parse(storedUserData);
        const decodedPassword = atob(storedPassword);

        if (password === decodedPassword) {
          currentUser = userData.name;
          currentDomain = domain;

          // Load user performance history from localStorage
          const userKey = `${currentUser}_${domain}`;
          userPerformance = JSON.parse(localStorage.getItem(userKey) || "{}");

          showQuizSetup();
        } else {
          alert("Invalid password!");
        }
      } else {
        alert("User not found. Please register first.");
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    logFirebaseError(error);

    // Fallback to localStorage if Firebase fails
    const storedUserData = localStorage.getItem("userData_" + email);
    const storedPassword = localStorage.getItem("userPassword_" + email);

    if (storedUserData && storedPassword) {
      const userData = JSON.parse(storedUserData);
      const decodedPassword = atob(storedPassword);

      if (password === decodedPassword) {
        currentUser = userData.name;
        currentDomain = domain;

        const userKey = `${currentUser}_${domain}`;
        userPerformance = JSON.parse(localStorage.getItem(userKey) || "{}");

        showQuizSetup();
      } else {
        alert("Invalid password!");
      }
    } else {
      alert("User not found. Please register first.");
    }
  }
}

// Quiz setup functions
function setQuestionCount(count) {
  quizSettings.numberOfQuestions = count;

  // Update UI
  document.querySelectorAll(".question-count-btn").forEach((btn) => {
    btn.classList.remove("border-purple-500", "bg-purple-50");
    btn.classList.add("border-gray-300");
  });

  event.target
    .closest(".question-count-btn")
    .classList.remove("border-gray-300");
  event.target
    .closest(".question-count-btn")
    .classList.add("border-purple-500", "bg-purple-50");

  checkQuizReadiness();
}

function setDifficulty(level) {
  quizSettings.difficulty = level;

  // Update UI
  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.classList.remove(
      "border-green-500",
      "bg-green-50",
      "border-orange-500",
      "bg-orange-50",
      "border-red-500",
      "bg-red-50"
    );
    btn.classList.add("border-gray-300");
  });

  const colors = {
    easy: ["border-green-500", "bg-green-50"],
    medium: ["border-orange-500", "bg-orange-50"],
    hard: ["border-red-500", "bg-red-50"],
  };

  event.target.closest(".difficulty-btn").classList.remove("border-gray-300");
  event.target.closest(".difficulty-btn").classList.add(...colors[level]);

  checkQuizReadiness();
}

function checkQuizReadiness() {
  const startBtn = document.getElementById("startQuizBtn");
  const hasQuestionCount = quizSettings.numberOfQuestions !== null;
  const hasDifficulty = quizSettings.difficulty !== null;

  if (hasQuestionCount && hasDifficulty) {
    startBtn.disabled = false;
    startBtn.classList.remove("bg-gray-400", "cursor-not-allowed");
    startBtn.classList.add(
      "bg-purple-600",
      "hover:bg-purple-700",
      "transform",
      "hover:scale-105"
    );
  } else {
    startBtn.disabled = true;
    startBtn.classList.add("bg-gray-400", "cursor-not-allowed");
    startBtn.classList.remove(
      "bg-purple-600",
      "hover:bg-purple-700",
      "transform",
      "hover:scale-105"
    );
  }
}

// AI Question Generation
function generateQuizQuestions() {
  if (!quizSettings.numberOfQuestions || !quizSettings.difficulty) {
    alert(
      "⚠️ Please select both the number of questions and difficulty level before starting the quiz!"
    );
    return;
  }
  if (isGeneratingQuestions) return;

  isGeneratingQuestions = true;
  hideAllPages();
  document.getElementById("loadingPage").classList.remove("hidden");

  // Simulate AI generation with progress
  let progress = 0;
  const messages = [
    "Analyzing your domain expertise...",
    "Selecting appropriate difficulty level...",
    "Generating unique questions...",
    "Customizing for your learning style...",
    "Finalizing your personalized quiz...",
  ];

  const progressInterval = setInterval(() => {
    progress += 20;
    document.getElementById("loadingProgress").style.width = progress + "%";

    if (progress <= 100) {
      const messageIndex = Math.floor((progress - 1) / 20);
      if (messages[messageIndex]) {
        document.getElementById("loadingMessage").textContent =
          messages[messageIndex];
      }
    }

    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        generateAIQuestions();
        isGeneratingQuestions = false;
        startQuiz();
      }, 1000);
    }
  }, 800);
}

async function generateAIQuestions() {
  try {
    console.log(`Generating AI questions for domain: ${currentDomain}, difficulty: ${quizSettings.difficulty}`);
    
    // Create default questions immediately to ensure we always have something
    const defaultQuestions = [];
    for (let i = 0; i < quizSettings.numberOfQuestions; i++) {
      defaultQuestions.push({
        question: `Question ${i+1}: Loading...`,
        options: ["Loading...", "Please wait...", "Generating questions...", "Almost ready..."],
        correct: 0,
        topic: currentDomain,
        difficulty: quizSettings.difficulty,
        resources: {}
      });
    }
    
    // Set default questions first so we always have something
    quizQuestions = defaultQuestions;
    console.log('Default questions created as backup:', quizQuestions.length);
    
    // Prefer Firebase if available; otherwise silently fallback
    let firebaseQuestions = [];
    if (
      window.dbManager &&
      typeof window.dbManager.getQuestions === "function"
    ) {
      firebaseQuestions = await window.dbManager.getQuestions(
        currentDomain,
        quizSettings.difficulty,
        quizSettings.numberOfQuestions
      );
    }

    if (firebaseQuestions && firebaseQuestions.length > 0) {
      console.log(`Using ${firebaseQuestions.length} questions from Firebase`);
      quizQuestions = firebaseQuestions;
    } else {
      // Generate AI-enhanced questions with domain-specific content
      const baseQuestions = getQuestionsForDomain(
        currentDomain,
        quizSettings.difficulty
      );
      
      console.log(`Base questions found: ${baseQuestions.length}`);
      
      if (baseQuestions.length === 0) {
        console.warn(`No questions found for domain ${currentDomain}, difficulty ${quizSettings.difficulty}`);
        // Fallback to any difficulty for the domain
        const fallbackQuestions = getQuestionsForDomain(currentDomain, null);
        if (fallbackQuestions.length > 0) {
          console.log(`Using ${fallbackQuestions.length} fallback questions`);
          const shuffled = fallbackQuestions.sort(() => 0.5 - Math.random());
          quizQuestions = shuffled.slice(0, quizSettings.numberOfQuestions);
        } else {
          // Ultimate fallback to programming questions
          console.log('Using programming questions as ultimate fallback');
          const programmingQuestions = questionDatabase.programming || [];
          
          if (programmingQuestions.length > 0) {
            const shuffled = programmingQuestions.sort(() => 0.5 - Math.random());
            quizQuestions = shuffled.slice(0, quizSettings.numberOfQuestions);
          }
          // If no programming questions, we already have default questions set
        }
      } else {
        // Enhance questions with AI-generated variations
        const enhancedQuestions = await enhanceQuestionsWithAI(baseQuestions);
        const shuffled = enhancedQuestions.sort(() => 0.5 - Math.random());
        quizQuestions = shuffled.slice(0, quizSettings.numberOfQuestions);
      }
    }

    // Ensure each question has required properties
    quizQuestions.forEach((q, index) => {
      q.id = q.id || `${currentUser}_${Date.now()}_${index}`;
      q.difficulty = q.difficulty || quizSettings.difficulty;
      q.domain = q.domain || currentDomain;
    });
    
    console.log(`Final quiz questions: ${quizQuestions.length}`);
    console.log('Questions:', quizQuestions.map(q => q.question));
    
  } catch (error) {
    console.error("Error generating questions:", error);
    // Fallback to local questions
    const domainQuestions = getQuestionsForDomain(
      currentDomain,
      quizSettings.difficulty
    );
    const shuffled = domainQuestions.sort(() => 0.5 - Math.random());
    quizQuestions = shuffled.slice(0, quizSettings.numberOfQuestions);
  }
}

// AI Question Generation System - Generate completely new questions for each domain
async function enhanceQuestionsWithAI(baseQuestions) {
  console.log(`🤖 Generating AI questions for ${currentDomain} domain...`);
  
  // Generate completely new questions using AI algorithms
  const aiGeneratedQuestions = await generateDomainSpecificQuestions(
    currentDomain, 
    quizSettings.difficulty, 
    quizSettings.numberOfQuestions
  );
  
  // Combine base questions with AI-generated ones
  const allQuestions = [...baseQuestions, ...aiGeneratedQuestions];
  
  // Create additional variations for more diversity
  const enhancedQuestions = [];
  const usedQuestions = new Set();
  
  for (const question of allQuestions) {
    // Avoid duplicate questions
    const questionKey = question.question.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!usedQuestions.has(questionKey)) {
      enhancedQuestions.push(question);
      usedQuestions.add(questionKey);
      
      // Generate contextual variations
      if (enhancedQuestions.length < quizSettings.numberOfQuestions * 3) {
        const variations = await generateQuestionVariations(question);
        variations.forEach(variant => {
          const variantKey = variant.question.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (!usedQuestions.has(variantKey) && enhancedQuestions.length < quizSettings.numberOfQuestions * 4) {
            enhancedQuestions.push(variant);
            usedQuestions.add(variantKey);
          }
        });
      }
    }
  }
  
  console.log(`🎯 Generated ${enhancedQuestions.length} total questions for ${currentDomain}`);
  return enhancedQuestions;
}

// Generate completely new domain-specific questions using AI
async function generateDomainSpecificQuestions(domain, difficulty, count) {
  console.log(`🔥 AI generating ${count} new ${difficulty} ${domain} questions...`);
  
  // Map domains to our supported generators
  const domainMapping = {
    'game-development': 'programming',
    'web-development': 'programming',
    'mobile-development': 'programming',
    'software-engineering': 'programming',
    'devops': 'programming',
    'cybersecurity': 'programming',
    'blockchain': 'programming',
    'machine-learning': 'ai',
    'data-science': 'ai',
    'deep-learning': 'ai',
    'computer-vision': 'ai',
    'nlp': 'ai',
    'robotics': 'ai',
    'physics': 'science',
    'chemistry': 'science',
    'biology': 'science',
    'environmental-science': 'science',
    'medicine': 'science',
    'nursing': 'science',
    'pharmacy': 'science',
    'psychology': 'science'
  };
  
  const mappedDomain = domainMapping[domain] || domain;
  console.log(`AI generation: ${domain} -> ${mappedDomain}`);
  
  const aiQuestions = [];
  const domainGenerators = {
    programming: generateProgrammingQuestions,
    ai: generateAIModuleQuestions,
    mathematics: generateMathQuestions,
    science: generateScienceQuestions
  };
  
  const generator = domainGenerators[mappedDomain] || domainGenerators.programming;
  
  for (let i = 0; i < count * 2; i++) { // Generate more than needed for variety
    try {
      const newQuestion = await generator(difficulty, i);
      if (newQuestion) {
        aiQuestions.push(newQuestion);
      }
    } catch (error) {
      console.warn(`Failed to generate question ${i}:`, error);
    }
  }
  
  return aiQuestions;
}

// AI Programming Question Generator
async function generateProgrammingQuestions(difficulty, index) {
  const concepts = {
    easy: ['variables', 'functions', 'loops', 'arrays', 'objects', 'strings', 'conditionals'],
    medium: ['algorithms', 'data structures', 'APIs', 'databases', 'frameworks', 'async programming'],
    hard: ['system design', 'optimization', 'security', 'scalability', 'architecture patterns']
  };
  
  const technologies = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML/CSS'];
  const concept = concepts[difficulty][index % concepts[difficulty].length];
  const tech = technologies[index % technologies.length];
  
  return generateQuestionWithAI('programming', concept, tech, difficulty, index);
}

// AI Artificial Intelligence Question Generator
async function generateAIModuleQuestions(difficulty, index) {
  const concepts = {
    easy: ['machine learning basics', 'neural networks', 'supervised learning', 'data preprocessing'],
    medium: ['deep learning', 'natural language processing', 'computer vision', 'model evaluation'],
    hard: ['reinforcement learning', 'generative models', 'AI ethics', 'model optimization']
  };
  
  const applications = ['healthcare', 'autonomous vehicles', 'recommendation systems', 'chatbots', 'image recognition'];
  const concept = concepts[difficulty][index % concepts[difficulty].length];
  const application = applications[index % applications.length];
  
  return generateQuestionWithAI('ai', concept, application, difficulty, index);
}

// AI Mathematics Question Generator
async function generateMathQuestions(difficulty, index) {
  const concepts = {
    easy: ['arithmetic', 'basic algebra', 'geometry fundamentals', 'fractions', 'percentages'],
    medium: ['calculus', 'trigonometry', 'linear algebra', 'statistics', 'probability'],
    hard: ['differential equations', 'complex analysis', 'abstract algebra', 'topology']
  };
  
  const applications = ['physics', 'engineering', 'economics', 'computer graphics', 'cryptography'];
  const concept = concepts[difficulty][index % concepts[difficulty].length];
  const application = applications[index % applications.length];
  
  return generateQuestionWithAI('mathematics', concept, application, difficulty, index);
}

// AI Science Question Generator
async function generateScienceQuestions(difficulty, index) {
  const concepts = {
    easy: ['basic chemistry', 'physics fundamentals', 'biology basics', 'earth science'],
    medium: ['organic chemistry', 'thermodynamics', 'genetics', 'environmental science'],
    hard: ['quantum physics', 'biochemistry', 'molecular biology', 'astrophysics']
  };
  
  const fields = ['medicine', 'environmental protection', 'space exploration', 'biotechnology'];
  const concept = concepts[difficulty][index % concepts[difficulty].length];
  const field = fields[index % fields.length];
  
  return generateQuestionWithAI('science', concept, field, difficulty, index);
}

// Core AI Question Generation Engine
async function generateQuestionWithAI(domain, concept, context, difficulty, index) {
  console.log(`🧠 Generating ${difficulty} question about ${concept} in ${context} for ${domain}...`);
  
  const questionTemplates = await getAIQuestionTemplates(domain, difficulty);
  const template = questionTemplates[index % questionTemplates.length];
  
  // Generate question using AI patterns
  const question = await applyAITemplate(template, concept, context, difficulty, domain);
  
  return {
    id: `ai_${domain}_${Date.now()}_${index}`,
    question: question.text,
    options: question.options,
    correct: question.correct,
    topic: `${concept} in ${context}`,
    difficulty: difficulty,
    domain: domain,
    generated: true,
    timestamp: new Date().toISOString(),
    resources: generateDomainResources(domain, concept, context)
  };
}

// AI Question Templates for each domain
async function getAIQuestionTemplates(domain, difficulty) {
  const templates = {
    programming: {
      easy: [
        { pattern: 'basic_syntax', type: 'multiple_choice' },
        { pattern: 'concept_definition', type: 'multiple_choice' },
        { pattern: 'simple_problem', type: 'multiple_choice' },
        { pattern: 'tool_identification', type: 'multiple_choice' }
      ],
      medium: [
        { pattern: 'algorithm_analysis', type: 'multiple_choice' },
        { pattern: 'implementation_choice', type: 'multiple_choice' },
        { pattern: 'debugging_scenario', type: 'multiple_choice' },
        { pattern: 'best_practices', type: 'multiple_choice' }
      ],
      hard: [
        { pattern: 'system_design', type: 'multiple_choice' },
        { pattern: 'optimization_problem', type: 'multiple_choice' },
        { pattern: 'architecture_decision', type: 'multiple_choice' },
        { pattern: 'performance_analysis', type: 'multiple_choice' }
      ]
    },
    ai: {
      easy: [
        { pattern: 'concept_definition', type: 'multiple_choice' },
        { pattern: 'application_identification', type: 'multiple_choice' },
        { pattern: 'basic_algorithm', type: 'multiple_choice' },
        { pattern: 'terminology', type: 'multiple_choice' }
      ],
      medium: [
        { pattern: 'model_comparison', type: 'multiple_choice' },
        { pattern: 'implementation_details', type: 'multiple_choice' },
        { pattern: 'evaluation_metrics', type: 'multiple_choice' },
        { pattern: 'practical_application', type: 'multiple_choice' }
      ],
      hard: [
        { pattern: 'advanced_concepts', type: 'multiple_choice' },
        { pattern: 'ethical_considerations', type: 'multiple_choice' },
        { pattern: 'research_frontier', type: 'multiple_choice' },
        { pattern: 'complex_scenarios', type: 'multiple_choice' }
      ]
    },
    mathematics: {
      easy: [
        { pattern: 'basic_calculation', type: 'multiple_choice' },
        { pattern: 'formula_identification', type: 'multiple_choice' },
        { pattern: 'simple_proof', type: 'multiple_choice' },
        { pattern: 'concept_recognition', type: 'multiple_choice' }
      ],
      medium: [
        { pattern: 'problem_solving', type: 'multiple_choice' },
        { pattern: 'theorem_application', type: 'multiple_choice' },
        { pattern: 'method_selection', type: 'multiple_choice' },
        { pattern: 'analysis_technique', type: 'multiple_choice' }
      ],
      hard: [
        { pattern: 'advanced_proof', type: 'multiple_choice' },
        { pattern: 'complex_analysis', type: 'multiple_choice' },
        { pattern: 'research_problem', type: 'multiple_choice' },
        { pattern: 'interdisciplinary', type: 'multiple_choice' }
      ]
    },
    science: {
      easy: [
        { pattern: 'fact_recall', type: 'multiple_choice' },
        { pattern: 'process_identification', type: 'multiple_choice' },
        { pattern: 'basic_experiment', type: 'multiple_choice' },
        { pattern: 'classification', type: 'multiple_choice' }
      ],
      medium: [
        { pattern: 'mechanism_explanation', type: 'multiple_choice' },
        { pattern: 'experimental_design', type: 'multiple_choice' },
        { pattern: 'data_interpretation', type: 'multiple_choice' },
        { pattern: 'hypothesis_testing', type: 'multiple_choice' }
      ],
      hard: [
        { pattern: 'advanced_research', type: 'multiple_choice' },
        { pattern: 'complex_interactions', type: 'multiple_choice' },
        { pattern: 'cutting_edge', type: 'multiple_choice' },
        { pattern: 'interdisciplinary', type: 'multiple_choice' }
      ]
    }
  };
  
  return templates[domain]?.[difficulty] || templates.programming.easy;
}

// Apply AI template to generate actual questions
async function applyAITemplate(template, concept, context, difficulty, domain) {
  const generators = {
    concept_definition: () => generateConceptDefinitionQuestion(concept, context, domain),
    basic_syntax: () => generateSyntaxQuestion(concept, context, domain),
    algorithm_analysis: () => generateAlgorithmQuestion(concept, context, domain),
    application_identification: () => generateApplicationQuestion(concept, context, domain),
    problem_solving: () => generateProblemSolvingQuestion(concept, context, domain),
    fact_recall: () => generateFactRecallQuestion(concept, context, domain),
    implementation_choice: () => generateImplementationQuestion(concept, context, domain),
    system_design: () => generateSystemDesignQuestion(concept, context, domain),
    model_comparison: () => generateModelComparisonQuestion(concept, context, domain),
    experimental_design: () => generateExperimentalQuestion(concept, context, domain)
  };
  
  const generator = generators[template.pattern] || generators.concept_definition;
  return await generator();
}

// Specific AI question generators
function generateConceptDefinitionQuestion(concept, context, domain) {
  const questions = {
    programming: [
      `What is ${concept} in ${context}?`,
      `Which statement best describes ${concept}?`,
      `How is ${concept} implemented in ${context}?`,
      `What role does ${concept} play in ${context}?`
    ],
    ai: [
      `What is ${concept} in the context of ${context}?`,
      `How does ${concept} work in ${context} applications?`,
      `Which technique is central to ${concept}?`,
      `What problem does ${concept} solve in ${context}?`
    ],
    mathematics: [
      `What is the definition of ${concept} in ${context}?`,
      `How is ${concept} applied in ${context}?`,
      `Which property characterizes ${concept}?`,
      `What is the significance of ${concept} in ${context}?`
    ],
    science: [
      `What is ${concept} in ${context}?`,
      `How does ${concept} function in ${context}?`,
      `Which process involves ${concept}?`,
      `What role does ${concept} play in ${context}?`
    ]
  };
  
  const domainQuestions = questions[domain] || questions.programming;
  const questionText = domainQuestions[Math.floor(Math.random() * domainQuestions.length)];
  
  return generateAnswerOptions(questionText, concept, context, domain);
}

// Generate answer options with one correct answer
function generateAnswerOptions(questionText, concept, context, domain) {
  const correctAnswers = {
    programming: [
      `A programming technique for ${concept}`,
      `A method used in ${context} development`,
      `An approach to implement ${concept}`,
      `A best practice for ${concept} in ${context}`
    ],
    ai: [
      `A machine learning approach for ${concept}`,
      `An AI technique used in ${context}`,
      `A method to improve ${concept} performance`,
      `An algorithm designed for ${concept} tasks`
    ],
    mathematics: [
      `A mathematical concept related to ${concept}`,
      `A formula used in ${context}`,
      `A theorem about ${concept}`,
      `A method for solving ${concept} problems`
    ],
    science: [
      `A scientific process involving ${concept}`,
      `A phenomenon observed in ${context}`,
      `A mechanism for ${concept}`,
      `A principle governing ${concept} in ${context}`
    ]
  };
  
  const wrongAnswers = [
    `An unrelated concept`,
    `A deprecated approach`,
    `A common misconception`,
    `An outdated method`
  ];
  
  const domainCorrect = correctAnswers[domain] || correctAnswers.programming;
  const correctAnswer = domainCorrect[Math.floor(Math.random() * domainCorrect.length)];
  
  const options = [correctAnswer];
  const shuffledWrong = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
  options.push(...shuffledWrong);
  
  // Shuffle all options
  const shuffledOptions = options.sort(() => 0.5 - Math.random());
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    text: questionText,
    options: shuffledOptions,
    correct: correctIndex
  };
}

// Generate domain-specific learning resources
function generateDomainResources(domain, concept, context) {
  const baseUrls = {
    programming: {
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(concept + ' ' + context + ' programming tutorial')}`,
      website: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(concept)}`,
      course: `https://www.codecademy.com/catalog`
    },
    ai: {
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(concept + ' ' + context + ' machine learning')}`,
      website: `https://paperswithcode.com/search?q=${encodeURIComponent(concept)}`,
      course: `https://www.coursera.org/search?query=${encodeURIComponent(concept + ' AI')}`
    },
    mathematics: {
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(concept + ' ' + context + ' mathematics')}`,
      website: `https://www.khanacademy.org/search?search_again=1&page_search_query=${encodeURIComponent(concept)}`,
      course: `https://www.edx.org/search?q=${encodeURIComponent(concept + ' mathematics')}`
    },
    science: {
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(concept + ' ' + context + ' science')}`,
      website: `https://www.britannica.com/search?query=${encodeURIComponent(concept)}`,
      course: `https://www.coursera.org/search?query=${encodeURIComponent(concept + ' science')}`
    }
  };
  
  return baseUrls[domain] || baseUrls.programming;
}

// Generate contextual question variations
async function generateQuestionVariations(originalQuestion) {
  const variations = [];
  const contexts = ['practical', 'theoretical', 'advanced', 'beginner-friendly'];
  
  for (let i = 0; i < 2; i++) {
    const context = contexts[i % contexts.length];
    const variation = await createContextualVariation(originalQuestion, context);
    if (variation) {
      variations.push(variation);
    }
  }
  
  return variations;
}

// Create contextual variations of questions
async function createContextualVariation(originalQuestion, context) {
  const contextPrefixes = {
    practical: 'In a real-world scenario, ',
    theoretical: 'From a theoretical standpoint, ',
    advanced: 'At an advanced level, ',
    'beginner-friendly': 'For beginners, '
  };
  
  const prefix = contextPrefixes[context] || '';
  const baseQuestion = originalQuestion.question.toLowerCase();
  const newQuestion = `${prefix}${baseQuestion}`;
  
  return {
    ...originalQuestion,
    id: `variation_${originalQuestion.id}_${context}_${Date.now()}`,
    question: newQuestion.charAt(0).toUpperCase() + newQuestion.slice(1),
    topic: `${originalQuestion.topic} (${context})`,
    generated: true,
    variant: context
  };
}

// Missing AI question generation functions (fallback implementations)
function generateSyntaxQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateAlgorithmQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateApplicationQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateProblemSolvingQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateFactRecallQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateImplementationQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateSystemDesignQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateModelComparisonQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function generateExperimentalQuestion(concept, context, domain) {
  return generateConceptDefinitionQuestion(concept, context, domain);
}

function getQuestionsForDomain(domain, difficulty) {
  console.log(`Getting questions for domain: ${domain}, difficulty: ${difficulty}`);
  
  // Map unsupported domains to supported ones
  const domainMapping = {
    'game-development': 'programming',
    'web-development': 'programming',
    'mobile-development': 'programming',
    'software-engineering': 'programming',
    'devops': 'programming',
    'cybersecurity': 'programming',
    'blockchain': 'programming',
    'machine-learning': 'ai',
    'data-science': 'ai',
    'deep-learning': 'ai',
    'computer-vision': 'ai',
    'nlp': 'ai',
    'robotics': 'ai',
    'physics': 'science',
    'chemistry': 'science',
    'biology': 'science',
    'environmental-science': 'science',
    'medicine': 'science',
    'nursing': 'science',
    'pharmacy': 'science',
    'psychology': 'science'
  };
  
  // Map domain if necessary
  const mappedDomain = domainMapping[domain] || domain;
  console.log(`Mapped ${domain} -> ${mappedDomain}`);
  
  // First, try to get questions from templates
  if (questionTemplates[mappedDomain] && questionTemplates[mappedDomain][difficulty]) {
    const questions = questionTemplates[mappedDomain][difficulty];
    console.log(`Found ${questions.length} questions from templates`);
    return questions;
  }
  
  // If no specific difficulty, get all questions for that domain
  if (questionDatabase[mappedDomain]) {
    const allQuestions = questionDatabase[mappedDomain];
    if (difficulty) {
      const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
      console.log(`Found ${filteredQuestions.length} filtered questions`);
      return filteredQuestions;
    }
    console.log(`Found ${allQuestions.length} questions for domain`);
    return allQuestions;
  }
  
  // Fallback to programming questions if domain not found
  console.log('Falling back to programming questions');
  return questionDatabase.programming || [];
}

// Quiz functions
function startQuiz() {
  hideAllPages();
  document.getElementById("quizPage").classList.remove("hidden");

  // Check if we have questions, if not create emergency defaults
  if (!quizQuestions || quizQuestions.length === 0) {
    console.error('No questions available at quiz start! Creating emergency defaults.');
    quizQuestions = [];
    for (let i = 0; i < quizSettings.numberOfQuestions || 5; i++) {
      quizQuestions.push({
        question: `Question ${i+1}: Loading content...`,
        options: ["Loading...", "Please wait...", "Generating questions...", "Almost ready..."],
        correct: 0,
        topic: currentDomain || "General",
        difficulty: quizSettings?.difficulty || "medium",
        resources: {}
      });
    }
  }

  // Debug: Log the questions being used
  console.log(`Starting quiz for domain: ${currentDomain}`);
  console.log(`Using ${quizQuestions.length} questions:`);
  quizQuestions.forEach((q, index) => {
    console.log(`${index + 1}. ${q.question} (Topic: ${q.topic})`);
  });
  
  currentQuestionIndex = 0;
  userAnswers = [];
  selectedAnswer = null;

  document.getElementById(
    "userWelcome"
  ).textContent = `Welcome back, ${currentUser}!`;
  document.getElementById("quizTitle").textContent = `${currentDomain
    .replace("-", " ")
    .toUpperCase()} Assessment`;

  loadQuestion();
}

function loadQuestion() {
  console.log(`Loading question ${currentQuestionIndex + 1}`);
  console.log(`Total questions available: ${quizQuestions?.length || 0}`);
  
  // Check if questions exist
  if (!quizQuestions || quizQuestions.length === 0) {
    console.error('No questions available!');
    document.getElementById("questionText").textContent = "No questions available. Please try again.";
    return;
  }
  
  // Check if current question index is valid
  if (currentQuestionIndex >= quizQuestions.length) {
    console.error(`Invalid question index: ${currentQuestionIndex}`);
    document.getElementById("questionText").textContent = "Question not found. Please try again.";
    return;
  }
  
  const question = quizQuestions[currentQuestionIndex];
  
  // Validate question structure
  if (!question || !question.question) {
    console.error('Invalid question structure:', question);
    document.getElementById("questionText").textContent = "Invalid question data. Please try again.";
    return;
  }
  
  console.log(`Loading question: "${question.question}"`);
  console.log('Question options:', question.options);
  
  const quizCard = document.getElementById("quizCard");
  if (quizCard) {
    quizCard.classList.remove("slide-in-right");
    void quizCard.offsetWidth;
    quizCard.classList.add("slide-in-right");
  }

  // Set question text
  const questionTextElement = document.getElementById("questionText");
  if (questionTextElement) {
    questionTextElement.textContent = question.question;
  }

  // Clear and populate options
  const optionsContainer = document.getElementById("optionsContainer");
  if (optionsContainer) {
    optionsContainer.innerHTML = "";
    
    // Ensure options exist, create default if not
    const options = Array.isArray(question.options) && question.options.length > 0 
      ? question.options 
      : ["Option A", "Option B", "Option C", "Option D"];
    
    console.log('Using options:', options);

    options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className =
        "cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-300";
      optionDiv.innerHTML = `
              <label class="cursor-pointer flex items-center">
                  <input type="radio" name="answer" value="${index}" class="mr-3 text-purple-600">
                  <span>${option}</span>
              </label>
          `;
      optionDiv.addEventListener("click", () => selectOption(index, optionDiv));
      optionsContainer.appendChild(optionDiv);
    });
  }

  // Update progress bar
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
  
  // Update question counter
  const questionCounter = document.getElementById("questionCounter");
  if (questionCounter) {
    questionCounter.textContent = `${
      currentQuestionIndex + 1
    } of ${quizSettings.numberOfQuestions}`;
  }

  // Update navigation buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  if (prevBtn) {
    prevBtn.disabled = currentQuestionIndex === 0;
  }
  
  if (nextBtn) {
    nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next";
  }

  selectedAnswer = null;
  console.log(`Question loaded successfully`);
}

function selectOption(index, element) {
  document.querySelectorAll("#optionsContainer > div").forEach((div) => {
    div.classList.remove("border-purple-500", "bg-purple-50");
    div.classList.add("border-gray-200");
  });

  element.classList.remove("border-gray-200");
  element.classList.add("border-purple-500", "bg-purple-50");

  selectedAnswer = index;
}

function nextQuestion() {
  if (selectedAnswer === null) {
    alert("Please select an answer before proceeding.");
    return;
  }

  userAnswers[currentQuestionIndex] = selectedAnswer;

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();

    if (userAnswers[currentQuestionIndex] !== undefined) {
      selectedAnswer = userAnswers[currentQuestionIndex];
      const options = document.querySelectorAll("#optionsContainer > div");
      selectOption(selectedAnswer, options[selectedAnswer]);
    }
  }
}

function showResults() {
  hideAllPages();
  document.getElementById("resultsPage").classList.remove("hidden");

  let correctAnswers = 0;
  const wrongTopics = [];
  const topicPerformance = {};

  quizQuestions.forEach((question, index) => {
    const isCorrect = userAnswers[index] === question.correct;

    if (isCorrect) {
      correctAnswers++;
    } else {
      wrongTopics.push(question);
    }

    if (!topicPerformance[question.topic]) {
      topicPerformance[question.topic] = { correct: 0, total: 0 };
    }
    topicPerformance[question.topic].total++;
    if (isCorrect) topicPerformance[question.topic].correct++;
  });

  const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);

  document.getElementById(
    "finalScore"
  ).textContent = `${correctAnswers}/${quizQuestions.length}`;
  document.getElementById("totalQuestions").textContent =
    quizSettings.numberOfQuestions;
  document.getElementById("quizDifficulty").textContent =
    quizSettings.difficulty.charAt(0).toUpperCase() +
    quizSettings.difficulty.slice(1);
  document.getElementById("quizDomain").textContent = currentDomain
    .replace("-", " ")
    .toUpperCase();

  let performanceMessage = "";
  if (percentage >= 90)
    performanceMessage = "Excellent! Outstanding performance! 🌟";
  else if (percentage >= 80)
    performanceMessage = "Great job! Strong understanding! 👍";
  else if (percentage >= 70)
    performanceMessage = "Good work! Room for improvement! 📈";
  else if (percentage >= 60)
    performanceMessage = "Fair performance. Keep practicing! 💪";
  else performanceMessage = "Needs improvement. Focus on fundamentals! 📚";

  document.getElementById(
    "scorePercentage"
  ).textContent = `${percentage}% - ${performanceMessage}`;

  generatePerformanceChart(topicPerformance);
  generateWeakAreasAnalysis(wrongTopics, topicPerformance);
  generateDetailedSuggestions(wrongTopics, topicPerformance);
  saveUserPerformance(correctAnswers, quizQuestions.length, percentage);
}

function generatePerformanceChart(topicPerformance) {
  const chartContainer = document.getElementById("performanceChart");
  chartContainer.innerHTML = "";

  Object.entries(topicPerformance).forEach(([topic, performance]) => {
    const percentage = Math.round(
      (performance.correct / performance.total) * 100
    );
    const chartItem = document.createElement("div");
    chartItem.className = "mb-3";

    let colorClass = "bg-red-500";
    if (percentage >= 80) colorClass = "bg-green-500";
    else if (percentage >= 60) colorClass = "bg-yellow-500";

    chartItem.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">${topic}</span>
                <span class="text-sm text-gray-600">${performance.correct}/${performance.total} (${percentage}%)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="${colorClass} h-2 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
            </div>
        `;
    chartContainer.appendChild(chartItem);
  });
}

function generateWeakAreasAnalysis(wrongTopics, topicPerformance) {
  const weakAreasContainer = document.getElementById("weakAreas");
  weakAreasContainer.innerHTML = "";

  const weakTopics = Object.entries(topicPerformance)
    .filter(
      ([topic, performance]) => performance.correct / performance.total < 0.7
    )
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);

  if (weakTopics.length === 0) {
    weakAreasContainer.innerHTML = `
            <div class="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
                <p class="text-green-800">🎉 Great job! No significant weak areas identified!</p>
            </div>
        `;
  } else {
    weakTopics.forEach(([topic, performance]) => {
      const percentage = Math.round(
        (performance.correct / performance.total) * 100
      );
      const weakAreaDiv = document.createElement("div");
      weakAreaDiv.className =
        "bg-red-50 p-3 rounded-lg border-l-4 border-red-500";
      weakAreaDiv.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="font-medium text-red-800">${topic}</span>
                    <span class="text-red-600 text-sm">${percentage}% accuracy</span>
                </div>
                <p class="text-red-700 text-sm mt-1">Focus on improving this area.</p>
            `;
      weakAreasContainer.appendChild(weakAreaDiv);
    });
  }
  +6;
}

function generateDetailedSuggestions(wrongTopics, topicPerformance) {
  const suggestionsContainer = document.getElementById("detailedSuggestions");
  suggestionsContainer.innerHTML = "";

  if (wrongTopics.length === 0) {
    suggestionsContainer.innerHTML = `
            <div class="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
                <h4 class="font-semibold text-green-800 mb-2">🎉 Perfect Performance!</h4>
                <p class="text-green-700">Congratulations! Consider taking a harder difficulty level.</p>
            </div>
        `;
    return;
  }

  const topicGroups = {};
  wrongTopics.forEach((question) => {
    if (!topicGroups[question.topic]) {
      topicGroups[question.topic] = [];
    }
    topicGroups[question.topic].push(question);
  });

  Object.entries(topicGroups).forEach(([topic, questions]) => {
    const suggestionDiv = document.createElement("div");
    suggestionDiv.className =
      "bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500";

    const resources = questions[0].resources;
    suggestionDiv.innerHTML = `
            <h4 class="font-semibold text-blue-800 mb-3">📚 ${topic}</h4>
            <p class="text-blue-700 mb-4">You missed ${questions.length} question(s). Here's your learning path:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="${resources.youtube}" target="_blank" class="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 text-center">
                    <div class="text-2xl mb-1">📺</div>
                    <div class="font-medium">Video Tutorial</div>
                </a>
                <a href="${resources.website}" target="_blank" class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 text-center">
                    <div class="text-2xl mb-1">📖</div>
                    <div class="font-medium">Documentation</div>
                </a>
                <a href="${resources.course}" target="_blank" class="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 text-center">
                    <div class="text-2xl mb-1">🎓</div>
                    <div class="font-medium">Course</div>
                </a>
            </div>
        `;
    suggestionsContainer.appendChild(suggestionDiv);
  });
}

async function saveUserPerformance(correct, total, percentage) {
  try {
    // Check if Firebase is available and working
    if (window.firebase && window.firebase.auth && !isFirebaseBlocked()) {
      const user = window.firebase.auth.currentUser;
      if (!user) {
        console.error("No authenticated user found");
        return;
      }

      // Calculate topics performance
      const topics = [];
      const weakAreas = [];

      quizQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        const topic = question.topic;

        if (!topics.find((t) => t.name === topic)) {
          topics.push({
            name: topic,
            correct: 0,
            total: 0,
          });
        }

        const topicIndex = topics.findIndex((t) => t.name === topic);
        topics[topicIndex].total++;
        if (isCorrect) {
          topics[topicIndex].correct++;
        } else {
          if (!weakAreas.includes(topic)) {
            weakAreas.push(topic);
          }
        }
      });

      // Save quiz result to Firebase and MySQL
      const quizResult = {
        userId: user.uid,
        domain: currentDomain,
        difficulty: quizSettings.difficulty,
        totalQuestions: total,
        correctAnswers: correct,
        score: correct,
        percentage: percentage,
        topics: topics,
        weakAreas: weakAreas,
        timeSpent: 0,
      };

      // Save to Firebase
      await window.dbManager.saveQuizResult(quizResult);
      
      // Save to MySQL backend
      try {
        const response = await fetch('http://localhost:5000/api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.uid,
            domain: currentDomain,
            topic: topics.join(', '),
            score: correct,
            percentage: percentage
          })
        });
        
        if (response.ok) {
          console.log('✅ Quiz result saved to MySQL database');
        } else {
          console.error('❌ Failed to save quiz result to MySQL:', await response.text());
        }
      } catch (error) {
        console.error('❌ Error saving quiz result to MySQL:', error);
      }

      // Update user statistics
      const userData = await window.dbManager.getUser(user.uid);
      if (userData) {
        const newTotalQuizzes = userData.totalQuizzes + 1;
        const newAverageScore =
          (userData.averageScore * userData.totalQuizzes + percentage) /
          newTotalQuizzes;

        await window.dbManager.updateUser(user.uid, {
          totalQuizzes: newTotalQuizzes,
          averageScore: newAverageScore,
          lastQuizDate: new Date(),
        });
      }

      console.log("Quiz result saved to Firebase successfully");
    } else {
      // Fallback to localStorage
      const userKey = `${currentUser}_${currentDomain}`;
      const performanceData = {
        lastScore: { correct, total, percentage },
        difficulty: quizSettings.difficulty,
        date: new Date().toISOString(),
        history: userPerformance.history || [],
      };

      performanceData.history.push({
        score: percentage,
        difficulty: quizSettings.difficulty,
        questions: total,
        date: new Date().toISOString(),
      });

      if (performanceData.history.length > 10) {
        performanceData.history = performanceData.history.slice(-10);
      }

      localStorage.setItem(userKey, JSON.stringify(performanceData));
      userPerformance = performanceData;

      console.log("Quiz result saved to localStorage successfully");
    }
  } catch (error) {
    console.error("Error saving quiz result:", error);
    logFirebaseError(error);

    // Fallback to localStorage
    const userKey = `${currentUser}_${currentDomain}`;
    const performanceData = {
      lastScore: { correct, total, percentage },
      difficulty: quizSettings.difficulty,
      date: new Date().toISOString(),
      history: userPerformance.history || [],
    };

    performanceData.history.push({
      score: percentage,
      difficulty: quizSettings.difficulty,
      questions: total,
      date: new Date().toISOString(),
    });

    if (performanceData.history.length > 10) {
      performanceData.history = performanceData.history.slice(-10);
    }

    localStorage.setItem(userKey, JSON.stringify(performanceData));
    userPerformance = performanceData;
  }
}

function downloadReport() {
  const reportData = {
    user: currentUser,
    domain: currentDomain,
    score: document.getElementById("finalScore").textContent,
    percentage: document.getElementById("scorePercentage").textContent,
    difficulty: quizSettings.difficulty,
    date: new Date().toLocaleDateString(),
  };

  const reportText = `
PRODIGY PATHWAYS - LEARNING ASSESSMENT REPORT
=============================================

Student: ${reportData.user}
Domain: ${reportData.domain.replace("-", " ").toUpperCase()}
Date: ${reportData.date}

PERFORMANCE SUMMARY
------------------
Score: ${reportData.score}
Performance: ${reportData.percentage}
Difficulty Level: ${
    reportData.difficulty.charAt(0).toUpperCase() +
    reportData.difficulty.slice(1)
  }

Generated by Prodigy Pathways AI Learning Platform
    `.trim();

  const blob = new Blob([reportText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentUser}_${currentDomain}_assessment_report.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Chatbot functions
function toggleChat() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.classList.toggle("hidden");
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message) {
    addChatMessage(message, "user");
    input.value = "";

    setTimeout(() => {
      const response = generateAIResponse(message);
      addChatMessage(response, "ai");
    }, 1000);
  }
}

function addChatMessage(message, sender) {
  const messagesContainer = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");

  if (sender === "user") {
    messageDiv.className = "bg-purple-100 p-3 rounded-lg ml-8";
    messageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
  } else {
    messageDiv.className = "bg-gray-100 p-3 rounded-lg mr-8";
    messageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
  }

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message) {
  const responses = [
    "Based on your quiz results, I recommend focusing on the topics where you scored lower.",
    "Great question! For your domain, I suggest practicing with real-world projects.",
    "I can help you improve! Have you considered taking our advanced assessment?",
    "That's an excellent topic to explore! Let me suggest some resources.",
    "I'm here to help with your learning journey! Type 'AI quiz' to test your knowledge.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

// Allow Enter key to send chat messages
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded successfully!");
  
  // Check if we should show the resume page
  const showResumePage = localStorage.getItem('showResumePage');
  const urlHash = window.location.hash;
  
  if (showResumePage === 'true' || urlHash === '#resume') {
    localStorage.removeItem('showResumePage'); // Clear the flag
    showResume();
  } else {
    showLanding();
  }

  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});

// Test function to verify JavaScript is working
function testFunction() {
  alert("JavaScript is working!");
  console.log("Test function called");
}

// Debug function to check stored users
function checkStoredUsers() {
  const users = Object.keys(localStorage).filter((key) =>
    key.startsWith("userData_")
  );
  console.log("Stored users:", users);
  if (users.length === 0) {
    console.log("No users found in localStorage");
  } else {
    users.forEach((userKey) => {
      const userData = JSON.parse(localStorage.getItem(userKey));
      console.log("User:", userData.email, "- Name:", userData.name);
    });
  }
  return users;
}

// Debug function to test login
function testLogin(email, password) {
  console.log("Testing login for:", email);
  const storedUserData = localStorage.getItem("userData_" + email);
  const storedPassword = localStorage.getItem("userPassword_" + email);

  console.log("Stored user data:", storedUserData);
  console.log("Stored password:", storedPassword);

  if (storedUserData && storedPassword) {
    const userData = JSON.parse(storedUserData);
    const decodedPassword = atob(storedPassword);
    console.log("Decoded password:", decodedPassword);
    console.log("Password match:", password === decodedPassword);
    return password === decodedPassword;
  } else {
    console.log("User not found in localStorage");
    return false;
  }
}

// Make debug functions available globally
window.checkStoredUsers = checkStoredUsers;
window.testLogin = testLogin;

// Helper function to check if Firebase is blocked
function isFirebaseBlocked() {
  // Check if we've encountered Firebase auth errors
  const firebaseErrors = localStorage.getItem("firebase_errors") || "[]";
  const errors = JSON.parse(firebaseErrors);

  // Check for common blocking errors
  const blockingErrors = [
    "identity-toolkit-api-has-not-been-used",
    "requests-to-this-api-identitytoolkit-method-are-blocked",
    "auth/requests-to-this-api-identitytoolkit-method",
  ];

  return errors.some((error) =>
    blockingErrors.some((blockingError) => error.includes(blockingError))
  );
}

// Function to log Firebase errors
function logFirebaseError(error) {
  const firebaseErrors = localStorage.getItem("firebase_errors") || "[]";
  const errors = JSON.parse(firebaseErrors);
  errors.push(error.message || error.toString());

  // Keep only last 10 errors
  if (errors.length > 10) {
    errors.splice(0, errors.length - 10);
  }

  localStorage.setItem("firebase_errors", JSON.stringify(errors));
}
// ==========================================
// RESUME BUILDER FUNCTIONS
// ==========================================

// Resume global variables
let selectedTemplate = 'ats-modern';
let currentBuilderStep = 1;
let resumeData = {
  personal: {},
  education: [],
  skills: {},
  projects: [],
  certifications: [],
  experience: []
};

// Show resume page
function showResume() {
  hideAllPages();
  document.getElementById('resumePage').classList.remove('hidden');
  showResumeTab('templates');
  loadSavedResume();
}

// Show resume tab
function showResumeTab(tab) {
  // Hide all tabs
  document.querySelectorAll('.resume-content').forEach(content => {
    content.classList.add('hidden');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.resume-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  if (tab === 'templates') {
    document.getElementById('resumeTemplates').classList.remove('hidden');
    document.getElementById('templatesTabBtn').classList.add('active');
  } else if (tab === 'builder') {
    document.getElementById('resumeBuilder').classList.remove('hidden');
    document.getElementById('builderTabBtn').classList.add('active');
  } else if (tab === 'preview') {
    document.getElementById('resumePreview').classList.remove('hidden');
    document.getElementById('previewTabBtn').classList.add('active');
    updateResumePreview();
  }
}

// Select template
function selectTemplate(template) {
  selectedTemplate = template;
  
  // Remove selected class from all templates
  document.querySelectorAll('.template-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Add selected class to clicked template
  event.target.closest('.template-card').classList.add('selected');
  
  // Show success message
  alert(`Template "${template}" selected! Now go to the Builder tab to fill in your information.`);
  
  // Auto switch to builder tab
  setTimeout(() => {
    showResumeTab('builder');
  }, 1000);
}

// Builder navigation
function nextStep() {
  if (currentBuilderStep < 6) {
    // Validate current step
    if (!validateStep(currentBuilderStep)) {
      return;
    }
    
    // Save current step data
    saveStepData(currentBuilderStep);
    
    // Hide current step
    document.getElementById(`step${currentBuilderStep}`).classList.add('hidden');
    
    // Show next step
    currentBuilderStep++;
    document.getElementById(`step${currentBuilderStep}`).classList.remove('hidden');
    
    // Update progress
    updateBuilderProgress();
    
    // Update buttons
    document.getElementById('prevStepBtn').disabled = false;
    if (currentBuilderStep === 6) {
      document.getElementById('nextStepBtn').textContent = 'Preview Resume →';
    }
  } else {
    // Save last step and show preview
    saveStepData(currentBuilderStep);
    showResumeTab('preview');
  }
}

function previousStep() {
  if (currentBuilderStep > 1) {
    // Hide current step
    document.getElementById(`step${currentBuilderStep}`).classList.add('hidden');
    
    // Show previous step
    currentBuilderStep--;
    document.getElementById(`step${currentBuilderStep}`).classList.remove('hidden');
    
    // Update progress
    updateBuilderProgress();
    
    // Update buttons
    if (currentBuilderStep === 1) {
      document.getElementById('prevStepBtn').disabled = true;
    }
    document.getElementById('nextStepBtn').textContent = 'Next →';
  }
}

function updateBuilderProgress() {
  const progress = (currentBuilderStep / 6) * 100;
  document.getElementById('builderProgress').style.width = `${progress}%`;
  document.getElementById('currentStep').textContent = currentBuilderStep;
}

// Validate step
function validateStep(step) {
  if (step === 1) {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!fullName || !email || !phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return false;
    }
  }
  return true;
}

// Save step data
function saveStepData(step) {
  if (step === 1) {
    // Personal Information
    resumeData.personal = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      location: document.getElementById('location').value,
      linkedin: document.getElementById('linkedin').value,
      github: document.getElementById('github').value,
      summary: document.getElementById('summary').value
    };
  } else if (step === 2) {
    // Education
    resumeData.education = [];
    document.querySelectorAll('.education-entry').forEach(entry => {
      resumeData.education.push({
        degree: entry.querySelector('.edu-degree').value,
        field: entry.querySelector('.edu-field').value,
        institution: entry.querySelector('.edu-institution').value,
        gpa: entry.querySelector('.edu-gpa').value,
        startDate: entry.querySelector('.edu-start').value,
        endDate: entry.querySelector('.edu-end').value
      });
    });
  } else if (step === 3) {
    // Skills
    resumeData.skills = {
      technical: document.getElementById('technicalSkills').value,
      soft: document.getElementById('softSkills').value,
      tools: document.getElementById('tools').value
    };
  } else if (step === 4) {
    // Projects
    resumeData.projects = [];
    document.querySelectorAll('.project-entry').forEach(entry => {
      resumeData.projects.push({
        name: entry.querySelector('.project-name').value,
        technologies: entry.querySelector('.project-tech').value,
        description: entry.querySelector('.project-desc').value,
        link: entry.querySelector('.project-link').value
      });
    });
  } else if (step === 5) {
    // Certifications
    resumeData.certifications = [];
    document.querySelectorAll('.certification-entry').forEach(entry => {
      const name = entry.querySelector('.cert-name').value;
      if (name) {
        resumeData.certifications.push({
          name: name,
          organization: entry.querySelector('.cert-org').value,
          date: entry.querySelector('.cert-date').value,
          credentialId: entry.querySelector('.cert-id').value
        });
      }
    });
  } else if (step === 6) {
    // Experience
    resumeData.experience = [];
    document.querySelectorAll('.experience-entry').forEach(entry => {
      const title = entry.querySelector('.exp-title').value;
      if (title) {
        resumeData.experience.push({
          title: title,
          company: entry.querySelector('.exp-company').value,
          startDate: entry.querySelector('.exp-start').value,
          endDate: entry.querySelector('.exp-end').value,
          current: entry.querySelector('.exp-current').checked,
          description: entry.querySelector('.exp-desc').value
        });
      }
    });
  }
}

// Add dynamic entries
function addEducation() {
  const entry = document.createElement('div');
  entry.className = 'education-entry border-2 border-gray-200 rounded-lg p-4 mb-4';
  entry.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
        <input type="text" class="edu-degree w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Bachelor of Science">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
        <input type="text" class="edu-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Computer Science">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
        <input type="text" class="edu-institution w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="University Name">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">GPA/Percentage</label>
        <input type="text" class="edu-gpa w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="3.8/4.0 or 85%">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
        <input type="month" class="edu-start w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
        <input type="month" class="edu-end w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
      </div>
    </div>
    <button onclick="this.parentElement.remove()" class="mt-2 text-red-600 text-sm hover:text-red-800">Remove</button>
  `;
  document.getElementById('educationEntries').appendChild(entry);
}

function addProject() {
  const entry = document.createElement('div');
  entry.className = 'project-entry border-2 border-gray-200 rounded-lg p-4 mb-4';
  entry.innerHTML = `
    <div class="grid grid-cols-1 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
        <input type="text" class="project-name w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="E-commerce Website">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
        <input type="text" class="project-tech w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="React, Node.js, MongoDB">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea class="project-desc w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" rows="3" placeholder="Describe your project and achievements..."></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
        <input type="url" class="project-link w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="https://github.com/username/project">
      </div>
    </div>
    <button onclick="this.parentElement.remove()" class="mt-2 text-red-600 text-sm hover:text-red-800">Remove</button>
  `;
  document.getElementById('projectEntries').appendChild(entry);
}

function addCertification() {
  const entry = document.createElement('div');
  entry.className = 'certification-entry border-2 border-gray-200 rounded-lg p-4 mb-4';
  entry.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
        <input type="text" class="cert-name w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="AWS Certified Developer">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
        <input type="text" class="cert-org w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Amazon Web Services">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
        <input type="month" class="cert-date w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
        <input type="text" class="cert-id w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="ABC123XYZ">
      </div>
    </div>
    <button onclick="this.parentElement.remove()" class="mt-2 text-red-600 text-sm hover:text-red-800">Remove</button>
  `;
  document.getElementById('certificationEntries').appendChild(entry);
}

function addExperience() {
  const entry = document.createElement('div');
  entry.className = 'experience-entry border-2 border-gray-200 rounded-lg p-4 mb-4';
  entry.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
        <input type="text" class="exp-title w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Software Developer">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
        <input type="text" class="exp-company w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Tech Corp">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input type="month" class="exp-start w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
        <input type="month" class="exp-end w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
        <div class="flex items-center mt-2">
          <input type="checkbox" class="exp-current mr-2">
          <label class="text-sm text-gray-600">Currently working here</label>
        </div>
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
        <textarea class="exp-desc w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" rows="3" placeholder="Describe your key responsibilities and achievements..."></textarea>
      </div>
    </div>
    <button onclick="this.parentElement.remove()" class="mt-2 text-red-600 text-sm hover:text-red-800">Remove</button>
  `;
  document.getElementById('experienceEntries').appendChild(entry);
}

// Update resume preview
function updateResumePreview() {
  // Save all current step data first
  saveStepData(currentBuilderStep);
  
  const previewContent = document.getElementById('resumePreviewContent');
  
  if (!resumeData.personal.fullName) {
    previewContent.innerHTML = `
      <div class="text-center text-gray-400 py-20">
        <div class="text-6xl mb-4">📄</div>
        <p>Complete the builder steps to see your resume preview</p>
      </div>
    `;
    return;
  }
  
  // Generate preview based on selected template
  let html = generateResumeHTML();
  previewContent.innerHTML = html;
}

// Generate resume HTML
function generateResumeHTML() {
  const p = resumeData.personal;
  
  let html = `
    <div style="font-family: 'Times New Roman', serif; color: #000; line-height: 1.6;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0;">${p.fullName || ''}</h1>
        <p style="margin: 5px 0; font-size: 12px;">
          ${p.email || ''} | ${p.phone || ''} ${p.location ? '| ' + p.location : ''}
        </p>
        ${p.linkedin || p.github ? `<p style="margin: 5px 0; font-size: 12px;">
          ${p.linkedin ? `<a href="${p.linkedin}" style="color: #0066cc; text-decoration: none;">LinkedIn</a>` : ''}
          ${p.linkedin && p.github ? ' | ' : ''}
          ${p.github ? `<a href="${p.github}" style="color: #0066cc; text-decoration: none;">GitHub</a>` : ''}
        </p>` : ''}
      </div>
      
      <!-- Summary -->
      ${p.summary ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 8px;">PROFESSIONAL SUMMARY</h2>
        <p style="font-size: 12px; text-align: justify;">${p.summary}</p>
      </div>
      ` : ''}
      
      <!-- Education -->
      ${resumeData.education.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 8px;">EDUCATION</h2>
        ${resumeData.education.map(edu => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <strong>${edu.degree} in ${edu.field}</strong>
              <span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
            </div>
            <div style="font-size: 12px;">${edu.institution}</div>
            ${edu.gpa ? `<div style="font-size: 12px;">GPA: ${edu.gpa}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      <!-- Skills -->
      ${(resumeData.skills.technical || resumeData.skills.soft || resumeData.skills.tools) ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 8px;">SKILLS</h2>
        ${resumeData.skills.technical ? `<p style="font-size: 12px;"><strong>Technical Skills:</strong> ${resumeData.skills.technical}</p>` : ''}
        ${resumeData.skills.soft ? `<p style="font-size: 12px;"><strong>Soft Skills:</strong> ${resumeData.skills.soft}</p>` : ''}
        ${resumeData.skills.tools ? `<p style="font-size: 12px;"><strong>Tools & Technologies:</strong> ${resumeData.skills.tools}</p>` : ''}
      </div>
      ` : ''}
      
      <!-- Experience -->
      ${resumeData.experience.length > 0 && resumeData.experience[0].title ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 8px;">WORK EXPERIENCE</h2>
        ${resumeData.experience.map(exp => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <strong>${exp.title} - ${exp.company}</strong>
              <span>${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
            </div>
            <p style="font-size: 12px; margin-top: 4px;">${exp.description}</p>
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      <!-- Projects -->
      ${resumeData.projects.length > 0 && resumeData.projects[0].name ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 8px;">PROJECTS</h2>
        ${resumeData.projects.map(proj => `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px;">
              <strong>${proj.name}</strong> ${proj.technologies ? `<em>(${proj.technologies})</em>` : ''}
            </div>
            <p style="font-size: 12px; margin-top: 4px;">${proj.description}</p>
            ${proj.link ? `<p style="font-size: 11px; color: #0066cc;"><a href="${proj.link}">${proj.link}</a></p>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      <!-- Certifications -->
      ${resumeData.certifications.length > 0 && resumeData.certifications[0].name ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 8px;">CERTIFICATIONS</h2>
        ${resumeData.certifications.map(cert => `
          <div style="margin-bottom: 8px; font-size: 12px;">
            <strong>${cert.name}</strong> - ${cert.organization} ${cert.date ? `(${formatDate(cert.date)})` : ''}
            ${cert.credentialId ? `<br><span style="font-size: 11px;">Credential ID: ${cert.credentialId}</span>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  `;
  
  return html;
}

// Format date helper
function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// Save resume to localStorage
function saveResume() {
  localStorage.setItem('prodigy_resume', JSON.stringify(resumeData));
  alert('✅ Resume saved successfully!');
}

// Load saved resume
function loadSavedResume() {
  const saved = localStorage.getItem('prodigy_resume');
  if (saved) {
    resumeData = JSON.parse(saved);
    
    // Populate form fields if data exists
    if (resumeData.personal.fullName) {
      document.getElementById('fullName').value = resumeData.personal.fullName || '';
      document.getElementById('email').value = resumeData.personal.email || '';
      document.getElementById('phone').value = resumeData.personal.phone || '';
      document.getElementById('location').value = resumeData.personal.location || '';
      document.getElementById('linkedin').value = resumeData.personal.linkedin || '';
      document.getElementById('github').value = resumeData.personal.github || '';
      document.getElementById('summary').value = resumeData.personal.summary || '';
    }
  }
}

// Download resume as PDF (using jsPDF)
async function downloadResumePDF() {
  // Check if resume has content
  if (!resumeData.personal.fullName) {
    alert('Please complete the resume builder first!');
    return;
  }
  
  try {
    // Check if libraries are loaded
    if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
      alert('PDF libraries not loaded. Please refresh the page and try again.');
      return;
    }
    
    const { jsPDF } = window.jspdf;
    
    // Get the resume preview content
    const resumeContent = document.getElementById('resumePreviewContent');
    
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'pdfLoadingMsg';
    loadingMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white p-6 rounded-lg shadow-2xl z-50';
    loadingMsg.innerHTML = '<div class="text-center"><div class="text-2xl mb-2">📄</div><p class="text-lg font-semibold">Generating PDF...</p><p class="text-sm mt-1">Please wait...</p></div>';
    document.body.appendChild(loadingMsg);
    
    // Wait a bit for the loading message to display
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Use html2canvas to capture the resume content
    const canvas = await html2canvas(resumeContent, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: resumeContent.scrollWidth,
      windowHeight: resumeContent.scrollHeight
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Download the PDF
    const fileName = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    pdf.save(fileName);
    
    // Remove loading message
    const loadingElement = document.getElementById('pdfLoadingMsg');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    
    // Show success message
    setTimeout(() => {
      alert(`✅ Resume downloaded successfully as:\n${fileName}`);
    }, 200);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Remove loading message if it exists
    const loadingElement = document.getElementById('pdfLoadingMsg');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    
    alert('❌ PDF generation encountered an issue.\n\nAlternative method:\n1. Right-click on the preview\n2. Select "Print"\n3. Choose "Save as PDF"\n\nError: ' + error.message);
  }
}