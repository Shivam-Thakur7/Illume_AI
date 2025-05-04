import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Generate from './components/generate'; // adjust path if it's different

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FAQ from './components/FAQ';
import Services from './components/Services';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import Contact from './components/Contact';
import IllumeAuth from './components/Illumeauth';
import Community from './components/Community';
import { UserProvider, useUser } from './components/UserContext';
import Avatar from './components/Avatar';
import ErrorBoundary from './components/ErrorBoundary';
import Explore from './components/Explore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Score from './components/score';
import Surveys from './components/Surveys';

function AppContent() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile');
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar user={user} onSignOut={handleSignOut} />

      <Routes>
        {/* Home Page with multiple sections */}
        <Route
          path="/"
          element={
            <>
              <section id="hero">
                <Hero />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="testimonials">
                <Testimonials />
              </section>
              <section id="faq">
                <FAQ />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </>
          }
        />

        {/* Other Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/auth" element={<IllumeAuth onSignIn={handleSignIn} />} />
        <Route path="/community" element={<Community />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/score" element={<Score />} />
        <Route path="/surveys" element={<Surveys />} />

      </Routes>

      {/* Global Footer */}
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ErrorBoundary>
      <UserProvider value={{ user, setUser }}>
        <Router>
          <>
            <ToastContainer theme="dark" />
            <AppContent />
          </>
        </Router>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
