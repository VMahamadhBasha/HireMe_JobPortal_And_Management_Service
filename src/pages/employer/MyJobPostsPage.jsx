import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/MyJobPostsPage.css';

function MyJobPostsPage({ user }) {
  var navigate = useNavigate();

  // TODO: Uncomment when backend is ready
  // var [jobs, setJobs] = useState([]);
  // fetch('http://localhost:8080/api/jobs/employer/' + user.id)
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setJobs(data); });

  var [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', location: 'Hyderabad', type: 'Full Time', salary: '6-8 LPA', applications: 12, posted: '2024-03-01', status: 'ACTIVE' },
    { id: 2, title: 'React Developer', location: 'Bangalore', type: 'Full Time', salary: '8-12 LPA', applications: 8, posted: '2024-03-03', status: 'ACTIVE' },
    { id: 3, title: 'UI Engineer', location: 'Chennai', type: 'Contract', salary: '5-7 LPA', applications: 15, posted: '2024-02-28', status: 'CLOSED' },
    { id: 4, title: 'Full Stack Developer', location: 'Pune', type: 'Full Time', salary: '10-14 LPA', applications: 12, posted: '2024-03-05', status: 'ACTIVE' },
    { id: 5, title: 'Java Developer', location: 'Hyderabad', type: 'Full Time', salary: '7-10 LPA', applications: 6, posted: '2024-03-06', status: 'ACTIVE' }
  ]);

  var [filter, setFilter] = useState('ALL');

  var filteredJobs = jobs.filter(function(job) {
    if (filter === 'ALL') return true;
    return job.status === filter;
  });

  function handleClose(jobId) {
    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/jobs/' + jobId + '/close', { method: 'PUT' })
    // .then(function(res) { return res.json(); })
    // .then(function() {
    //   setJobs(jobs.map(function(j) {
    //     return j.id === jobId ? { ...j, status: 'CLOSED' } : j;
    //   }));
    // });

    setJobs(jobs.map(function(j) {
      return j.id === jobId ? Object.assign({}, j, { status: 'CLOSED' }) : j;
    }));
  }

  function handleDelete(jobId) {
    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/jobs/' + jobId, { method: 'DELETE' })
    // .then(function() {
    //   setJobs(jobs.filter(function(j) { return j.id !== jobId; }));
    // });

    setJobs(jobs.filter(function(j) { return j.id !== jobId; }));
  }

  function getStatusClass(status) {
    if (status === 'ACTIVE') return 'badge badge-green';
    if (status === 'CLOSED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <h1 className="page-title">My Job Posts</h1>
        <button className="btn-primary" onClick={function() { navigate('/employer/post-job'); }}>
          + Post New Job
        </button>
      </div>

      <div className="filter-tabs">
        {['ALL', 'ACTIVE', 'CLOSED'].map(function(tab) {
          return (
            <button
              key={tab}
              className={filter === tab ? 'filter-tab active' : 'filter-tab'}
              onClick={function() { setFilter(tab); }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <p className="results-count">{filteredJobs.length} jobs found</p>

      <div className="job-posts-list">
        {filteredJobs.length === 0 && (
          <div className="empty-state">No job posts found.</div>
        )}
        {filteredJobs.map(function(job) {
          return (
            <div className="job-post-card card" key={job.id}>

              <div className="job-post-left">
                <div className="job-post-logo">{job.title.charAt(0)}</div>
                <div className="job-post-info">
                  <h3 className="job-post-title">{job.title}</h3>
                  <div className="job-post-meta">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                    <span>📅 {job.posted}</span>
                  </div>
                  <p className="job-post-applications">
                    👥 {job.applications} Applications
                  </p>
                </div>
              </div>

              <div className="job-post-right">
                <span className={getStatusClass(job.status)}>{job.status}</span>
                <div className="job-post-actions">
                  <button
                    className="btn-secondary small-btn"
                    onClick={function() { navigate('/employer/applicants/' + job.id); }}
                  >
                    View Applicants
                  </button>
                  {job.status === 'ACTIVE' && (
                    <button
                      className="btn-secondary small-btn"
                      onClick={function() { handleClose(job.id); }}
                    >
                      Close Job
                    </button>
                  )}
                  <button
                    className="btn-danger small-btn"
                    onClick={function() { handleDelete(job.id); }}
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default MyJobPostsPage;