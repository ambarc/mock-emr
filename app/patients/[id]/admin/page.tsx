'use client';

import React, { useState, useEffect } from 'react';
import { DetailPanel } from '../../../components/DetailPanel';
import { Insurance } from '../../../components/Insurance';
import { TaskBar } from '../../../components/TaskBar';
import { store } from '../../../utils/store';
import { EMRNav, EMRHeader } from '../../../components/EMRHeader';

type SectionType = 'insurance' | null;

type PageProps = {
  params: Promise<{ id: string }>;
};

type PatientInfo = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: {
    home?: string;
    cell?: string;
    work?: string;
  };
  email?: string;
};

export default function AdminPage({ params }: PageProps) {
  const { id: patientId } = React.use(params);
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  
  // In a real app, this would be fetched from an API
  const patientInfo: PatientInfo = {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1980-01-01",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345"
    },
    phone: {
      cell: "(555) 123-4567",
      home: "(555) 765-4321"
    },
    email: "john.doe@email.com"
  };

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'insurance':
        return <Insurance patientId={patientId} />;
      default:
        return null;
    }
  };

  return (
    <div className="emr-layout">
      <EMRNav />
      <EMRHeader />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <div className="admin-content">
            <section className="info-section">
              <h2>Patient Information</h2>
              <div className="patient-info-grid">
                <div className="info-group">
                  <label>Name</label>
                  <div className="info-value">{patientInfo.firstName} {patientInfo.lastName}</div>
                </div>
                <div className="info-group">
                  <label>Date of Birth</label>
                  <div className="info-value">{patientInfo.dateOfBirth}</div>
                </div>
                <div className="info-group">
                  <label>Address</label>
                  <div className="info-value">
                    {patientInfo.address.street}<br />
                    {patientInfo.address.city}, {patientInfo.address.state} {patientInfo.address.zip}
                  </div>
                </div>
                <div className="info-group">
                  <label>Phone Numbers</label>
                  <div className="info-value">
                    {patientInfo.phone.cell && <div>Cell: {patientInfo.phone.cell}</div>}
                    {patientInfo.phone.home && <div>Home: {patientInfo.phone.home}</div>}
                    {patientInfo.phone.work && <div>Work: {patientInfo.phone.work}</div>}
                  </div>
                </div>
                {patientInfo.email && (
                  <div className="info-group">
                    <label>Email</label>
                    <div className="info-value">{patientInfo.email}</div>
                  </div>
                )}
              </div>
            </section>

            <section className="info-section">
              <h2>Insurance Information</h2>
              <button 
                className="add-insurance-btn"
                onClick={() => handleSectionClick('insurance')}
              >
                <i className="fa fa-plus-circle"></i> Add Insurance
              </button>
              <div className="insurance-list">
                {/* TODO: List existing insurance information */}
              </div>
            </section>
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