import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CourseCreator from './components/CourseCreator';
import CourseViewer from './components/CourseViewer';
import ChatBot from './components/ChatBot';
import { Course } from './types/course';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Load courses from localStorage on app start
  useEffect(() => {
    const savedCourses = localStorage.getItem('edusynth-courses');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses).map((course: any) => ({
          ...course,
          createdAt: new Date(course.createdAt)
        }));
        setCourses(parsedCourses);
      } catch (error) {
        console.error('Error loading courses:', error);
      }
    }
  }, []);

  // Save courses to localStorage whenever courses change
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('edusynth-courses', JSON.stringify(courses));
    }
  }, [courses]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedCourse(null);
  };

  const handleGetStarted = () => {
    setCurrentView('create');
  };

  const handleCourseCreated = (course: Course) => {
    setCourses(prev => [course, ...prev]);
    setCurrentView('dashboard');
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course');
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setSelectedCourse(updatedCourse);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourse(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return (
          <Dashboard
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onCreateCourse={() => setCurrentView('create')}
          />
        );
      case 'create':
        return <CourseCreator onCourseCreated={handleCourseCreated} />;
      case 'course':
        return selectedCourse ? (
          <CourseViewer
            course={selectedCourse}
            onBack={handleBackToDashboard}
            onUpdateCourse={handleUpdateCourse}
          />
        ) : (
          <Dashboard
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onCreateCourse={() => setCurrentView('create')}
          />
        );
      case 'chatbot':
        return <ChatBot courses={courses} />;
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentView={currentView} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;