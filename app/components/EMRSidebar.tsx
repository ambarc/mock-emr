import React from 'react';

export const EMRSidebar: React.FC = () => {
  const navItems = [
    { id: 'find', label: 'Find', icon: 'fa fa-search' },
    { id: 'allergies', label: 'Allergies', icon: 'fa fa-exclamation-triangle' },
    { id: 'problems', label: 'Problems', icon: 'fa fa-exclamation-circle' },
    { id: 'meds', label: 'Medications', icon: 'fa fa-medkit' },
    { id: 'vaccines', label: 'Vaccines', icon: 'fa fa-plus-square' },
    { id: 'vitals', label: 'Vitals', icon: 'fa fa-heartbeat' },
    { id: 'results', label: 'Results', icon: 'fa fa-bar-chart' },
    { id: 'visits', label: 'Visits', icon: 'fa fa-calendar' },
    { id: 'history', label: 'History', icon: 'fa fa-file-text-o' },
    { id: 'quality', label: 'Quality', icon: 'fa fa-check-circle' },
    { id: 'care', label: 'Care', icon: 'fa fa-hospital-o' },
    { id: 'apps', label: 'Apps', icon: 'fa fa-th' }
  ];

  return (
    <nav className="emr-sidebar">
      {navItems.map(item => (
        <button key={item.id} className="sidebar-item" title={item.label}>
          <i className={`${item.icon} icon`} aria-hidden="true"></i>
          <span className="label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}; 