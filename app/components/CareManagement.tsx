import React from 'react';

export const CareManagement: React.FC = () => {
  return (
    <div className="care-management">
      <div className="care-header">
        <h2>Care Management</h2>
        <button className="care-plan-btn">
          Go to Care Plan <i className="fa fa-arrow-right"></i>
        </button>
      </div>

      <div className="care-section">
        <h3>Care Programs</h3>
        <div className="section-content">None</div>
      </div>

      <div className="care-section">
        <h3>Recent Event Summary</h3>
        <div className="section-content">None recorded</div>
      </div>

      <div className="care-section">
        <h3>Goals</h3>
        <div className="section-content">None recorded</div>
      </div>

      <div className="care-section">
        <div className="section-header">
          <h3>Last Visit</h3>
          <button className="tab">Recent Activity</button>
          <button className="settings-btn">
            <i className="fa fa-cog"></i>
          </button>
        </div>
        <div className="section-content">None recorded</div>
      </div>

      <div className="care-section">
        <h3>Follow Up</h3>
        <div className="section-content">Patient will return to the office as needed.</div>
      </div>
    </div>
  );
}; 