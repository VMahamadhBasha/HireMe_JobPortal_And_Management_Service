import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage({ onLogin }) {
  var navigate = useNavigate();

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [error, setError] = useState('');

  function handleLogin() {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: email, password: password })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function(data) {
    //   if (data.role) {
    //     onLogin(data);
    //     if (data.role === 'JOB_SEEKER') navigate('/jobseeker/dashboard');
    //     if (data.role === 'EMPLOYER') navigate('/employer/dashboard');
    //     if (data.role === 'RECRUITER') navigate('/recruiter/dashboard');
    //   } else {
    //     setError('Invalid email or password');
    //   }
    // })
    // .catch(function() { setError('Server error. Try again.'); });

    // Dummy login for testing
    var dummyUsers = [
      { id: 1, name: 'John Seeker', email: 'seeker@test.com', password: '123', role: 'JOB_SEEKER' },
      { id: 2, name: 'Alice Employer', email: 'employer@test.com', password: '123', role: 'EMPLOYER' },
      { id: 3, name: 'Bob Recruiter', email: 'recruiter@test.com', password: '123', role: 'RECRUITER' }
    ];

    var found = dummyUsers.find(function(u) {
      return u.email === email && u.password === password;
    });

    if (found) {
      onLogin(found);
      if (found.role === 'JOB_SEEKER') navigate('/jobseeker/dashboard');
      if (found.role === 'EMPLOYER') navigate('/employer/dashboard');
      if (found.role === 'RECRUITER') navigate('/recruiter/dashboard');
    } else {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1 className="login-brand">HireMe</h1>
          <p className="login-subtitle">Find your dream job or perfect candidate</p>
        </div>

        <div className="login-form">
          <h2>Welcome Back</h2>
          <p className="login-desc">Login to your account</p>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function(e) { setEmail(e.target.value); }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={function(e) { setPassword(e.target.value); }}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-primary login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;