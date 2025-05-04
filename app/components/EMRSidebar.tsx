import React, { useState } from 'react';

type SectionType = 
  | 'find'
  | 'allergies' 
  | 'problems' 
  | 'medications'
  | 'vaccines'
  | 'vitals'
  | 'results'
  | 'visits'
  | 'history'
  | 'quality'
  | 'care'
  | 'apps'
  | null;

export const EMRSidebar = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [testClick, setTestClick] = useState(0);

  const handleSectionClick = (section: SectionType) => {
    console.log('handleSectionClick executing for:', section);
    setActiveSection(section === activeSection ? null : section);
  };

  return (
    <nav className="emr-sidebar">
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('allergies')}
      >
        <i className="fa fa-exclamation-triangle icon"></i>
        <span className="label">Allergies</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('problems')}
      >
        <i className="fa fa-exclamation-circle icon"></i>
        <span className="label">Problems</span>
      </button>
      <button
        style={{background: activeSection === 'medications' ? '#444' : 'transparent' }} 
        className="sidebar-item"
        onClick={() => handleSectionClick('medications')}
      >
        <i className="fa fa-medkit icon"></i>
        <span className="label">Medications</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('vaccines')}
      >
        <i className="fa fa-plus-square icon"></i>
        <span className="label">Vaccines</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('vitals')}
      >
        <i className="fa fa-heartbeat icon"></i>
        <span className="label">Vitals</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('results')}
      >
        <i className="fa fa-bar-chart icon"></i>
        <span className="label">Results</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('visits')}
      >
        <i className="fa fa-calendar icon"></i>
        <span className="label">Visits</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('history')}
      >
        <i className="fa fa-file-text-o icon"></i>
        <span className="label">History</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('quality')}
      >
        <i className="fa fa-check-circle icon"></i>
        <span className="label">Quality</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('care')}
      >
        <i className="fa fa-hospital-o icon"></i>
        <span className="label">Care</span>
      </button>
      <button 
        className="sidebar-item"
        onClick={() => handleSectionClick('apps')}
      >
        <i className="fa fa-th icon"></i>
        <span className="label">Apps</span>
      </button>
    </nav>
  );
}; 