'use client';

import { useState } from 'react';
import { SidePanel } from './components/SidePanel';
import { Medications } from './components/Medications';
import { TaskBar } from './components/TaskBar';
import { CareManagement } from './components/CareManagement';
import { EMRHeader, EMRNav } from './components/EMRHeader';

export default function Home() {
  const [activeSidePanel, setActiveSidePanel] = useState<string | null>(null);

  const handlePanelClose = () => {
    setActiveSidePanel(null);
  };

  const handleIconClick = (panelName: string) => {
    setActiveSidePanel(panelName);
  };

  return (
    <div className="emr-layout">
      <EMRNav />
      <EMRHeader />
      <div className="emr-sidebar">
        <button 
          className="sidebar-item" 
          onClick={() => handleIconClick('find')}
        >
          <i className="fa fa-search icon"></i>
          <span className="label">Find</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('allergies')}
        >
          <i className="fa fa-exclamation-triangle icon"></i>
          <span className="label">Allergies</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('problems')}
        >
          <i className="fa fa-exclamation-circle icon"></i>
          <span className="label">Problems</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('medications')}
        >
          <i className="fa fa-medkit icon"></i>
          <span className="label">Medications</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('vaccines')}
        >
          <i className="fa fa-plus-square icon"></i>
          <span className="label">Vaccines</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('vitals')}
        >
          <i className="fa fa-heartbeat icon"></i>
          <span className="label">Vitals</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('results')}
        >
          <i className="fa fa-bar-chart icon"></i>
          <span className="label">Results</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('visits')}
        >
          <i className="fa fa-calendar icon"></i>
          <span className="label">Visits</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('history')}
        >
          <i className="fa fa-file-text-o icon"></i>
          <span className="label">History</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('quality')}
        >
          <i className="fa fa-check-circle icon"></i>
          <span className="label">Quality</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('care')}
        >
          <i className="fa fa-hospital-o icon"></i>
          <span className="label">Care</span>
        </button>
        <button 
          className="sidebar-item"
          onClick={() => handleIconClick('apps')}
        >
          <i className="fa fa-th icon"></i>
          <span className="label">Apps</span>
        </button>
      </div>

      <SidePanel
        isOpen={activeSidePanel === 'medications'}
        title="Medications"
        onClose={handlePanelClose}
      >
        <Medications />
      </SidePanel>

      <div className="main-content">
        <div className="personal-info">
          <button className="info-header">
            <i className="fa fa-plus-circle"></i> PERSONAL INFO
          </button>
        </div>
        <div className="content-wrapper">
          <div className="left-content">
            <section className="info-section">
              <h2>Allergies</h2>
              <div className="section-content">
                <div>Penicillins</div>
                <div>sulfur dioxide</div>
              </div>
            </section>
            <section className="info-section">
              <h2>Problems</h2>
              <div className="section-content">
                <div>diabetes mellitus</div>
              </div>
            </section>
            <section className="info-section">
              <h2>Medications</h2>
              <div className="section-content">
                <div>flaxseed</div>
                <div>hydroxychloroquine</div>
                <div>lisinopril</div>
                <div>losartan</div>
                <div>metformin</div>
                <div>multivitamin</div>
                <div>rosuvastatin</div>
                <div>Tylenol</div>
                <div>Vitamin D3</div>
                <div>Wegovy</div>
              </div>
            </section>
          </div>
          <div className="right-content">
            <CareManagement />
          </div>
        </div>
      </div>

      <TaskBar />
    </div>
  );
}
