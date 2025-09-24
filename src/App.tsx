import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CourseCreator from './components/CourseCreator';
import CourseViewer from './components/CourseViewer';
import ChatBot from './components/ChatBot';
import AuthModal from './components/AuthModal';
import { Course } from './types/course';
import { User } from './types/auth';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('edusynth-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt)
        });
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  // Save courses to localStorage whenever courses change
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('edusynth-courses', JSON.stringify(courses));
    }
  }, [courses]);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('edusynth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edusynth-user');
    }
  }, [user]);

  const handleNavigate = (view: string) => {
    // Require authentication for certain views
    if (!user && ['dashboard', 'create', 'chatbot'].includes(view)) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
    setSelectedCourse(null);
  };

  const handleGetStarted = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setCurrentView('create');
    }
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCourses([]);
    setCurrentView('home');
    localStorage.removeItem('edusynth-user');
    localStorage.removeItem('edusynth-courses');
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
      <Header 
        onNavigate={handleNavigate} 
        currentView={currentView}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      <main>
        {renderCurrentView()}
      </main>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </div>
  );
}

export default App;