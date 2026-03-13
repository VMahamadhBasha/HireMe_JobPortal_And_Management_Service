import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/EmployerDashboard.css';

function EmployerDashboard({ user }) {
  var navigate = useNavigate();

  // TODO: Uncomment when backend is ready
  // var [stats, setStats] = useState({ posted: 0, applications: 0, interviews: 0, hired: 0 });
  // fetch('http://localhost:8080/api/employer/stats?userId=' + user.id)
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setStats(data); });

  var stats = [
    { label: 'Jobs Posted', value: 8, icon: '📋' },
    { label: 'Total Applications', value: 47, icon: '👥' },
    { label: 'Interviews Scheduled', value: 12, icon: '🎯' },
    { label: 'Candidates Hired', value: 3, icon: '✅' }
  ];

  var recentJobs = [
    { id: 1, title: 'Frontend Developer', applications: 12, status: 'ACTIVE', posted: '2 days ago' },
    { id: 2, title: 'React Developer', applications: 8, status: 'ACTIVE', posted: '4 days ago' },
    { id: 3, title: 'UI Engineer', applications: 15, status: 'CLOSED', posted: '1 week ago' },
    { id: 4, title: 'Full Stack Developer', applications: 12, status: 'ACTIVE', posted: '3 days ago' }
  ];

  function getStatusClass(status) {
    if (status === 'ACTIVE') return 'badge badge-green';
    if (status === 'CLOSED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <div>
          <h1 className="page-title">Welcome, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">Manage your job postings and find the best candidates</p>
        </div>
        <button className="btn-primary" onClick={function() { navigate('/employer/post-job'); }}>
          + Post New Job
        </button>
      </div>

      <div className="stats-grid">
        {stats.map(function(stat, index) {
          return (
            <div className="stat-card" key={index}>
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="section-header">
          <h2>Recent Job Postings</h2>
          <button className="btn-secondary" onClick={function() { navigate('/employer/my-jobs'); }}>
            View All
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Applications</th>
              <th>Posted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map(function(job) {
              return (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.applications} applicants</td>
                  <td>{job.posted}</td>
                  <td><span className={getStatusClass(job.status)}>{job.status}</span></td>
                  <td>
                    <button
                      className="btn-secondary small-btn"
                      onClick={function() { navigate('/employer/applicants/' + job.id); }}
                    >
                      View Applicants
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default EmployerDashboard;