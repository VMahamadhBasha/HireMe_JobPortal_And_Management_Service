import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PostJobPage.css';

function PostJobPage({ user }) {
  var navigate = useNavigate();

  var [title, setTitle] = useState('');
  var [company, setCompany] = useState('');
  var [location, setLocation] = useState('');
  var [jobType, setJobType] = useState('Full Time');
  var [salary, setSalary] = useState('');
  var [experience, setExperience] = useState('');
  var [description, setDescription] = useState('');
  var [requirements, setRequirements] = useState('');
  var [skills, setSkills] = useState('');
  var [error, setError] = useState('');
  var [success, setSuccess] = useState('');

  function handlePostJob() {
    if (!title || !company || !location || !salary || !experience || !description || !requirements || !skills) {
      setError('Please fill all fields');
      return;
    }

    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/jobs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     title: title,
    //     company: company,
    //     location: location,
    //     jobType: jobType,
    //     salary: salary,
    //     experience: experience,
    //     description: description,
    //     requirements: requirements,
    //     skills: skills,
    //     employerId: user.id
    //   })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function(data) {
    //   setSuccess('Job posted successfully!');
    //   setError('');
    //   setTimeout(function() { navigate('/employer/my-jobs'); }, 1500);
    // })
    // .catch(function() { setError('Server error. Try again.'); });

    setSuccess('Job posted successfully!');
    setError('');
    setTimeout(function() { navigate('/employer/my-jobs'); }, 1500);
  }

  return (
    <div className="page-container">

      <div className="post-job-header">
        <button className="back-btn" onClick={function() { navigate('/employer/dashboard'); }}>
          ← Back to Dashboard
        </button>
        <h1 className="page-title">Post a New Job</h1>
      </div>

      <div className="post-job-card card">

        <h2 className="form-section-title">Job Information</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={title}
              onChange={function(e) { setTitle(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="e.g. TechCorp"
              value={company}
              onChange={function(e) { setCompany(e.target.value); }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. Hyderabad"
              value={location}
              onChange={function(e) { setLocation(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select
              value={jobType}
              onChange={function(e) { setJobType(e.target.value); }}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Salary Range</label>
            <input
              type="text"
              placeholder="e.g. 6-8 LPA"
              value={salary}
              onChange={function(e) { setSalary(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label>Experience Required</label>
            <input
              type="text"
              placeholder="e.g. 1-3 Years"
              value={experience}
              onChange={function(e) { setExperience(e.target.value); }}
            />
          </div>
        </div>

        <h2 className="form-section-title">Job Details</h2>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            rows="4"
            placeholder="Describe the job role and responsibilities..."
            value={description}
            onChange={function(e) { setDescription(e.target.value); }}
          />
        </div>

        <div className="form-group">
          <label>Requirements</label>
          <textarea
            rows="4"
            placeholder="List the requirements (one per line)..."
            value={requirements}
            onChange={function(e) { setRequirements(e.target.value); }}
          />
        </div>

        <div className="form-group">
          <label>Required Skills (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. React, JavaScript, HTML, CSS"
            value={skills}
            onChange={function(e) { setSkills(e.target.value); }}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <div className="post-job-actions">
          <button className="btn-secondary" onClick={function() { navigate('/employer/my-jobs'); }}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handlePostJob}>
            Post Job
          </button>
        </div>

      </div>

    </div>
  );
}

export default PostJobPage;