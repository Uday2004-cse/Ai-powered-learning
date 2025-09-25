import React, { useState } from 'react';
import { Upload, Youtube, FileText, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Course } from '../types/course';
import { generateDynamicQuiz, generateDynamicFlashcards, generateEnhancedNotes } from '../utils/quizGenerator';

interface CourseCreatorProps {
  onCourseCreated: (course: Course) => void;
}

const CourseCreator: React.FC<CourseCreatorProps> = ({ onCourseCreated }) => {
  const [inputType, setInputType] = useState<'youtube' | 'pdf'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setFile(file);
        setInputType('pdf');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const generateSampleCourse = (source: 'youtube' | 'pdf', title: string): Course => {
    const courseId = Date.now().toString();
    
    // Generate enhanced dynamic content based on the actual input
    const dynamicQuizzes = generateDynamicQuiz(title, source, file?.name, youtubeUrl);
    const dynamicFlashcards = generateDynamicFlashcards(title, source, file?.name, youtubeUrl);
    const enhancedNotes = generateEnhancedNotes(title, source, file?.name, youtubeUrl);
    
    // Generate sophisticated topics based on content analysis
    const getTopicsForContent = () => {
      const lowerTitle = title.toLowerCase();
      
      // Programming & Technology
      if (lowerTitle.match(/(programming|code|javascript|python|java|react|node|web|development|software|algorithm)/)) {
        if (lowerTitle.match(/(advanced|expert|senior|architecture)/)) {
          return ['System Architecture', 'Advanced Algorithms', 'Design Patterns', 'Performance Optimization', 'Scalability'];
        } else if (lowerTitle.match(/(beginner|intro|basic|fundamentals)/)) {
          return ['Programming Basics', 'Syntax & Structure', 'Problem Solving', 'Debugging Techniques'];
        } else {
          return ['Object-Oriented Programming', 'Data Structures', 'Algorithm Design', 'Software Engineering'];
        }
      }
      // Science & Research
      else if (lowerTitle.match(/(science|biology|chemistry|physics|research|medical|health)/)) {
        if (lowerTitle.match(/(advanced|graduate|research|molecular|quantum)/)) {
          return ['Advanced Theory', 'Research Methodology', 'Experimental Design', 'Data Analysis', 'Scientific Writing'];
        } else {
          return ['Scientific Method', 'Core Principles', 'Laboratory Techniques', 'Data Interpretation'];
        }
      }
      // Business & Economics
      else if (lowerTitle.match(/(business|marketing|finance|economics|management|strategy|entrepreneurship)/)) {
        if (lowerTitle.match(/(executive|strategic|advanced|mba|corporate)/)) {
          return ['Strategic Planning', 'Leadership', 'Corporate Finance', 'Market Analysis', 'Risk Management'];
        } else if (lowerTitle.match(/(startup|entrepreneur|small business)/)) {
          return ['Business Planning', 'Market Validation', 'Funding Strategies', 'Growth Hacking', 'Product Development'];
        } else {
          return ['Business Fundamentals', 'Marketing Strategy', 'Financial Management', 'Operations'];
        }
      }
      // Mathematics
      else if (lowerTitle.match(/(math|mathematics|calculus|algebra|statistics)/)) {
        return ['Mathematical Foundations', 'Problem Solving', 'Theoretical Concepts', 'Practical Applications'];
      }
      // Default
      else {
        return ['Introduction', 'Key Concepts', 'Advanced Topics', 'Practical Applications', 'Future Directions'];
      }
    };
    
    // Generate enhanced summary based on content type
    const generateEnhancedSummary = () => {
      const contentType = source === 'youtube' ? 'video content' : 'PDF document';
      const lowerTitle = title.toLowerCase();
      
      if (lowerTitle.match(/(programming|code|development)/)) {
        return `This comprehensive programming course has been intelligently generated from your ${contentType}. Our AI has analyzed the technical content and created structured learning modules covering programming fundamentals, code implementation techniques, best practices, and real-world applications. The course includes hands-on examples, coding challenges, and progressive skill-building exercises tailored to your specific content.`;
      } else if (lowerTitle.match(/(science|research|biology|chemistry|physics)/)) {
        return `This scientific course has been expertly crafted from your ${contentType} using advanced AI analysis. The curriculum covers theoretical foundations, experimental methodologies, data analysis techniques, and practical applications. Each module builds upon previous concepts while providing clear explanations, visual aids, and real-world examples to enhance understanding of complex scientific principles.`;
      } else if (lowerTitle.match(/(business|marketing|finance|management)/)) {
        return `This business-focused course has been strategically developed from your ${contentType}. Our AI has identified key business concepts, market strategies, financial principles, and management techniques. The course structure includes case studies, practical frameworks, and actionable insights designed to provide both theoretical knowledge and practical skills for professional application.`;
      } else {
        return `This comprehensive course has been intelligently generated from your ${contentType} using advanced AI analysis. The curriculum has been carefully structured to provide optimal learning progression, with each module building upon previous concepts while introducing new ideas and applications. The content includes detailed explanations, practical examples, and interactive elements designed to enhance understanding and retention.`;
      }
    };
    
    return {
      id: courseId,
      title: title,
      description: `An intelligently crafted course generated from your ${source === 'youtube' ? 'YouTube video' : 'PDF document'}. This comprehensive learning experience has been automatically structured using advanced AI to provide personalized content, adaptive assessments, and interactive learning materials tailored to your specific subject matter.`,
      source,
      sourceUrl: source === 'youtube' ? youtubeUrl : undefined,
      fileName: source === 'pdf' ? file?.name : undefined,
      createdAt: new Date(),
      duration: `${45 + Math.floor(Math.random() * 75)} minutes`,
      topics: getTopicsForContent(),
      progress: 0,
      summary: generateEnhancedSummary(),
      notes: enhancedNotes,
      quizzes: [
        {
          id: '1',
          title: `${title} - Comprehensive Assessment`,
          questions: dynamicQuizzes
        }
      ],
      flashcards: dynamicFlashcards
    };
  };

  const handleGenerate = async () => {
    if (!youtubeUrl && !file) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const title = inputType === 'youtube' 
      ? 'Advanced Machine Learning & AI Fundamentals'
      : `${file?.name?.replace('.pdf', '').replace(/[-_]/g, ' ') || 'Advanced Document Analysis'}`;
    
    const course = generateSampleCourse(inputType, title);
    onCourseCreated(course);
    
    setIsGenerating(false);
    setYoutubeUrl('');
    setFile(null);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 text-center">
          <div className="mb-8">
            <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Course</h3>
            <p className="text-gray-600">AI is analyzing your content and creating structured learning materials...</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Extracting key concepts</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Generating structured notes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Creating interactive quizzes</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Intelligent Course
          </h1>
          <p className="text-xl text-gray-600">
            Transform any YouTube video or PDF into a comprehensive, AI-powered learning experience
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Input Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setInputType('youtube')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  inputType === 'youtube'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Youtube className="h-5 w-5" />
                <span>YouTube Video</span>
              </button>
              <button
                onClick={() => setInputType('pdf')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  inputType === 'pdf'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>PDF Document</span>
              </button>
            </div>
          </div>

          {/* YouTube Input */}
          {inputType === 'youtube' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Video URL
                </label>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">MindSphere AI Processing</h3>
              <p className="text-gray-600">Advanced AI is analyzing your content and creating personalized learning materials...</p>
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <span>Analyzing content structure and extracting key concepts</span>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-medium text-blue-900 mb-2">Try these educational content examples:</h4>
                <span>Generating enhanced notes with detailed explanations</span>
                  <div>• Programming Tutorial: https://youtube.com/watch?v=aircAruvnKk</div>
                  <div>• Science Lecture: https://youtube.com/watch?v=UB1O30fR-EE</div>
                  <div>• Business Course: https://youtube.com/watch?v=r-uHLfm7DdU</div>
                <span>Creating adaptive quizzes and intelligent flashcards</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Optimizing learning path and difficulty progression</span>
              </div>
            </div>
          )}

          {/* PDF Upload */}
          {inputType === 'pdf' && (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              
              {file ? (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    Drop your PDF here, or{' '}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                      browse your files
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports educational PDFs, research papers, textbooks up to 50MB
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Generate Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!youtubeUrl && !file}
              className={`group flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                youtubeUrl || file
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="h-5 w-5" />
              <span>Generate Intelligent Course</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;