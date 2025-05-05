'use client';

import React, { useState, useEffect } from 'react';
import { DetailPanel } from '../../../components/DetailPanel';
import { Insurance } from '../../../components/Insurance';
import { TaskBar } from '../../../components/TaskBar';
import { store } from '../../../utils/store';
import { EMRNav, EMRHeader } from '../../../components/EMRHeader';
import Link from 'next/link';

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
  preferredProvider?: {
    name: string;
    specialty: string;
    location: string;
  };
  preferredPharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
  preferredLab?: {
    name: string;
    address: string;
    phone: string;
  };
  communicationPreferences?: {
    appointmentReminders: string;
    labResults: string;
    generalCommunication: string;
    portal: boolean;
  };
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
    email: "john.doe@email.com",
    preferredProvider: {
      name: "Dr. Sarah Johnson",
      specialty: "Family Medicine",
      location: "Main Street Clinic"
    },
    preferredPharmacy: {
      name: "CVS Pharmacy",
      address: "456 Oak St, Anytown, CA 12345",
      phone: "(555) 987-6543"
    },
    preferredLab: {
      name: "LabCorp",
      address: "789 Pine St, Anytown, CA 12345",
      phone: "(555) 246-8135"
    },
    communicationPreferences: {
      appointmentReminders: "Text Message",
      labResults: "Patient Portal",
      generalCommunication: "Email",
      portal: true
    }
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

            {/* View Toggle */}
            <div className="view-toggle-section">
              <Link 
                href={`/patients/${patientId}/clinical`}
                className="view-toggle-btn"
              >
                Switch to Clinical View
              </Link>
            </div>

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

            <section className="info-section">
              <h2>Preferred Provider</h2>
              <div className="patient-info-grid">
                <div className="info-group">
                  <label>Provider Name</label>
                  <div className="info-value">{patientInfo.preferredProvider?.name}</div>
                </div>
                <div className="info-group">
                  <label>Specialty</label>
                  <div className="info-value">{patientInfo.preferredProvider?.specialty}</div>
                </div>
                <div className="info-group">
                  <label>Location</label>
                  <div className="info-value">{patientInfo.preferredProvider?.location}</div>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h2>Preferred Pharmacy</h2>
              <div className="patient-info-grid">
                <div className="info-group">
                  <label>Pharmacy Name</label>
                  <div className="info-value">{patientInfo.preferredPharmacy?.name}</div>
                </div>
                <div className="info-group">
                  <label>Address</label>
                  <div className="info-value">{patientInfo.preferredPharmacy?.address}</div>
                </div>
                <div className="info-group">
                  <label>Phone</label>
                  <div className="info-value">{patientInfo.preferredPharmacy?.phone}</div>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h2>Preferred Lab</h2>
              <div className="patient-info-grid">
                <div className="info-group">
                  <label>Lab Name</label>
                  <div className="info-value">{patientInfo.preferredLab?.name}</div>
                </div>
                <div className="info-group">
                  <label>Address</label>
                  <div className="info-value">{patientInfo.preferredLab?.address}</div>
                </div>
                <div className="info-group">
                  <label>Phone</label>
                  <div className="info-value">{patientInfo.preferredLab?.phone}</div>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h2>Communication Preferences</h2>
              <div className="patient-info-grid">
                <div className="info-group">
                  <label>Appointment Reminders</label>
                  <div className="info-value">{patientInfo.communicationPreferences?.appointmentReminders}</div>
                </div>
                <div className="info-group">
                  <label>Lab Results</label>
                  <div className="info-value">{patientInfo.communicationPreferences?.labResults}</div>
                </div>
                <div className="info-group">
                  <label>General Communication</label>
                  <div className="info-value">{patientInfo.communicationPreferences?.generalCommunication}</div>
                </div>
                <div className="info-group">
                  <label>Patient Portal Access</label>
                  <div className="info-value">{patientInfo.communicationPreferences?.portal ? 'Enabled' : 'Disabled'}</div>
                </div>
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