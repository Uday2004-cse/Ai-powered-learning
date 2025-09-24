import { QuizQuestion } from '../types/course';

// Simulated content analysis for different types of content
const analyzeContent = (content: string, source: 'youtube' | 'pdf', fileName?: string, url?: string) => {
  // Create a hash of the content to ensure consistent but different quizzes
  const contentHash = btoa(content + (fileName || url || '')).slice(0, 10);
  
  // Different question pools based on content type and hash
  const questionPools = {
    programming: [
      {
        question: "What is the primary purpose of version control systems?",
        options: ["Track code changes", "Compile programs", "Debug applications", "Design interfaces"],
        correctAnswer: "Track code changes",
        explanation: "Version control systems like Git help developers track changes, collaborate, and maintain code history.",
        difficulty: "easy" as const
      },
      {
        question: "Which programming paradigm focuses on objects and classes?",
        options: ["Functional", "Object-Oriented", "Procedural", "Logic"],
        correctAnswer: "Object-Oriented",
        explanation: "Object-Oriented Programming (OOP) organizes code around objects that contain data and methods.",
        difficulty: "medium" as const
      },
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Instruction", "Application Process Interface"],
        correctAnswer: "Application Programming Interface",
        explanation: "API stands for Application Programming Interface, which defines how software components communicate.",
        difficulty: "easy" as const
      }
    ],
    science: [
      {
        question: "What is the fundamental unit of heredity?",
        options: ["Gene", "Chromosome", "DNA", "Protein"],
        correctAnswer: "Gene",
        explanation: "Genes are the basic units of heredity that carry genetic information from parents to offspring.",
        difficulty: "medium" as const
      },
      {
        question: "Which law states that energy cannot be created or destroyed?",
        options: ["Newton's First Law", "Law of Conservation of Energy", "Boyle's Law", "Ohm's Law"],
        correctAnswer: "Law of Conservation of Energy",
        explanation: "The Law of Conservation of Energy states that energy can only be transformed from one form to another.",
        difficulty: "medium" as const
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au",
        explanation: "Au comes from the Latin word 'aurum' meaning gold.",
        difficulty: "easy" as const
      }
    ],
    business: [
      {
        question: "What does ROI stand for in business?",
        options: ["Return on Investment", "Rate of Interest", "Revenue over Income", "Risk of Investment"],
        correctAnswer: "Return on Investment",
        explanation: "ROI measures the efficiency of an investment by comparing the return to the cost.",
        difficulty: "easy" as const
      },
      {
        question: "Which financial statement shows a company's profitability?",
        options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Equity"],
        correctAnswer: "Income Statement",
        explanation: "The Income Statement shows revenues, expenses, and net income over a specific period.",
        difficulty: "medium" as const
      },
      {
        question: "What is market segmentation?",
        options: ["Dividing markets into groups", "Setting product prices", "Managing inventory", "Hiring employees"],
        correctAnswer: "Dividing markets into groups",
        explanation: "Market segmentation involves dividing a market into distinct groups of consumers with similar needs.",
        difficulty: "medium" as const
      }
    ],
    general: [
      {
        question: "What is the main topic discussed in this content?",
        options: ["Theoretical concepts", "Practical applications", "Historical context", "Future implications"],
        correctAnswer: "Theoretical concepts",
        explanation: "The content primarily focuses on explaining fundamental theoretical concepts in the subject area.",
        difficulty: "easy" as const
      },
      {
        question: "Which approach is emphasized for understanding the material?",
        options: ["Memorization", "Critical thinking", "Repetition", "Passive reading"],
        correctAnswer: "Critical thinking",
        explanation: "The material emphasizes the importance of critical thinking and analysis for deep understanding.",
        difficulty: "medium" as const
      },
      {
        question: "What is the recommended method for applying these concepts?",
        options: ["Theory only", "Practice and application", "Discussion only", "Reading more"],
        correctAnswer: "Practice and application",
        explanation: "The content suggests that practical application is essential for mastering the concepts.",
        difficulty: "medium" as const
      }
    ]
  };

  // Determine content category based on filename, URL, or content analysis
  let category = 'general';
  const lowerContent = (fileName || url || content).toLowerCase();
  
  if (lowerContent.includes('programming') || lowerContent.includes('code') || lowerContent.includes('javascript') || lowerContent.includes('python') || lowerContent.includes('development')) {
    category = 'programming';
  } else if (lowerContent.includes('science') || lowerContent.includes('biology') || lowerContent.includes('chemistry') || lowerContent.includes('physics')) {
    category = 'science';
  } else if (lowerContent.includes('business') || lowerContent.includes('marketing') || lowerContent.includes('finance') || lowerContent.includes('management')) {
    category = 'business';
  }

  return { category, contentHash };
};

export const generateDynamicQuiz = (
  title: string, 
  source: 'youtube' | 'pdf', 
  fileName?: string, 
  url?: string
): QuizQuestion[] => {
  const { category, contentHash } = analyzeContent(title, source, fileName, url);
  
  // Use content hash to select different questions each time
  const hashNum = parseInt(contentHash.slice(-2), 36) || 1;
  
  const questionPools = {
    programming: [
      {
        question: "What is the primary benefit of using functions in programming?",
        options: ["Code reusability", "Faster execution", "Less memory usage", "Better graphics"],
        correctAnswer: "Code reusability",
        explanation: "Functions allow code to be written once and used multiple times, improving maintainability.",
        difficulty: "easy" as const
      },
      {
        question: "Which data structure follows LIFO (Last In, First Out) principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack",
        explanation: "A stack follows LIFO principle where the last element added is the first one to be removed.",
        difficulty: "medium" as const
      },
      {
        question: "What does debugging mean in programming?",
        options: ["Writing new code", "Finding and fixing errors", "Optimizing performance", "Adding features"],
        correctAnswer: "Finding and fixing errors",
        explanation: "Debugging is the process of identifying, analyzing, and removing errors from code.",
        difficulty: "easy" as const
      },
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation: "Binary search has O(log n) time complexity as it eliminates half the search space in each step.",
        difficulty: "hard" as const
      },
      {
        question: "Which principle suggests that software entities should be open for extension but closed for modification?",
        options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation"],
        correctAnswer: "Open/Closed",
        explanation: "The Open/Closed Principle states that classes should be open for extension but closed for modification.",
        difficulty: "hard" as const
      }
    ],
    science: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        correctAnswer: "Mitochondria",
        explanation: "Mitochondria produce ATP, the energy currency of cells, earning them the nickname 'powerhouse of the cell'.",
        difficulty: "easy" as const
      },
      {
        question: "What is the speed of light in vacuum?",
        options: ["300,000 km/s", "299,792,458 m/s", "186,000 miles/s", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "The speed of light is approximately 299,792,458 m/s, which equals about 300,000 km/s or 186,000 miles/s.",
        difficulty: "medium" as const
      },
      {
        question: "Which gas makes up approximately 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: "Nitrogen",
        explanation: "Nitrogen (N₂) comprises about 78% of Earth's atmosphere, with oxygen making up about 21%.",
        difficulty: "easy" as const
      },
      {
        question: "What is the pH of pure water at 25°C?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "7",
        explanation: "Pure water has a pH of 7 at 25°C, which is considered neutral on the pH scale.",
        difficulty: "medium" as const
      },
      {
        question: "Which particle has no electric charge?",
        options: ["Proton", "Electron", "Neutron", "Ion"],
        correctAnswer: "Neutron",
        explanation: "Neutrons are electrically neutral particles found in atomic nuclei alongside protons.",
        difficulty: "easy" as const
      }
    ],
    business: [
      {
        question: "What is the break-even point?",
        options: ["Maximum profit", "Zero profit or loss", "Minimum revenue", "Maximum cost"],
        correctAnswer: "Zero profit or loss",
        explanation: "The break-even point is where total revenue equals total costs, resulting in zero profit or loss.",
        difficulty: "medium" as const
      },
      {
        question: "What does SWOT analysis stand for?",
        options: ["Strengths, Weaknesses, Opportunities, Threats", "Sales, Workforce, Operations, Technology", "Strategy, Work, Objectives, Timeline", "Systems, Workflow, Organization, Training"],
        correctAnswer: "Strengths, Weaknesses, Opportunities, Threats",
        explanation: "SWOT analysis evaluates internal Strengths and Weaknesses, and external Opportunities and Threats.",
        difficulty: "easy" as const
      },
      {
        question: "What is market capitalization?",
        options: ["Company's total debt", "Company's annual revenue", "Total value of company's shares", "Company's profit margin"],
        correctAnswer: "Total value of company's shares",
        explanation: "Market capitalization is calculated by multiplying the stock price by the number of outstanding shares.",
        difficulty: "medium" as const
      },
      {
        question: "What is the primary goal of supply chain management?",
        options: ["Reduce costs only", "Increase speed only", "Optimize efficiency and customer satisfaction", "Eliminate suppliers"],
        correctAnswer: "Optimize efficiency and customer satisfaction",
        explanation: "Supply chain management aims to optimize the flow of goods and services while meeting customer needs efficiently.",
        difficulty: "medium" as const
      },
      {
        question: "What does B2B stand for in business?",
        options: ["Business to Business", "Back to Basics", "Buy to Build", "Brand to Brand"],
        correctAnswer: "Business to Business",
        explanation: "B2B refers to transactions and relationships between businesses rather than between businesses and consumers.",
        difficulty: "easy" as const
      }
    ],
    general: [
      {
        question: "What is the key to effective learning?",
        options: ["Passive reading", "Active engagement", "Speed reading", "Memorization only"],
        correctAnswer: "Active engagement",
        explanation: "Active engagement through questioning, discussion, and application leads to better understanding and retention.",
        difficulty: "easy" as const
      },
      {
        question: "Which learning technique involves reviewing material at increasing intervals?",
        options: ["Cramming", "Spaced repetition", "Mass practice", "Passive review"],
        correctAnswer: "Spaced repetition",
        explanation: "Spaced repetition involves reviewing material at gradually increasing intervals to improve long-term retention.",
        difficulty: "medium" as const
      },
      {
        question: "What is the most effective way to retain information?",
        options: ["Reading once", "Teaching others", "Highlighting text", "Taking notes only"],
        correctAnswer: "Teaching others",
        explanation: "Teaching others requires deep understanding and helps identify knowledge gaps, making it highly effective for retention.",
        difficulty: "medium" as const
      },
      {
        question: "What characterizes critical thinking?",
        options: ["Accepting all information", "Questioning and analyzing", "Memorizing facts", "Following instructions"],
        correctAnswer: "Questioning and analyzing",
        explanation: "Critical thinking involves questioning assumptions, analyzing evidence, and evaluating arguments objectively.",
        difficulty: "medium" as const
      },
      {
        question: "Which factor most influences learning effectiveness?",
        options: ["Time spent", "Quality of engagement", "Number of resources", "Study location"],
        correctAnswer: "Quality of engagement",
        explanation: "The quality of engagement with material, including active processing and application, is more important than time alone.",
        difficulty: "medium" as const
      }
    ]
  };

  // Select questions based on category and hash
  const availableQuestions = questionPools[category as keyof typeof questionPools] || questionPools.general;
  
  // Use hash to select different questions each time
  const selectedQuestions: QuizQuestion[] = [];
  const usedIndices = new Set<number>();
  
  // Generate 3-5 questions based on content hash
  const numQuestions = 3 + (hashNum % 3); // 3-5 questions
  
  for (let i = 0; i < numQuestions && selectedQuestions.length < availableQuestions.length; i++) {
    let questionIndex = (hashNum + i * 7) % availableQuestions.length; // Use hash for selection
    
    // Ensure we don't repeat questions
    while (usedIndices.has(questionIndex)) {
      questionIndex = (questionIndex + 1) % availableQuestions.length;
    }
    
    usedIndices.add(questionIndex);
    const question = availableQuestions[questionIndex];
    
    selectedQuestions.push({
      id: `q${i + 1}`,
      type: 'multiple-choice',
      ...question
    });
  }

  return selectedQuestions;
};

export const generateDynamicFlashcards = (
  title: string,
  source: 'youtube' | 'pdf',
  fileName?: string,
  url?: string
) => {
  const { category, contentHash } = analyzeContent(title, source, fileName, url);
  const hashNum = parseInt(contentHash.slice(-2), 36) || 1;

  const flashcardPools = {
    programming: [
      { front: "What is a variable?", back: "A storage location with an associated name that contains data" },
      { front: "Define recursion", back: "A programming technique where a function calls itself to solve smaller instances of the same problem" },
      { front: "What is an algorithm?", back: "A step-by-step procedure for solving a problem or completing a task" },
      { front: "Explain polymorphism", back: "The ability of objects of different types to be treated as instances of the same type through inheritance" },
      { front: "What is encapsulation?", back: "The bundling of data and methods that operate on that data within a single unit or class" }
    ],
    science: [
      { front: "What is photosynthesis?", back: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water" },
      { front: "Define entropy", back: "A measure of disorder or randomness in a system; tends to increase over time in isolated systems" },
      { front: "What is DNA?", back: "Deoxyribonucleic acid - the molecule that carries genetic instructions for life" },
      { front: "Explain gravity", back: "The force of attraction between any two objects with mass; described by Einstein's theory of general relativity" },
      { front: "What is an atom?", back: "The smallest unit of matter that retains the properties of an element, consisting of protons, neutrons, and electrons" }
    ],
    business: [
      { front: "What is cash flow?", back: "The movement of money in and out of a business over a specific period" },
      { front: "Define market share", back: "The percentage of total sales in a market captured by a particular company or product" },
      { front: "What is brand equity?", back: "The commercial value derived from consumer perception of a brand name rather than the product itself" },
      { front: "Explain competitive advantage", back: "A condition that allows a company to produce goods or services better or more cheaply than rivals" },
      { front: "What is customer lifetime value?", back: "The total revenue a business can expect from a single customer throughout their relationship" }
    ],
    general: [
      { front: "What is active learning?", back: "A learning approach that engages students in the process through activities and critical thinking rather than passive listening" },
      { front: "Define metacognition", back: "Awareness and understanding of one's own thought processes; thinking about thinking" },
      { front: "What is the Feynman Technique?", back: "A learning method that involves explaining concepts in simple terms to identify knowledge gaps" },
      { front: "Explain growth mindset", back: "The belief that abilities and intelligence can be developed through dedication, hard work, and learning from failure" },
      { front: "What is spaced repetition?", back: "A learning technique that involves reviewing information at increasing intervals to improve long-term retention" }
    ]
  };

  const availableFlashcards = flashcardPools[category as keyof typeof flashcardPools] || flashcardPools.general;
  
  // Select 3-4 flashcards based on hash
  const numFlashcards = 3 + (hashNum % 2);
  const selectedFlashcards = [];
  
  for (let i = 0; i < numFlashcards && i < availableFlashcards.length; i++) {
    const cardIndex = (hashNum + i * 3) % availableFlashcards.length;
    const card = availableFlashcards[cardIndex];
    
    selectedFlashcards.push({
      id: `f${i + 1}`,
      front: card.front,
      back: card.back,
      difficulty: ['easy', 'medium', 'hard'][i % 3] as 'easy' | 'medium' | 'hard',
      reviewCount: 0
    });
  }

  return selectedFlashcards;
};