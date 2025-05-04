'use client';

import { useState, useEffect } from 'react';
import { DetailPanel } from './components/DetailPanel';
import { AllergiesDetail } from './components/section-details/AllergiesDetail';
import { ProblemsDetail } from './components/section-details/ProblemsDetail';
import { Medications } from './components/Medications';
import { TaskBar } from './components/TaskBar';
import { CareManagement } from './components/CareManagement';
import { store } from './utils/store';
import { EMRNav, EMRHeader } from './components/EMRHeader';

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

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [medications, setMedications] = useState<any[]>([]);

  useEffect(() => {
    // Load medications from store
    const storedMedications = store.get('medications');
    setMedications(storedMedications);
  }, []);

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'allergies':
        return <AllergiesDetail allergies={store.get('allergies')} />;
      case 'problems':
        return <ProblemsDetail problems={store.get('problems')} />;
      case 'medications':
        return <Medications />;
      default:
        return null;
    }
  };

  return (
    <div className="emr-layout">
      <EMRNav />
      <EMRHeader />

      {/* Sidebar */}
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
          <span className="label">Meds</span>
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

      {/* Main Content */}
      <main className="main-content">
        <div className="personal-info">
          <button className="info-header">
            <i className="fa fa-plus-circle"></i> PERSONAL INFO
          </button>
        </div>
        <div className="content-wrapper">
          <div className="left-content">
            <section className="info-section" onClick={() => handleSectionClick('allergies')}>
              <h2>Allergies</h2>
              <div className="section-content">
                {store.get('allergies').map((allergy, index) => (
                  <div key={index}>{allergy.name}</div>
                ))}
              </div>
            </section>
            <section className="info-section" onClick={() => handleSectionClick('problems')}>
              <h2>Problems</h2>
              <div className="section-content">
                {store.get('problems').map((problem, index) => (
                  <div key={index}>{problem.name}</div>
                ))}
              </div>
            </section>
            <section className="info-section" onClick={() => handleSectionClick('medications')}>
              <h2>Medications <i className="fa fa-cog"></i></h2>
              <div className="section-content">
                {medications.map((med, index) => (
                  <div key={index} className={med.status === 'Active' ? 'med-active' : ''}>
                    {med.generic_name || med.brand_name}
                  </div>
                ))}
                {medications.length === 0 && (
                  <div className="no-data">No medications</div>
                )}
              </div>
            </section>
          </div>
          <div className="right-content">
            <CareManagement />
          </div>
        </div>
      </main>

      <DetailPanel
        isOpen={activeSection !== null}
        onClose={() => setActiveSection(null)}
        title={activeSection ? activeSection.charAt(0).toUpperCase() + activeSection.slice(1) : ''}
      >
        {renderSectionContent()}
      </DetailPanel>

      <TaskBar />
    </div>
  );
}
