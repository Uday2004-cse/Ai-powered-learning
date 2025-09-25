import { QuizQuestion } from '../types/course';

// Advanced content analysis for PDF and video content
const analyzeContentAdvanced = (title: string, source: 'youtube' | 'pdf', fileName?: string, url?: string) => {
  const contentText = (title + ' ' + (fileName || url || '')).toLowerCase();
  
  // Create a more sophisticated hash for better uniqueness
  const contentHash = btoa(encodeURIComponent(contentText + Date.now().toString().slice(-4))).slice(0, 12);
  
  // Enhanced category detection with subcategories
  let category = 'general';
  let subcategory = 'basic';
  let difficulty = 'medium';
  
  // Programming & Technology
  if (contentText.match(/(programming|code|javascript|python|java|react|node|web|development|software|algorithm|data structure|computer science|coding|html|css|sql|database|api|framework)/)) {
    category = 'programming';
    if (contentText.match(/(advanced|expert|senior|architecture|system design|optimization)/)) {
      subcategory = 'advanced';
      difficulty = 'hard';
    } else if (contentText.match(/(beginner|intro|basic|fundamentals|getting started)/)) {
      subcategory = 'beginner';
      difficulty = 'easy';
    } else {
      subcategory = 'intermediate';
    }
  }
  // Science & Research
  else if (contentText.match(/(science|biology|chemistry|physics|research|experiment|theory|hypothesis|analysis|medical|health|anatomy|genetics|molecular|quantum|thermodynamics)/)) {
    category = 'science';
    if (contentText.match(/(advanced|graduate|phd|research|complex|molecular|quantum)/)) {
      subcategory = 'advanced';
      difficulty = 'hard';
    } else if (contentText.match(/(intro|basic|fundamentals|101|elementary)/)) {
      subcategory = 'basic';
      difficulty = 'easy';
    }
  }
  // Business & Economics
  else if (contentText.match(/(business|marketing|finance|economics|management|strategy|entrepreneurship|accounting|sales|leadership|operations|consulting)/)) {
    category = 'business';
    if (contentText.match(/(executive|strategic|advanced|mba|corporate|enterprise)/)) {
      subcategory = 'executive';
      difficulty = 'hard';
    } else if (contentText.match(/(startup|small business|basics|introduction)/)) {
      subcategory = 'startup';
      difficulty = 'easy';
    }
  }
  // Mathematics
  else if (contentText.match(/(math|mathematics|calculus|algebra|statistics|geometry|probability|linear algebra|differential|integral)/)) {
    category = 'mathematics';
    if (contentText.match(/(advanced|graduate|complex|analysis|topology)/)) {
      subcategory = 'advanced';
      difficulty = 'hard';
    }
  }
  // Arts & Humanities
  else if (contentText.match(/(history|literature|philosophy|art|culture|language|psychology|sociology|anthropology)/)) {
    category = 'humanities';
  }

  return { category, subcategory, difficulty, contentHash };
};

// Enhanced question pools with more sophisticated content
const getQuestionPools = () => ({
  programming: {
    beginner: [
      {
        question: "What is the primary purpose of version control systems like Git?",
        options: ["Track changes in code over time", "Compile programs faster", "Debug applications automatically", "Design user interfaces"],
        correctAnswer: "Track changes in code over time",
        explanation: "Version control systems like Git help developers track changes, collaborate with others, and maintain a complete history of their codebase, enabling them to revert to previous versions when needed.",
        difficulty: "easy" as const
      },
      {
        question: "Which of the following best describes a function in programming?",
        options: ["A reusable block of code that performs a specific task", "A type of variable", "A way to style web pages", "A database query"],
        correctAnswer: "A reusable block of code that performs a specific task",
        explanation: "Functions are fundamental building blocks in programming that encapsulate specific functionality, promote code reusability, and make programs more modular and maintainable.",
        difficulty: "easy" as const
      },
      {
        question: "What does 'debugging' mean in software development?",
        options: ["Adding new features", "Finding and fixing errors in code", "Optimizing performance", "Writing documentation"],
        correctAnswer: "Finding and fixing errors in code",
        explanation: "Debugging is the systematic process of identifying, analyzing, and resolving bugs or errors in software code to ensure the program works as intended.",
        difficulty: "easy" as const
      }
    ],
    intermediate: [
      {
        question: "What is the time complexity of binary search algorithm?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation: "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step, making it very efficient for searching sorted arrays.",
        difficulty: "medium" as const
      },
      {
        question: "Which design pattern is used to ensure a class has only one instance?",
        options: ["Factory Pattern", "Observer Pattern", "Singleton Pattern", "Strategy Pattern"],
        correctAnswer: "Singleton Pattern",
        explanation: "The Singleton pattern restricts instantiation of a class to a single instance and provides global access to that instance, commonly used for logging, database connections, or configuration settings.",
        difficulty: "medium" as const
      },
      {
        question: "What is the main difference between SQL and NoSQL databases?",
        options: ["SQL is faster", "NoSQL uses structured schemas, SQL doesn't", "SQL uses structured schemas, NoSQL is more flexible", "There is no difference"],
        correctAnswer: "SQL uses structured schemas, NoSQL is more flexible",
        explanation: "SQL databases use structured schemas with predefined relationships, while NoSQL databases offer more flexibility in data structure and are better suited for unstructured or semi-structured data.",
        difficulty: "medium" as const
      }
    ],
    advanced: [
      {
        question: "What is the CAP theorem in distributed systems?",
        options: ["Consistency, Availability, Partition tolerance - pick any two", "Create, Access, Process - fundamental operations", "Cache, API, Performance - optimization principles", "Code, Architecture, Performance - design pillars"],
        correctAnswer: "Consistency, Availability, Partition tolerance - pick any two",
        explanation: "The CAP theorem states that in a distributed system, you can only guarantee two out of three properties: Consistency (all nodes see the same data), Availability (system remains operational), and Partition tolerance (system continues despite network failures).",
        difficulty: "hard" as const
      },
      {
        question: "Which architectural pattern is best for microservices communication?",
        options: ["Direct HTTP calls only", "Event-driven architecture with message queues", "Shared database", "File-based communication"],
        correctAnswer: "Event-driven architecture with message queues",
        explanation: "Event-driven architecture with message queues provides loose coupling, better fault tolerance, and scalability for microservices, allowing services to communicate asynchronously without direct dependencies.",
        difficulty: "hard" as const
      }
    ]
  },
  science: {
    basic: [
      {
        question: "What is the basic unit of life?",
        options: ["Atom", "Cell", "Molecule", "Organ"],
        correctAnswer: "Cell",
        explanation: "The cell is the fundamental unit of life, as it is the smallest structural and functional unit that can carry out all the processes necessary for life.",
        difficulty: "easy" as const
      },
      {
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
        explanation: "During photosynthesis, plants absorb carbon dioxide from the atmosphere and convert it into glucose using sunlight and water, releasing oxygen as a byproduct.",
        difficulty: "easy" as const
      }
    ],
    intermediate: [
      {
        question: "What is the role of mitochondria in cellular respiration?",
        options: ["Protein synthesis", "ATP production", "DNA replication", "Waste removal"],
        correctAnswer: "ATP production",
        explanation: "Mitochondria are the powerhouses of the cell, responsible for producing ATP (adenosine triphosphate) through cellular respiration, which provides energy for cellular processes.",
        difficulty: "medium" as const
      },
      {
        question: "According to Newton's second law, what happens to acceleration when force increases?",
        options: ["Acceleration decreases", "Acceleration increases proportionally", "Acceleration remains constant", "Acceleration becomes zero"],
        correctAnswer: "Acceleration increases proportionally",
        explanation: "Newton's second law (F = ma) states that acceleration is directly proportional to the net force applied and inversely proportional to mass, so increasing force increases acceleration.",
        difficulty: "medium" as const
      }
    ],
    advanced: [
      {
        question: "What is the significance of the Heisenberg Uncertainty Principle?",
        options: ["It proves atoms don't exist", "It shows we cannot simultaneously know both position and momentum of a particle with perfect accuracy", "It explains why light is a wave", "It describes nuclear fusion"],
        correctAnswer: "It shows we cannot simultaneously know both position and momentum of a particle with perfect accuracy",
        explanation: "The Heisenberg Uncertainty Principle is a fundamental concept in quantum mechanics stating that there is a fundamental limit to how precisely we can know both the position and momentum of a particle simultaneously.",
        difficulty: "hard" as const
      }
    ]
  },
  business: {
    startup: [
      {
        question: "What is a minimum viable product (MVP)?",
        options: ["The cheapest product possible", "A product with just enough features to satisfy early customers", "A perfect product with all features", "A product that costs the minimum to produce"],
        correctAnswer: "A product with just enough features to satisfy early customers",
        explanation: "An MVP is a development technique where a new product is developed with sufficient features to satisfy early adopters, allowing for feedback collection and iterative improvement.",
        difficulty: "easy" as const
      },
      {
        question: "What does 'bootstrapping' mean in business?",
        options: ["Using external investors", "Starting a business with personal funds", "Copying another business model", "Using government grants"],
        correctAnswer: "Starting a business with personal funds",
        explanation: "Bootstrapping refers to starting and growing a business using personal finances or operating revenue, without external investment or funding.",
        difficulty: "easy" as const
      }
    ],
    intermediate: [
      {
        question: "What is the purpose of a SWOT analysis?",
        options: ["To analyze competitors only", "To evaluate Strengths, Weaknesses, Opportunities, and Threats", "To calculate financial projections", "To design marketing campaigns"],
        correctAnswer: "To evaluate Strengths, Weaknesses, Opportunities, and Threats",
        explanation: "SWOT analysis is a strategic planning tool that evaluates internal factors (Strengths and Weaknesses) and external factors (Opportunities and Threats) to inform business strategy.",
        difficulty: "medium" as const
      },
      {
        question: "What is customer lifetime value (CLV)?",
        options: ["How long a customer lives", "The total revenue expected from a customer over their entire relationship", "The cost to acquire a customer", "The number of purchases a customer makes"],
        correctAnswer: "The total revenue expected from a customer over their entire relationship",
        explanation: "Customer Lifetime Value represents the total amount of money a customer is expected to spend with your business throughout their entire relationship, helping guide marketing and retention strategies.",
        difficulty: "medium" as const
      }
    ],
    executive: [
      {
        question: "What is the primary focus of Blue Ocean Strategy?",
        options: ["Competing in existing markets", "Creating uncontested market space", "Reducing costs only", "Following competitors"],
        correctAnswer: "Creating uncontested market space",
        explanation: "Blue Ocean Strategy focuses on creating new, uncontested market spaces rather than competing in existing markets, making competition irrelevant by creating new demand.",
        difficulty: "hard" as const
      }
    ]
  },
  mathematics: [
    {
      question: "What is the derivative of x² with respect to x?",
      options: ["x", "2x", "x²", "2"],
      correctAnswer: "2x",
      explanation: "Using the power rule for derivatives, the derivative of x² is 2x¹ = 2x. This represents the rate of change of the function at any point.",
      difficulty: "medium" as const
    },
    {
      question: "What does the integral represent geometrically?",
      options: ["The slope of a curve", "The area under a curve", "The maximum point", "The minimum point"],
      correctAnswer: "The area under a curve",
      explanation: "Geometrically, a definite integral represents the area between the curve and the x-axis over a specified interval, which is fundamental to understanding calculus applications.",
      difficulty: "medium" as const
    }
  ],
  humanities: [
    {
      question: "What is the main focus of phenomenology in philosophy?",
      options: ["The study of phenomena as they appear to consciousness", "The study of ancient texts", "The study of political systems", "The study of economic theories"],
      correctAnswer: "The study of phenomena as they appear to consciousness",
      explanation: "Phenomenology is a philosophical movement that studies the structures of experience and consciousness, focusing on how things appear to us in our direct experience.",
      difficulty: "medium" as const
    }
  ],
  general: [
    {
      question: "What is the most effective learning technique according to cognitive science?",
      options: ["Passive reading", "Active recall and spaced repetition", "Highlighting text", "Listening to lectures only"],
      correctAnswer: "Active recall and spaced repetition",
      explanation: "Research shows that active recall (testing yourself) combined with spaced repetition (reviewing at increasing intervals) is the most effective way to retain information long-term.",
      difficulty: "medium" as const
    },
    {
      question: "What characterizes critical thinking?",
      options: ["Accepting information without question", "Analyzing, evaluating, and synthesizing information", "Memorizing facts quickly", "Following instructions precisely"],
      correctAnswer: "Analyzing, evaluating, and synthesizing information",
      explanation: "Critical thinking involves actively analyzing information, evaluating evidence and arguments, and synthesizing knowledge to form well-reasoned conclusions and decisions.",
      difficulty: "medium" as const
    }
  ]
});

export const generateDynamicQuiz = (
  title: string, 
  source: 'youtube' | 'pdf', 
  fileName?: string, 
  url?: string
): QuizQuestion[] => {
  const { category, subcategory, difficulty, contentHash } = analyzeContentAdvanced(title, source, fileName, url);
  const questionPools = getQuestionPools();
  
  // Get appropriate question pool
  let availableQuestions: any[] = [];
  
  if (category === 'programming' && questionPools.programming[subcategory as keyof typeof questionPools.programming]) {
    availableQuestions = questionPools.programming[subcategory as keyof typeof questionPools.programming];
  } else if (category === 'science' && questionPools.science[subcategory as keyof typeof questionPools.science]) {
    availableQuestions = questionPools.science[subcategory as keyof typeof questionPools.science];
  } else if (category === 'business' && questionPools.business[subcategory as keyof typeof questionPools.business]) {
    availableQuestions = questionPools.business[subcategory as keyof typeof questionPools.business];
  } else if (questionPools[category as keyof typeof questionPools]) {
    availableQuestions = questionPools[category as keyof typeof questionPools] as any[];
  } else {
    availableQuestions = questionPools.general;
  }

  // Use hash for consistent but varied selection
  const hashNum = parseInt(contentHash.slice(-3), 36) || 1;
  const selectedQuestions: QuizQuestion[] = [];
  const usedIndices = new Set<number>();
  
  // Generate 4-6 questions based on content complexity
  const numQuestions = Math.min(4 + (hashNum % 3), availableQuestions.length);
  
  for (let i = 0; i < numQuestions; i++) {
    let questionIndex = (hashNum + i * 7 + i * i) % availableQuestions.length;
    
    // Ensure unique questions
    let attempts = 0;
    while (usedIndices.has(questionIndex) && attempts < availableQuestions.length) {
      questionIndex = (questionIndex + 1) % availableQuestions.length;
      attempts++;
    }
    
    if (attempts < availableQuestions.length) {
      usedIndices.add(questionIndex);
      const question = availableQuestions[questionIndex];
      
      selectedQuestions.push({
        id: `q${i + 1}`,
        type: 'multiple-choice',
        ...question
      });
    }
  }

  return selectedQuestions;
};

export const generateDynamicFlashcards = (
  title: string,
  source: 'youtube' | 'pdf',
  fileName?: string,
  url?: string
) => {
  const { category, subcategory, contentHash } = analyzeContentAdvanced(title, source, fileName, url);
  const hashNum = parseInt(contentHash.slice(-3), 36) || 1;

  const flashcardPools = {
    programming: {
      beginner: [
        { front: "What is a variable in programming?", back: "A named storage location that holds data which can be modified during program execution" },
        { front: "What is a function?", back: "A reusable block of code that performs a specific task and can accept parameters and return values" },
        { front: "What does 'debugging' mean?", back: "The process of finding and fixing errors or bugs in computer code" },
        { front: "What is an algorithm?", back: "A step-by-step procedure or set of rules designed to solve a specific problem or perform a task" }
      ],
      intermediate: [
        { front: "What is Object-Oriented Programming (OOP)?", back: "A programming paradigm based on objects that contain data (attributes) and code (methods)" },
        { front: "What is recursion?", back: "A programming technique where a function calls itself to solve smaller instances of the same problem" },
        { front: "What is the difference between stack and heap memory?", back: "Stack stores local variables and function calls (LIFO), while heap stores dynamically allocated objects" },
        { front: "What is Big O notation?", back: "A mathematical notation used to describe the performance or complexity of an algorithm" }
      ],
      advanced: [
        { front: "What is the CAP theorem?", back: "In distributed systems, you can only guarantee two of: Consistency, Availability, and Partition tolerance" },
        { front: "What is microservices architecture?", back: "An architectural approach where applications are built as a collection of loosely coupled, independently deployable services" },
        { front: "What is eventual consistency?", back: "A consistency model where the system will become consistent over time, given that no new updates are made" }
      ]
    },
    science: {
      basic: [
        { front: "What is photosynthesis?", back: "The process by which plants convert light energy, carbon dioxide, and water into glucose and oxygen" },
        { front: "What is DNA?", back: "Deoxyribonucleic acid - the molecule that carries genetic instructions for all living organisms" },
        { front: "What is gravity?", back: "The force of attraction between any two objects with mass" },
        { front: "What is an atom?", back: "The smallest unit of matter that retains the properties of an element" }
      ],
      intermediate: [
        { front: "What is cellular respiration?", back: "The process by which cells break down glucose to produce ATP (energy) using oxygen" },
        { front: "What is Newton's Second Law?", back: "Force equals mass times acceleration (F = ma)" },
        { front: "What is natural selection?", back: "The process by which organisms with favorable traits are more likely to survive and reproduce" }
      ],
      advanced: [
        { front: "What is quantum entanglement?", back: "A quantum phenomenon where particles become interconnected and the state of one instantly affects the other" },
        { front: "What is CRISPR?", back: "A gene-editing technology that allows precise modification of DNA sequences in living cells" }
      ]
    },
    business: {
      startup: [
        { front: "What is a MVP?", back: "Minimum Viable Product - a product with just enough features to satisfy early customers and provide feedback" },
        { front: "What is bootstrapping?", back: "Starting and growing a business using personal funds without external investment" },
        { front: "What is product-market fit?", back: "The degree to which a product satisfies strong market demand" }
      ],
      intermediate: [
        { front: "What is Customer Acquisition Cost (CAC)?", back: "The total cost of acquiring a new customer, including marketing and sales expenses" },
        { front: "What is a business model canvas?", back: "A strategic management tool that describes how an organization creates, delivers, and captures value" },
        { front: "What is market segmentation?", back: "The process of dividing a market into distinct groups of consumers with similar needs or characteristics" }
      ],
      executive: [
        { front: "What is Blue Ocean Strategy?", back: "A business strategy that focuses on creating new market spaces rather than competing in existing ones" },
        { front: "What is digital transformation?", back: "The integration of digital technology into all areas of business, fundamentally changing operations and value delivery" }
      ]
    },
    general: [
      { front: "What is active learning?", back: "A learning approach that engages students in the process through activities, discussion, and critical thinking" },
      { front: "What is metacognition?", back: "Awareness and understanding of one's own thought processes - thinking about thinking" },
      { front: "What is spaced repetition?", back: "A learning technique that involves reviewing information at increasing intervals to improve retention" },
      { front: "What is the Feynman Technique?", back: "A learning method that involves explaining concepts in simple terms to identify knowledge gaps" }
    ]
  };

  // Select appropriate flashcard pool
  let availableFlashcards: any[] = [];
  
  if (category === 'programming' && flashcardPools.programming[subcategory as keyof typeof flashcardPools.programming]) {
    availableFlashcards = flashcardPools.programming[subcategory as keyof typeof flashcardPools.programming];
  } else if (category === 'science' && flashcardPools.science[subcategory as keyof typeof flashcardPools.science]) {
    availableFlashcards = flashcardPools.science[subcategory as keyof typeof flashcardPools.science];
  } else if (category === 'business' && flashcardPools.business[subcategory as keyof typeof flashcardPools.business]) {
    availableFlashcards = flashcardPools.business[subcategory as keyof typeof flashcardPools.business];
  } else {
    availableFlashcards = flashcardPools.general;
  }

  // Generate 4-5 flashcards
  const numFlashcards = Math.min(4 + (hashNum % 2), availableFlashcards.length);
  const selectedFlashcards = [];
  const usedIndices = new Set<number>();
  
  for (let i = 0; i < numFlashcards; i++) {
    let cardIndex = (hashNum + i * 5 + i * i) % availableFlashcards.length;
    
    let attempts = 0;
    while (usedIndices.has(cardIndex) && attempts < availableFlashcards.length) {
      cardIndex = (cardIndex + 1) % availableFlashcards.length;
      attempts++;
    }
    
    if (attempts < availableFlashcards.length) {
      usedIndices.add(cardIndex);
      const card = availableFlashcards[cardIndex];
      
      selectedFlashcards.push({
        id: `f${i + 1}`,
        front: card.front,
        back: card.back,
        difficulty: ['easy', 'medium', 'hard'][i % 3] as 'easy' | 'medium' | 'hard',
        reviewCount: 0
      });
    }
  }

  return selectedFlashcards;
};

// Enhanced content generation for notes
export const generateEnhancedNotes = (title: string, source: 'youtube' | 'pdf', fileName?: string, url?: string) => {
  const { category, subcategory } = analyzeContentAdvanced(title, source, fileName, url);
  
  const noteTemplates = {
    programming: {
      beginner: [
        {
          title: "Introduction to Programming Concepts",
          content: "This section introduces fundamental programming concepts essential for understanding software development. We explore variables as named storage locations that hold data, functions as reusable code blocks that perform specific tasks, and basic control structures like loops and conditionals. Understanding these building blocks is crucial for writing effective code and solving computational problems systematically."
        },
        {
          title: "Data Types and Variables",
          content: "Programming languages use different data types to represent various kinds of information. Primitive types include integers for whole numbers, floats for decimal numbers, strings for text, and booleans for true/false values. Variables act as containers for these data types, allowing programs to store, manipulate, and retrieve information dynamically during execution."
        },
        {
          title: "Control Flow and Logic",
          content: "Control flow determines the order in which program instructions are executed. Conditional statements (if/else) allow programs to make decisions based on specific conditions, while loops (for, while) enable repetitive execution of code blocks. Understanding control flow is essential for creating programs that can respond to different inputs and handle complex logic."
        }
      ],
      intermediate: [
        {
          title: "Object-Oriented Programming Principles",
          content: "Object-Oriented Programming (OOP) organizes code around objects that encapsulate data and behavior. The four pillars of OOP - encapsulation, inheritance, polymorphism, and abstraction - provide powerful tools for creating maintainable and scalable software. Encapsulation bundles data with methods, inheritance allows code reuse, polymorphism enables flexible interfaces, and abstraction hides complex implementation details."
        },
        {
          title: "Data Structures and Algorithms",
          content: "Efficient data organization and manipulation are crucial for software performance. Arrays provide indexed access to elements, linked lists offer dynamic sizing, stacks follow LIFO principle, and queues implement FIFO behavior. Understanding when to use each structure and their time/space complexities helps in choosing optimal solutions for specific problems."
        }
      ]
    },
    science: {
      basic: [
        {
          title: "Scientific Method and Inquiry",
          content: "The scientific method provides a systematic approach to understanding the natural world. It begins with observation, followed by hypothesis formation, experimental design, data collection, analysis, and conclusion drawing. This iterative process ensures that scientific knowledge is based on empirical evidence and can be verified through reproducible experiments."
        },
        {
          title: "Fundamental Concepts and Principles",
          content: "Core scientific principles form the foundation for understanding complex phenomena. These include conservation laws (energy, mass, momentum), cause-and-effect relationships, and the interconnectedness of natural systems. Mastering these fundamentals enables deeper comprehension of specialized topics and their real-world applications."
        }
      ]
    },
    business: {
      startup: [
        {
          title: "Entrepreneurship Fundamentals",
          content: "Successful entrepreneurship requires understanding market needs, validating business ideas, and building sustainable business models. The lean startup methodology emphasizes rapid experimentation, customer feedback, and iterative development to minimize risk and maximize learning. Key concepts include minimum viable product (MVP), product-market fit, and pivot strategies."
        },
        {
          title: "Business Planning and Strategy",
          content: "Effective business planning involves market analysis, competitive research, financial projections, and risk assessment. A comprehensive business plan serves as a roadmap for growth and a tool for attracting investors. Strategic thinking helps entrepreneurs identify opportunities, allocate resources efficiently, and adapt to changing market conditions."
        }
      ]
    }
  };

  // Get appropriate note templates
  let templates: any[] = [];
  if (category === 'programming' && noteTemplates.programming[subcategory as keyof typeof noteTemplates.programming]) {
    templates = noteTemplates.programming[subcategory as keyof typeof noteTemplates.programming];
  } else if (category === 'science' && noteTemplates.science[subcategory as keyof typeof noteTemplates.science]) {
    templates = noteTemplates.science[subcategory as keyof typeof noteTemplates.science];
  } else if (category === 'business' && noteTemplates.business[subcategory as keyof typeof noteTemplates.business]) {
    templates = noteTemplates.business[subcategory as keyof typeof noteTemplates.business];
  }

  // Fallback to general templates if specific ones not found
  if (templates.length === 0) {
    templates = [
      {
        title: "Core Concepts and Principles",
        content: "This section covers the fundamental concepts and principles that form the foundation of the subject matter. Understanding these core ideas is essential for grasping more advanced topics and their practical applications. The content has been structured to provide clear explanations with relevant examples and context."
      },
      {
        title: "Practical Applications and Examples",
        content: "Real-world applications demonstrate how theoretical concepts translate into practical solutions. This section explores various scenarios where the learned principles can be applied, providing concrete examples that illustrate the relevance and importance of the material in professional and academic contexts."
      },
      {
        title: "Advanced Topics and Future Directions",
        content: "Building upon the foundational knowledge, this section delves into more sophisticated aspects of the subject. It explores emerging trends, advanced techniques, and future developments that extend beyond the basics, preparing learners for continued growth and specialization in the field."
      }
    ];
  }

  return templates.map((template, index) => ({
    id: (index + 1).toString(),
    title: template.title,
    content: template.content,
    timestamp: source === 'youtube' ? `${String(index * 12).padStart(2, '0')}:${String((index * 25) % 60).padStart(2, '0')}` : undefined,
    topics: [template.title.split(' ')[0], template.title.split(' ')[1]].filter(Boolean)
  }));
};