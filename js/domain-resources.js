// Domain-Specific Resources Data
// ==========================================

const domainResources = {
  "programming": {
    name: "Programming & Software Development",
    icon: "💻",
    color: "#667eea",
    description: "Master programming fundamentals and software development skills",
    
    interviewExperience: [
      {
        id: 1,
        title: "Google Software Engineer Interview Experience 2024",
        youtubeUrl: "https://www.youtube.com/watch?v=XKu_SEDAykw",
        company: "Google",
        level: "Mid-Level",
        duration: "16:45",
        views: "850K",
        channel: "Clement Mihailescu"
      },
      {
        id: 2,
        title: "Amazon SDE Interview - Coding & System Design",
        youtubeUrl: "https://www.youtube.com/watch?v=0Z9RW_hhUT4",
        company: "Amazon",
        level: "Entry",
        duration: "22:10",
        views: "420K",
        channel: "Exponent"
      },
      {
        id: 3,
        title: "Microsoft Software Engineer Interview Process",
        youtubeUrl: "https://www.youtube.com/watch?v=1qw5ITr3k9E",
        company: "Microsoft",
        level: "Senior",
        duration: "18:30",
        views: "320K",
        channel: "Real Interview Process"
      },
      {
        id: 4,
        title: "Meta (Facebook) Frontend Engineer Interview",
        youtubeUrl: "https://www.youtube.com/watch?v=ySQVtGrEXF8",
        company: "Meta",
        level: "Mid-Level",
        duration: "25:15",
        views: "560K",
        channel: "Front-End Engineer"
      }
    ],
    
    leetcodeProblems: [
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/two-sum/",
        frequency: "Very High",
        companies: ["Google", "Amazon", "Apple", "Microsoft", "Facebook"],
        topics: ["Array", "Hash Table"],
        acceptanceRate: 49.5
      },
      {
        id: 2,
        title: "Valid Parentheses",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/valid-parentheses/",
        frequency: "Very High",
        companies: ["Amazon", "Microsoft", "Bloomberg"],
        topics: ["Stack", "String"],
        acceptanceRate: 40.2
      },
      {
        id: 3,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        frequency: "High",
        companies: ["Amazon", "Microsoft", "Apple"],
        topics: ["Linked List", "Recursion"],
        acceptanceRate: 61.8
      },
      {
        id: 4,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        frequency: "Very High",
        companies: ["Amazon", "Google", "Facebook"],
        topics: ["Array", "Dynamic Programming"],
        acceptanceRate: 54.3
      },
      {
        id: 5,
        title: "Reverse Linked List",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/reverse-linked-list/",
        frequency: "Very High",
        companies: ["Amazon", "Microsoft", "Apple", "Google"],
        topics: ["Linked List", "Recursion"],
        acceptanceRate: 72.1
      },
      {
        id: 6,
        title: "LRU Cache",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/lru-cache/",
        frequency: "Very High",
        companies: ["Amazon", "Google", "Facebook", "Microsoft"],
        topics: ["Hash Table", "Linked List", "Design"],
        acceptanceRate: 41.2
      },
      {
        id: 7,
        title: "3Sum",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/3sum/",
        frequency: "High",
        companies: ["Amazon", "Facebook", "Google"],
        topics: ["Array", "Two Pointers", "Sorting"],
        acceptanceRate: 32.4
      },
      {
        id: 8,
        title: "Product of Array Except Self",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/product-of-array-except-self/",
        frequency: "High",
        companies: ["Amazon", "Microsoft", "Facebook"],
        topics: ["Array", "Prefix Sum"],
        acceptanceRate: 64.8
      }
    ],
    
    courses: [
      {
        id: 1,
        title: "The Complete Web Developer Bootcamp",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
        price: "$12.99",
        rating: 4.7,
        students: "850K+",
        instructor: "Angela Yu"
      },
      {
        id: 2,
        title: "CS50's Introduction to Computer Science",
        platform: "Harvard (edX)",
        url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
        price: "Free",
        rating: 4.9,
        students: "3M+",
        instructor: "David J. Malan"
      },
      {
        id: 3,
        title: "The Complete JavaScript Course",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-complete-javascript-course/",
        price: "$12.99",
        rating: 4.7,
        students: "600K+",
        instructor: "Jonas Schmedtmann"
      },
      {
        id: 4,
        title: "Full Stack Open",
        platform: "University of Helsinki",
        url: "https://fullstackopen.com/",
        price: "Free",
        rating: 4.9,
        students: "100K+",
        instructor: "University of Helsinki"
      }
    ],
    
    youtubeResources: [
      {
        id: 1,
        title: "Web Development Crash Course",
        channel: "Traversy Media",
        url: "https://www.youtube.com/c/TraversyMedia",
        type: "channel",
        subscribers: "2M+",
        videos: "1000+"
      },
      {
        id: 2,
        title: "JavaScript Full Course (2024)",
        channel: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        type: "video",
        duration: "3:26:42",
        views: "12M+"
      },
      {
        id: 3,
        title: "React Tutorial for Beginners",
        channel: "Programming with Mosh",
        url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        type: "video",
        duration: "1:18:27",
        views: "3.5M+"
      },
      {
        id: 4,
        title: "Data Structures and Algorithms",
        channel: "Abdul Bari",
        url: "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O",
        type: "playlist",
        videos: "142",
        views: "50M+"
      }
    ],
    
    roadmap: {
      beginner: [
        "HTML & CSS Fundamentals",
        "JavaScript Basics",
        "Git & GitHub",
        "Responsive Web Design",
        "Basic Algorithms"
      ],
      intermediate: [
        "React or Vue.js",
        "Node.js & Express",
        "RESTful APIs",
        "SQL & NoSQL Databases",
        "Data Structures"
      ],
      advanced: [
        "System Design",
        "Microservices Architecture",
        "DevOps & CI/CD",
        "Performance Optimization",
        "Cloud Platforms (AWS/Azure)"
      ]
    },
    
    books: [
      {
        id: 1,
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        buyLink: "https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507",
        price: "$39.99",
        rating: 4.6,
        freeLink: "https://eloquentjavascript.net/"
      },
      {
        id: 2,
        title: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
        buyLink: "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850",
        price: "$49.95",
        rating: 4.7,
        freeLink: null
      },
      {
        id: 3,
        title: "You Don't Know JS (Book Series)",
        author: "Kyle Simpson",
        buyLink: "https://www.amazon.com/You-Dont-Know-JS-Yet/dp/B084DFZ6GW",
        price: "$25.00",
        rating: 4.8,
        freeLink: "https://github.com/getify/You-Dont-Know-JS"
      },
      {
        id: 4,
        title: "Clean Code",
        author: "Robert C. Martin",
        buyLink: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
        price: "$44.99",
        rating: 4.7,
        freeLink: null
      }
    ],
    
    interviewTips: [
      "Master data structures: Arrays, Linked Lists, Trees, Graphs, Hash Tables",
      "Practice problem-solving on LeetCode/HackerRank daily (at least 2-3 problems)",
      "Understand time and space complexity (Big O notation)",
      "Build 3-5 real-world projects and be ready to explain them",
      "Study system design basics (even for junior roles)",
      "Practice behavioral questions using STAR method",
      "Learn to think out loud during coding interviews",
      "Review fundamental CS concepts: OOP, databases, networking"
    ],

    internships: [
      {
        id: 1,
        company: "Google",
        position: "Software Engineering Intern",
        location: "Bangalore, India / Remote",
        duration: "3-6 months",
        stipend: "₹80,000 - ₹1,00,000/month",
        deadline: "2026-03-15",
        applyUrl: "https://careers.google.com/students/",
        skills: ["Python", "Java", "Data Structures", "Algorithms"],
        type: "Summer 2026"
      },
      {
        id: 2,
        company: "Microsoft",
        position: "Software Development Intern",
        location: "Hyderabad, India",
        duration: "2-3 months",
        stipend: "₹75,000 - ₹90,000/month",
        deadline: "2026-03-20",
        applyUrl: "https://careers.microsoft.com/students/us/en",
        skills: ["C++", "C#", ".NET", "Azure"],
        type: "Summer 2026"
      },
      {
        id: 3,
        company: "Amazon",
        position: "SDE Intern",
        location: "Bangalore, India",
        duration: "2-6 months",
        stipend: "₹70,000 - ₹85,000/month",
        deadline: "2026-03-10",
        applyUrl: "https://www.amazon.jobs/en/teams/internships-for-students",
        skills: ["Java", "Python", "AWS", "System Design"],
        type: "Summer 2026"
      },
      {
        id: 4,
        company: "Meta (Facebook)",
        position: "Frontend Engineering Intern",
        location: "Remote",
        duration: "12 weeks",
        stipend: "₹85,000 - ₹95,000/month",
        deadline: "2026-02-28",
        applyUrl: "https://www.metacareers.com/students",
        skills: ["React", "JavaScript", "HTML/CSS", "GraphQL"],
        type: "Summer 2026"
      },
      {
        id: 5,
        company: "Flipkart",
        position: "Software Development Intern",
        location: "Bangalore, India",
        duration: "2 months",
        stipend: "₹40,000 - ₹50,000/month",
        deadline: "2026-03-30",
        applyUrl: "https://www.flipkartcareers.com/",
        skills: ["Java", "Python", "Microservices", "System Design"],
        type: "Summer 2026"
      },
      {
        id: 6,
        company: "Atlassian",
        position: "Full Stack Intern",
        location: "Bangalore, India",
        duration: "3-6 months",
        stipend: "₹60,000 - ₹75,000/month",
        deadline: "2026-02-25",
        applyUrl: "https://www.atlassian.com/company/careers/students",
        skills: ["React", "Node.js", "Java", "TypeScript"],
        type: "Summer 2026"
      }
    ],

    placementGuide: {
      applicationSteps: [
        {
          step: 1,
          title: "Build a Strong Resume",
          description: "Highlight projects, internships, and technical skills. Use ATS-friendly format.",
          icon: "📄"
        },
        {
          step: 2,
          title: "Create Online Presence",
          description: "Active GitHub profile, LinkedIn optimization, personal portfolio website.",
          icon: "🌐"
        },
        {
          step: 3,
          title: "Apply Strategically",
          description: "Use LinkedIn, company careers pages, referrals, and job boards like Indeed, Glassdoor.",
          icon: "🎯"
        },
        {
          step: 4,
          title: "Network Actively",
          description: "Attend meetups, tech conferences, reach out to alumni, join developer communities.",
          icon: "🤝"
        },
        {
          step: 5,
          title: "Prepare for Interviews",
          description: "Practice coding problems, study system design, prepare behavioral answers.",
          icon: "💪"
        }
      ],
      
      topCompanies: [
        {
          name: "Google",
          applyUrl: "https://careers.google.com/",
          icon: "🔍",
          roles: "SWE, Frontend, Backend, Full Stack"
        },
        {
          name: "Microsoft",
          applyUrl: "https://careers.microsoft.com/",
          icon: "🪟",
          roles: "Software Engineer, Cloud Engineer"
        },
        {
          name: "Amazon",
          applyUrl: "https://www.amazon.jobs/",
          icon: "📦",
          roles: "SDE I, II, Frontend Developer"
        },
        {
          name: "Meta (Facebook)",
          applyUrl: "https://www.metacareers.com/",
          icon: "👥",
          roles: "Software Engineer, Frontend Engineer"
        },
        {
          name: "Apple",
          applyUrl: "https://www.apple.com/careers/",
          icon: "🍎",
          roles: "Software Engineer, iOS Developer"
        },
        {
          name: "Netflix",
          applyUrl: "https://jobs.netflix.com/",
          icon: "🎬",
          roles: "Full Stack Engineer, Backend Engineer"
        }
      ],
      
      preparationTimeline: [
        {
          month: "Month 1",
          focus: "Foundations & DSA",
          tasks: [
            "Learn/revise Data Structures (Arrays, Strings, Linked Lists, Stacks, Queues)",
            "Master basic algorithms (Sorting, Searching, Two Pointers)",
            "Solve 30-40 Easy problems on LeetCode",
            "Start working on 1-2 portfolio projects"
          ],
          color: "green"
        },
        {
          month: "Month 2",
          focus: "Advanced Topics & Projects",
          tasks: [
            "Study Trees, Graphs, Dynamic Programming, Backtracking",
            "Solve 40-50 Medium problems on LeetCode",
            "Complete 2-3 full-stack projects",
            "Start learning system design basics",
            "Update resume and LinkedIn profile"
          ],
          color: "orange"
        },
        {
          month: "Month 3",
          focus: "Interview Prep & Applications",
          tasks: [
            "Solve company-specific problems (Google, Amazon, etc.)",
            "Practice mock interviews with peers/platforms",
            "Study behavioral questions and prepare STAR answers",
            "Apply to 20-30 companies",
            "Network with recruiters and employees on LinkedIn"
          ],
          color: "red"
        }
      ],
      
      keyTips: [
        "Start applying early - don't wait until you feel 100% ready",
        "Referrals increase your chances by 3-5x - leverage your network",
        "Consistency is key: solve at least 2 problems daily",
        "Quality > Quantity: Understand solutions deeply, don't just memorize",
        "Build projects that solve real problems - they stand out",
        "Practice explaining your thought process out loud",
        "Follow up after applying - it shows genuine interest",
        "Don't get discouraged by rejections - they're part of the process"
      ]
    }
  },
  
  "ai": {
    name: "Artificial Intelligence & Machine Learning",
    icon: "🤖",
    color: "#10b981",
    description: "Master AI/ML algorithms and build intelligent systems",
    
    interviewExperience: [
      {
        id: 1,
        title: "Google AI/ML Engineer Interview Experience",
        youtubeUrl: "https://www.youtube.com/watch?v=vEe991mt0o8",
        company: "Google",
        level: "Mid-Level",
        duration: "24:30",
        views: "180K",
        channel: "AI Interview Prep"
      },
      {
        id: 2,
        title: "Amazon Machine Learning Scientist Interview",
        youtubeUrl: "https://www.youtube.com/watch?v=Htz4AocPQAI",
        company: "Amazon",
        level: "Senior",
        duration: "19:45",
        views: "95K",
        channel: "ML Career Guide"
      },
      {
        id: 3,
        title: "Meta AI Research Scientist Interview Process",
        youtubeUrl: "https://www.youtube.com/watch?v=U3UYSnxY1hI",
        company: "Meta",
        level: "Senior",
        duration: "28:15",
        views: "125K",
        channel: "AI Careers"
      }
    ],
    
    leetcodeProblems: [
      {
        id: 1,
        title: "Design Add and Search Words Data Structure",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        frequency: "High",
        companies: ["Google", "Amazon", "Facebook"],
        topics: ["Trie", "Design", "String"],
        acceptanceRate: 45.2
      },
      {
        id: 2,
        title: "Word Break",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/word-break/",
        frequency: "High",
        companies: ["Google", "Amazon", "Microsoft"],
        topics: ["Dynamic Programming", "String"],
        acceptanceRate: 44.8
      },
      {
        id: 3,
        title: "Number of Islands",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-islands/",
        frequency: "Very High",
        companies: ["Amazon", "Google", "Facebook"],
        topics: ["Graph", "DFS", "BFS"],
        acceptanceRate: 56.3
      },
      {
        id: 4,
        title: "Course Schedule",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/course-schedule/",
        frequency: "High",
        companies: ["Amazon", "Google", "Microsoft"],
        topics: ["Graph", "Topological Sort"],
        acceptanceRate: 46.1
      }
    ],
    
    courses: [
      {
        id: 1,
        title: "Machine Learning Specialization",
        platform: "Coursera (Stanford)",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        price: "$49/month",
        rating: 4.9,
        students: "5M+",
        instructor: "Andrew Ng"
      },
      {
        id: 2,
        title: "Deep Learning Specialization",
        platform: "Coursera (DeepLearning.AI)",
        url: "https://www.coursera.org/specializations/deep-learning",
        price: "$49/month",
        rating: 4.9,
        students: "900K+",
        instructor: "Andrew Ng"
      },
      {
        id: 3,
        title: "Fast.ai Practical Deep Learning",
        platform: "fast.ai",
        url: "https://course.fast.ai/",
        price: "Free",
        rating: 4.8,
        students: "500K+",
        instructor: "Jeremy Howard"
      },
      {
        id: 4,
        title: "CS229: Machine Learning",
        platform: "Stanford Online",
        url: "https://online.stanford.edu/courses/cs229-machine-learning",
        price: "Free (Audit)",
        rating: 4.9,
        students: "200K+",
        instructor: "Andrew Ng"
      }
    ],
    
    youtubeResources: [
      {
        id: 1,
        title: "Machine Learning Full Course",
        channel: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=NWONeJKn6kc",
        type: "video",
        duration: "10:00:00",
        views: "2M+"
      },
      {
        id: 2,
        title: "Deep Learning Tutorials",
        channel: "sentdex",
        url: "https://www.youtube.com/c/sentdex",
        type: "channel",
        subscribers: "1.2M+",
        videos: "1200+"
      },
      {
        id: 3,
        title: "Neural Networks from Scratch",
        channel: "3Blue1Brown",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        type: "playlist",
        videos: "19",
        views: "30M+"
      }
    ],
    
    roadmap: {
      beginner: [
        "Python Programming",
        "Mathematics (Linear Algebra, Calculus, Statistics)",
        "Data Analysis with Pandas & NumPy",
        "Data Visualization",
        "Basic ML Algorithms"
      ],
      intermediate: [
        "Supervised & Unsupervised Learning",
        "Neural Networks",
        "Deep Learning Frameworks (TensorFlow/PyTorch)",
        "Natural Language Processing",
        "Computer Vision Basics"
      ],
      advanced: [
        "Advanced Deep Learning Architectures",
        "Reinforcement Learning",
        "MLOps & Model Deployment",
        "Research Paper Implementation",
        "Generative AI & LLMs"
      ]
    },
    
    books: [
      {
        id: 1,
        title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
        author: "Aurélien Géron",
        buyLink: "https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646",
        price: "$59.99",
        rating: 4.7,
        freeLink: null
      },
      {
        id: 2,
        title: "Deep Learning",
        author: "Ian Goodfellow, Yoshua Bengio",
        buyLink: "https://www.amazon.com/Deep-Learning-Adaptive-Computation-Machine/dp/0262035618",
        price: "$75.00",
        rating: 4.6,
        freeLink: "https://www.deeplearningbook.org/"
      },
      {
        id: 3,
        title: "Pattern Recognition and Machine Learning",
        author: "Christopher Bishop",
        buyLink: "https://www.amazon.com/Pattern-Recognition-Learning-Information-Statistics/dp/0387310738",
        price: "$94.99",
        rating: 4.6,
        freeLink: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf"
      }
    ],
    
    interviewTips: [
      "Master fundamental ML algorithms: Linear Regression, Decision Trees, SVM, Neural Networks",
      "Be comfortable with mathematics: Linear Algebra, Calculus, Probability & Statistics",
      "Practice explaining ML concepts in simple terms",
      "Implement algorithms from scratch (at least once)",
      "Know how to evaluate models (precision, recall, F1, ROC-AUC)",
      "Understand bias-variance tradeoff and regularization",
      "Be ready to discuss your ML projects in detail",
      "Stay updated with latest research papers and trends"
    ],

    internships: [
      {
        id: 1,
        company: "OpenAI",
        position: "ML Research Intern",
        location: "Remote",
        duration: "3-6 months",
        stipend: "$8,000 - $10,000/month",
        deadline: "2026-03-25",
        applyUrl: "https://openai.com/careers",
        skills: ["Python", "PyTorch", "TensorFlow", "Research"],
        type: "Summer 2026"
      },
      {
        id: 2,
        company: "NVIDIA",
        position: "Deep Learning Intern",
        location: "Pune, India",
        duration: "6 months",
        stipend: "₹60,000 - ₹75,000/month",
        deadline: "2026-03-05",
        applyUrl: "https://www.nvidia.com/en-us/about-nvidia/careers/",
        skills: ["CUDA", "Python", "Deep Learning", "Computer Vision"],
        type: "Summer 2026"
      },
      {
        id: 3,
        company: "DeepMind",
        position: "AI Research Intern",
        location: "London, UK / Remote",
        duration: "12 weeks",
        stipend: "£4,000 - £5,000/month",
        deadline: "2026-02-20",
        applyUrl: "https://www.deepmind.com/careers",
        skills: ["Machine Learning", "Python", "Research", "Mathematics"],
        type: "Summer 2026"
      },
      {
        id: 4,
        company: "Google AI",
        position: "ML Engineering Intern",
        location: "Bangalore, India",
        duration: "3-4 months",
        stipend: "₹75,000 - ₹90,000/month",
        deadline: "2026-03-15",
        applyUrl: "https://careers.google.com/students/",
        skills: ["TensorFlow", "Python", "ML Algorithms", "Research"],
        type: "Summer 2026"
      }
    ],

    placementGuide: {
      applicationSteps: [
        {
          step: 1,
          title: "Build ML Portfolio",
          description: "Showcase 3-5 end-to-end ML projects on GitHub with detailed README files.",
          icon: "🤖"
        },
        {
          step: 2,
          title: "Publish Research/Articles",
          description: "Write technical blogs on Medium/Towards Data Science, contribute to ML papers.",
          icon: "📝"
        },
        {
          step: 3,
          title: "Compete on Kaggle",
          description: "Participate in Kaggle competitions, aim for at least Expert level (silver medals).",
          icon: "🏆"
        },
        {
          step: 4,
          title: "Network in AI Community",
          description: "Attend AI conferences, join ML Discord/Slack groups, connect with researchers.",
          icon: "🤝"
        },
        {
          step: 5,
          title: "Apply to AI Companies",
          description: "Target AI-first companies, research labs, and tech giants' ML divisions.",
          icon: "🎯"
        }
      ],
      
      topCompanies: [
        {
          name: "OpenAI",
          applyUrl: "https://openai.com/careers/",
          icon: "🧠",
          roles: "ML Engineer, Research Scientist"
        },
        {
          name: "DeepMind",
          applyUrl: "https://www.deepmind.com/careers",
          icon: "🔬",
          roles: "Research Engineer, ML Researcher"
        },
        {
          name: "Google AI",
          applyUrl: "https://careers.google.com/",
          icon: "🔍",
          roles: "ML Engineer, AI Research Scientist"
        },
        {
          name: "Meta AI (FAIR)",
          applyUrl: "https://www.metacareers.com/",
          icon: "👥",
          roles: "Research Scientist, ML Engineer"
        },
        {
          name: "Microsoft Research",
          applyUrl: "https://www.microsoft.com/en-us/research/careers/",
          icon: "🪟",
          roles: "ML Scientist, AI Engineer"
        },
        {
          name: "NVIDIA",
          applyUrl: "https://www.nvidia.com/en-us/about-nvidia/careers/",
          icon: "💚",
          roles: "Deep Learning Engineer, AI Researcher"
        }
      ],
      
      preparationTimeline: [
        {
          month: "Month 1",
          focus: "ML Fundamentals",
          tasks: [
            "Master supervised learning algorithms (Linear/Logistic Regression, Trees, SVM)",
            "Learn mathematics: Linear Algebra, Calculus, Statistics",
            "Complete Andrew Ng's ML course",
            "Start building your first ML project (e.g., classification problem)"
          ],
          color: "green"
        },
        {
          month: "Month 2",
          focus: "Deep Learning & Projects",
          tasks: [
            "Learn Neural Networks, CNNs, RNNs from scratch",
            "Master TensorFlow/PyTorch framework",
            "Build 2-3 deep learning projects (image classification, NLP tasks)",
            "Start participating in Kaggle competitions",
            "Read 5-10 important ML research papers"
          ],
          color: "orange"
        },
        {
          month: "Month 3",
          focus: "Specialization & Applications",
          tasks: [
            "Choose specialization: NLP, Computer Vision, or RL",
            "Build advanced projects in your specialization",
            "Practice ML system design interviews",
            "Prepare portfolio and resume highlighting ML projects",
            "Apply to 15-25 AI/ML companies",
            "Network with ML engineers and researchers"
          ],
          color: "red"
        }
      ],
      
      keyTips: [
        "Strong portfolio > Degrees - showcase real ML projects",
        "Kaggle competitions demonstrate practical ML skills",
        "Read and implement research papers - shows depth",
        "Understand both theory (math) and practice (coding)",
        "Be ready to explain your model choices and tradeoffs",
        "Stay updated with latest AI trends (LLMs, Diffusion Models, etc.)",
        "Contribute to open-source ML projects for visibility",
        "Practice ML system design - increasingly important in interviews"
      ]
    }
  },
  
  "data-science": {
    name: "Data Science & Analytics",
    icon: "📊",
    color: "#f59e0b",
    description: "Analyze data and extract insights using Python, SQL, and visualization",
    
    interviewExperience: [
      {
        id: 1,
        title: "Google Data Scientist Interview Experience",
        youtubeUrl: "https://www.youtube.com/watch?v=1mHjMNZZvFo",
        company: "Google",
        level: "Mid-Level",
        duration: "21:30",
        views: "240K",
        channel: "Data Science Career"
      },
      {
        id: 2,
        title: "Amazon Data Analyst Interview Process",
        youtubeUrl: "https://www.youtube.com/watch?v=BtjJ-BNvAcQ",
        company: "Amazon",
        level: "Entry",
        duration: "18:15",
        views: "150K",
        channel: "Interview Guide"
      }
    ],
    
    leetcodeProblems: [
      {
        id: 1,
        title: "Running Sum of 1d Array",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/running-sum-of-1d-array/",
        frequency: "High",
        companies: ["Amazon", "Google"],
        topics: ["Array", "Prefix Sum"],
        acceptanceRate: 88.9
      },
      {
        id: 2,
        title: "Find Pivot Index",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/find-pivot-index/",
        frequency: "High",
        companies: ["Amazon", "Facebook"],
        topics: ["Array", "Prefix Sum"],
        acceptanceRate: 52.1
      }
    ],
    
    courses: [
      {
        id: 1,
        title: "Data Science Specialization",
        platform: "Coursera (Johns Hopkins)",
        url: "https://www.coursera.org/specializations/jhu-data-science",
        price: "$49/month",
        rating: 4.6,
        students: "400K+",
        instructor: "Johns Hopkins University"
      },
      {
        id: 2,
        title: "Python for Data Science and Machine Learning",
        platform: "Udemy",
        url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
        price: "$12.99",
        rating: 4.6,
        students: "550K+",
        instructor: "Jose Portilla"
      }
    ],
    
    youtubeResources: [
      {
        id: 1,
        title: "Data Analysis with Python",
        channel: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=r-uOLxNrNk8",
        type: "video",
        duration: "4:00:00",
        views: "5M+"
      },
      {
        id: 2,
        title: "Statistics Fundamentals",
        channel: "StatQuest",
        url: "https://www.youtube.com/c/joshstarmer",
        type: "channel",
        subscribers: "900K+",
        videos: "200+"
      }
    ],
    
    roadmap: {
      beginner: ["Python Basics", "SQL", "Excel", "Statistics", "Data Visualization"],
      intermediate: ["Pandas & NumPy", "Advanced SQL", "Tableau/Power BI", "Machine Learning Basics", "A/B Testing"],
      advanced: ["Big Data (Spark)", "Advanced ML", "Deep Learning", "Cloud Platforms", "Business Intelligence"]
    },
    
    books: [
      {
        id: 1,
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        buyLink: "https://www.amazon.com/Python-Data-Analysis-Wrangling-IPython/dp/1491957662",
        price: "$59.99",
        rating: 4.5,
        freeLink: null
      }
    ],
    
    interviewTips: [
      "Master SQL - know joins, subqueries, window functions",
      "Be proficient in Python (Pandas, NumPy, Matplotlib)",
      "Understand statistical concepts deeply",
      "Practice A/B testing problems",
      "Know how to communicate insights to non-technical stakeholders"
    ],

    internships: [
      {
        id: 1,
        company: "Airbnb",
        position: "Data Science Intern",
        location: "Remote",
        duration: "12 weeks",
        stipend: "$7,000 - $9,000/month",
        deadline: "2026-03-15",
        applyUrl: "https://careers.airbnb.com/",
        skills: ["Python", "SQL", "Statistics", "Data Visualization"],
        type: "Summer 2026"
      },
      {
        id: 2,
        company: "Uber",
        position: "Data Analyst Intern",
        location: "Bangalore, India",
        duration: "3 months",
        stipend: "₹50,000 - ₹65,000/month",
        deadline: "2026-03-01",
        applyUrl: "https://www.uber.com/us/en/careers/teams/university/",
        skills: ["SQL", "Python", "Tableau", "A/B Testing"],
        type: "Summer 2026"
      },
      {
        id: 3,
        company: "LinkedIn",
        position: "Business Analytics Intern",
        location: "Bangalore, India",
        duration: "10-12 weeks",
        stipend: "₹55,000 - ₹70,000/month",
        deadline: "2026-03-10",
        applyUrl: "https://careers.linkedin.com/students",
        skills: ["SQL", "Excel", "Python", "Business Intelligence"],
        type: "Summer 2026"
      },
      {
        id: 4,
        company: "Spotify",
        position: "Data Science Intern",
        location: "Remote",
        duration: "12 weeks",
        stipend: "$6,000 - $8,000/month",
        deadline: "2026-03-20",
        applyUrl: "https://www.lifeatspotify.com/jobs",
        skills: ["Python", "SQL", "Machine Learning", "A/B Testing"],
        type: "Summer 2026"
      }
    ],

    placementGuide: {
      applicationSteps: [
        {
          step: 1,
          title: "Build Data Portfolio",
          description: "Create 3-5 end-to-end data analysis projects with visualizations and insights.",
          icon: "📊"
        },
        {
          step: 2,
          title: "Master SQL & Python",
          description: "Practice on platforms like HackerRank, LeetCode SQL, and StrataScratch.",
          icon: "💻"
        },
        {
          step: 3,
          title: "Create Dashboard Projects",
          description: "Build interactive dashboards using Tableau, Power BI, or Python (Plotly/Dash).",
          icon: "📈"
        },
        {
          step: 4,
          title: "Publish Analyses",
          description: "Share insights on GitHub, Kaggle notebooks, or personal blog posts.",
          icon: "📝"
        },
        {
          step: 5,
          title: "Apply Strategically",
          description: "Target data analyst, data scientist roles at tech companies and startups.",
          icon: "🎯"
        }
      ],
      
      topCompanies: [
        {
          name: "Airbnb",
          applyUrl: "https://careers.airbnb.com/",
          icon: "🏠",
          roles: "Data Scientist, Analytics Engineer"
        },
        {
          name: "Uber",
          applyUrl: "https://www.uber.com/us/en/careers/",
          icon: "🚗",
          roles: "Data Analyst, Data Scientist"
        },
        {
          name: "Netflix",
          applyUrl: "https://jobs.netflix.com/",
          icon: "🎬",
          roles: "Data Engineer, Analytics"
        },
        {
          name: "LinkedIn",
          applyUrl: "https://careers.linkedin.com/",
          icon: "💼",
          roles: "Data Scientist, BI Analyst"
        },
        {
          name: "Spotify",
          applyUrl: "https://www.lifeatspotify.com/jobs",
          icon: "🎵",
          roles: "Data Scientist, ML Engineer"
        },
        {
          name: "Amazon",
          applyUrl: "https://www.amazon.jobs/",
          icon: "📦",
          roles: "Business Analyst, Data Scientist"
        }
      ],
      
      preparationTimeline: [
        {
          month: "Month 1",
          focus: "Fundamentals & Tools",
          tasks: [
            "Master Python (Pandas, NumPy, Matplotlib, Seaborn)",
            "Learn SQL (joins, aggregations, window functions, CTEs)",
            "Study statistics (hypothesis testing, distributions, correlation)",
            "Complete 1-2 exploratory data analysis projects",
            "Start learning Excel/Google Sheets advanced features"
          ],
          color: "green"
        },
        {
          month: "Month 2",
          focus: "Visualization & ML",
          tasks: [
            "Master Tableau or Power BI (create 2-3 dashboards)",
            "Learn basic machine learning (regression, classification)",
            "Practice A/B testing and experimental design",
            "Work on 2-3 business analytics case studies",
            "Practice SQL problems on StrataScratch/LeetCode"
          ],
          color: "orange"
        },
        {
          month: "Month 3",
          focus: "Interview Prep & Applications",
          tasks: [
            "Practice case interview questions (product metrics, business scenarios)",
            "Prepare to explain insights from your projects",
            "Mock interviews for behavioral questions",
            "Build complete portfolio website showcasing projects",
            "Apply to 20-30 data analyst/scientist positions",
            "Network with data professionals on LinkedIn"
          ],
          color: "red"
        }
      ],
      
      keyTips: [
        "SQL proficiency is non-negotiable - practice daily",
        "Storytelling with data is crucial - practice presentations",
        "Understand business context - data science is about impact",
        "Build projects with real datasets (not just toy datasets)",
        "Learn both technical skills and domain knowledge",
        "Practice explaining statistical concepts simply",
        "Visualizations should tell a story - not just show data",
        "Be ready for case interviews - practice with real scenarios"
      ]
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = domainResources;
}
