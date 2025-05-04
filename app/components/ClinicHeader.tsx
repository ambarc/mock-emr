import React from 'react';

export function ClinicHeader() {
  return (
    <header className="clinic-header">
      <div className="header-content">
        <div className="clinic-info">
          <h1>Main Street Medical Clinic</h1>
          <div className="clinic-details">
            <span><i className="fa fa-map-marker"></i> 123 Main St, Anytown, USA</span>
            <span><i className="fa fa-phone"></i> (555) 123-4567</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn">
            <i className="fa fa-calendar-plus-o"></i>
            New Appointment
          </button>
          <button className="action-btn">
            <i className="fa fa-user-plus"></i>
            New Patient
          </button>
        </div>
      </div>
    </header>
  );
} 