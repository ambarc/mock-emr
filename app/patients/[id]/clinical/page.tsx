'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { DetailPanel } from '../../../components/DetailPanel';
import { Allergies } from '../../../components/Allergies';
import { Problems } from '../../../components/Problems';
import { Medications } from '../../../components/Medications';
import { TaskBar } from '../../../components/TaskBar';
import { CareManagement } from '../../../components/CareManagement';
import { store } from '../../../utils/store';
import { EMRNav, EMRHeader } from '../../../components/EMRHeader';
import Link from 'next/link';

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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ClinicalPage({ params }: PageProps) {
  const { id: patientId } = React.use(params);
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [medications, setMedications] = useState<any[]>([]);

  useEffect(() => {
    // Load initial medications
    const storedMedications = store.get('medications');
    setMedications(storedMedications);

    // Subscribe to medication updates
    const unsubscribe = store.subscribe((domain, items) => {
      if (domain === 'medications') {
        setMedications(items);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [patientId]);

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'allergies':
        return <Allergies allergies={store.get('allergies')} />;
      case 'problems':
        return <Problems problems={store.get('problems')} />;
      case 'medications':
        return <Medications patientId={patientId} />;
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
          className={`sidebar-item ${activeSection === 'medications' ? 'active' : ''}`}
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

        {/* View Toggle */}
        <div className="view-toggle-section">
          <Link 
            href={`/patients/${patientId}/admin`}
            className="view-toggle-btn"
          >
            Switch to Admin View
          </Link>
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
            <CareManagement patientId={patientId} />
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