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

interface EMRHeaderProps {
  patientName?: string;
  patientId?: string;
  dob?: string;
}

export const EMRHeader: React.FC<EMRHeaderProps> = ({
  patientName = 'Jonas Salk',
  patientId = '#3316',
  dob = '10-28-1914'
}) => {
  return (
    <header className="emr-header">
      <div className="header-left">
        <div className="patient-avatar">
          <div className="avatar-circle">CJ</div>
          <div className="avatar-expand"><i className="fa fa-chevron-down"></i></div>
        </div>
        <div className="patient-info">
          <div className="patient-name">{patientName}</div>
          <div className="patient-details">
            <div className="patient-demographics">110y M DOB: {dob}</div>
          </div>
        </div>
      </div>

      <div className="header-sections">
        <div className="header-section" data-section="contact">
          <div className="section-label">CONTACT</div>
          <div className="section-content">
            <a href="tel:(619) 555-1955">Mobile(619) 555-1955</a>
          </div>
        </div>

        <div className="header-section" data-section="appointments">
          <div className="section-label">APPOINTMENTS</div>
          <div className="section-content"><span className="content-value">05/12/2025</span></div>
        </div>

        <div className="header-section" data-section="pharmacy">
          <div className="section-label">PHARMACY</div>
          <div className="section-content">CVS/Pharmacy #1347</div>
        </div>

        <div className="header-section" data-section="insurance">
          <div className="section-label">INSURANCE</div>
          <div className="section-content">N/A</div>
        </div>
      </div>

      <div className="header-actions">
        <button className="banner-options">
          <i className="fa fa-flag"></i>
          Banner Options
        </button>
        <button className="menu-btn">
          <i className="fa fa-bars"></i>
        </button>
      </div>
    </header>
  );
}; 