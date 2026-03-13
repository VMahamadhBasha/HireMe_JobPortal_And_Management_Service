import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/ViewApplicantsPage.css';

function ViewApplicantsPage() {
  var { jobId } = useParams();
  var navigate = useNavigate();

  // TODO: Uncomment when backend is ready
  // var [applicants, setApplicants] = useState([]);
  // fetch('http://localhost:8080/api/applications/job/' + jobId)
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setApplicants(data); });

  var [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', email: 'john@test.com', phone: '9876543210', experience: '2 Years', skills: 'React, JavaScript, HTML', appliedDate: '2024-03-01', status: 'APPLIED' },
    { id: 2, name: 'Jane Smith', email: 'jane@test.com', phone: '9876543211', experience: '3 Years', skills: 'React, Node.js, CSS', appliedDate: '2024-03-02', status: 'INTERVIEW' },
    { id: 3, name: 'Mike Johnson', email: 'mike@test.com', phone: '9876543212', experience: '1 Year', skills: 'HTML, CSS, JavaScript', appliedDate: '2024-03-03', status: 'APPLIED' },
    { id: 4, name: 'Sara Lee', email: 'sara@test.com', phone: '9876543213', experience: '4 Years', skills: 'React, TypeScript, Redux', appliedDate: '2024-03-04', status: 'SELECTED' },
    { id: 5, name: 'Tom Brown', email: 'tom@test.com', phone: '9876543214', experience: '2 Years', skills: 'Vue.js, JavaScript, CSS', appliedDate: '2024-03-05', status: 'REJECTED' }
  ]);

  var [filter, setFilter] = useState('ALL');

  var filteredApplicants = applicants.filter(function(app) {
    if (filter === 'ALL') return true;
    return app.status === filter;
  });

  function handleStatusChange(applicantId, newStatus) {
    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/applications/' + applicantId + '/status', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function() {
    //   setApplicants(applicants.map(function(a) {
    //     return a.id === applicantId ? { ...a, status: newStatus } : a;
    //   }));
    // });

    setApplicants(applicants.map(function(a) {
      return a.id === applicantId ? Object.assign({}, a, { status: newStatus }) : a;
    }));
  }

  function getStatusClass(status) {
    if (status === 'APPLIED') return 'badge badge-blue';
    if (status === 'INTERVIEW') return 'badge badge-yellow';
    if (status === 'SELECTED') return 'badge badge-green';
    if (status === 'REJECTED') return 'badge badge-red';
    return 'badge badge-blue';
  }

  return (
    <div className="page-container">

      <button className="back-btn" onClick={function() { navigate('/employer/my-jobs'); }}>
        ← Back to My Jobs
      </button>

      <div className="dashboard-welcome">
        <h1 className="page-title">Applicants for Job #{jobId}</h1>
        <p className="dashboard-subtitle">{applicants.length} total applicants</p>
      </div>

      <div className="filter-tabs">
        {['ALL', 'APPLIED', 'INTERVIEW', 'SELECTED', 'REJECTED'].map(function(tab) {
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

      <p className="results-count">{filteredApplicants.length} applicants found</p>

      <div className="applicants-list">
        {filteredApplicants.length === 0 && (
          <div className="empty-state">No applicants found.</div>
        )}
        {filteredApplicants.map(function(applicant) {
          return (
            <div className="applicant-card card" key={applicant.id}>

              <div className="applicant-left">
                <div className="applicant-avatar">{applicant.name.charAt(0)}</div>
                <div className="applicant-info">
                  <h3 className="applicant-name">{applicant.name}</h3>
                  <div className="applicant-meta">
                    <span>✉️ {applicant.email}</span>
                    <span>📞 {applicant.phone}</span>
                    <span>⏳ {applicant.experience}</span>
                  </div>
                  <p className="applicant-skills">🛠️ {applicant.skills}</p>
                  <p className="applicant-date">Applied: {applicant.appliedDate}</p>
                </div>
              </div>

              <div className="applicant-right">
                <span className={getStatusClass(applicant.status)}>{applicant.status}</span>
                <div className="applicant-actions">
                  <select
                    className="status-select"
                    value={applicant.status}
                    onChange={function(e) { handleStatusChange(applicant.id, e.target.value); }}
                  >
                    <option value="APPLIED">APPLIED</option>
                    <option value="INTERVIEW">INTERVIEW</option>
                    <option value="SELECTED">SELECTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ViewApplicantsPage;