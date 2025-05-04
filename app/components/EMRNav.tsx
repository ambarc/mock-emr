import React from 'react';

export const EMRNav = () => {
  return (
    <nav className="emr-nav">
      <a href="/" className="emr-brand">oneEMR</a>
      <div className="emr-nav-items">
        <a href="/clinical" className="emr-nav-item">Clinical</a>
        <a href="/schedule" className="emr-nav-item">Schedule</a>
        <a href="/billing" className="emr-nav-item">Billing</a>
      </div>
      <div className="emr-nav-right">
        <div className="patient-search">
          <span className="patient-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search patients by name, DOB, or MRN..."
            defaultValue="#3316"
            aria-label="Search patients"
          />
        </div>
        <div className="user-id">embott3</div>
        <a href="/logout" className="logout-btn">Log out</a>
      </div>
    </nav>
  );
}; 