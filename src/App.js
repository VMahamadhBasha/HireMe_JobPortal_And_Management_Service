import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import JobSeekerDashboard from './pages/jobseeker/JobSeekerDashboard';
import BrowseJobsPage from './pages/jobseeker/BrowseJobsPage';
import JobDetailsPage from './pages/jobseeker/JobDetailsPage';
import MyApplicationsPage from './pages/jobseeker/MyApplicationsPage';
import ProfilePage from './pages/jobseeker/ProfilePage';

import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJobPage from './pages/employer/PostJobPage';
import MyJobPostsPage from './pages/employer/MyJobPostsPage';
import ViewApplicantsPage from './pages/employer/ViewApplicantsPage';

import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import AllJobsPage from './pages/recruiter/AllJobsPage';
import ManageApplicationsPage from './pages/recruiter/ManageApplicationsPage';
import ScheduleInterviewPage from './pages/recruiter/ScheduleInterviewPage';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  function getStoredUser() {
    if (user) return user;
    var stored = localStorage.getItem('user');
    if (stored) return JSON.parse(stored);
    return null;
  }

  var currentUser = getStoredUser();
  var role = currentUser ? currentUser.role : null;

  return (
    <Router>
      {currentUser && <Navbar user={currentUser} onLogout={handleLogout} />}
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Job Seeker Routes */}
        {role === 'JOB_SEEKER' && (
          <>
            <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard user={currentUser} />} />
            <Route path="/jobseeker/browse" element={<BrowseJobsPage />} />
            <Route path="/jobseeker/job/:id" element={<JobDetailsPage />} />
            <Route path="/jobseeker/applications" element={<MyApplicationsPage user={currentUser} />} />
            <Route path="/jobseeker/profile" element={<ProfilePage user={currentUser} />} />
          </>
        )}

        {/* Employer Routes */}
        {role === 'EMPLOYER' && (
          <>
            <Route path="/employer/dashboard" element={<EmployerDashboard user={currentUser} />} />
            <Route path="/employer/post-job" element={<PostJobPage user={currentUser} />} />
            <Route path="/employer/my-jobs" element={<MyJobPostsPage user={currentUser} />} />
            <Route path="/employer/applicants/:jobId" element={<ViewApplicantsPage />} />
          </>
        )}

        {/* Recruiter Routes */}
        {role === 'RECRUITER' && (
          <>
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard user={currentUser} />} />
            <Route path="/recruiter/all-jobs" element={<AllJobsPage />} />
            <Route path="/recruiter/applications" element={<ManageApplicationsPage />} />
            <Route path="/recruiter/schedule-interview" element={<ScheduleInterviewPage />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;