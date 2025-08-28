import React, { useState } from 'react';
import { ArrowLeft, BookOpen, HelpCircle, Layers, MessageSquare, Download, CheckCircle } from 'lucide-react';
import { Course } from '../types/course';
import QuizComponent from './QuizComponent';
import FlashcardsComponent from './FlashcardsComponent';

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
  onUpdateCourse: (course: Course) => void;
}

const CourseViewer: React.FC<CourseViewerProps> = ({ course, onBack, onUpdateCourse }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'flashcards'>('notes');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);

  const tabs = [
    { id: 'notes', label: 'Course Notes', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'quiz', label: 'Practice Quiz', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="h-4 w-4" /> },
  ];

  const handleQuizComplete = (score: number) => {
    const updatedCourse = {
      ...course,
      progress: Math.min(100, course.progress + 25)
    };
    onUpdateCourse(updatedCourse);
  };

  const handleFlashcardComplete = () => {
    const updatedCourse = {
      ...course,
      progress: Math.min(100, course.progress + 15)
    };
    onUpdateCourse(updatedCourse);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {course.duration}
                  </span>
                  <span>{course.topics.length} Topics</span>
                  <span>Created {course.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{course.progress}%</p>
                </div>
                <div className="w-32">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
              
              {/* Tab Navigation */}
              <div className="space-y-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Notes Navigation */}
              {activeTab === 'notes' && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Sections</h4>
                  {course.notes.map((note, index) => (
                    <button
                      key={note.id}
                      onClick={() => setSelectedNoteIndex(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedNoteIndex === index
                          ? 'bg-purple-50 text-purple-600 border border-purple-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {note.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Topics */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Topics Covered</h4>
                <div className="space-y-1">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {activeTab === 'notes' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {course.notes[selectedNoteIndex]?.title}
                    </h2>
                    {course.notes[selectedNoteIndex]?.timestamp && (
                      <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {course.notes[selectedNoteIndex].timestamp}
                      </span>
                    )}
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {course.notes[selectedNoteIndex]?.content}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedNoteIndex(Math.max(0, selectedNoteIndex - 1))}
                      disabled={selectedNoteIndex === 0}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                    
                    <span className="text-sm text-gray-500">
                      {selectedNoteIndex + 1} of {course.notes.length}
                    </span>
                    
                    <button
                      onClick={() => setSelectedNoteIndex(Math.min(course.notes.length - 1, selectedNoteIndex + 1))}
                      disabled={selectedNoteIndex === course.notes.length - 1}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                    >
                      <span>Next</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && (
                <QuizComponent 
                  quizzes={course.quizzes} 
                  onComplete={handleQuizComplete}
                />
              )}

              {activeTab === 'flashcards' && (
                <FlashcardsComponent 
                  flashcards={course.flashcards}
                  onComplete={handleFlashcardComplete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;