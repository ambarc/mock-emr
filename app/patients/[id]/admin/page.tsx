'use client';

import React, { useState, useEffect } from 'react';
import { DetailPanel } from '../../../components/DetailPanel';
import { Insurance } from '../../../components/Insurance';
import { TaskBar } from '../../../components/TaskBar';
import { store } from '../../../utils/store';
import { EMRNav, EMRHeader } from '../../../components/EMRHeader';
import Link from 'next/link';

type SectionType = 'insurance' | 'preferred-provider' | 'primary-care' | 'pharmacy' | 'lab' | null;

type PageProps = {
  params: Promise<{ id: string }>;
};

interface InsuranceInfo {
  id: string;
  type: string;
  provider: string;
  policyNumber: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDOB: string;
  relationship: string;
  effectiveDate: string;
  expirationDate: string;
  cardFront: string | null;
  cardBack: string | null;
  createdAt: string;
}

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
  primaryCareProvider?: {
    name: string;
    npi: string;
    practice: string;
    address: string;
    phone: string;
    fax: string;
    lastVisit: string;
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
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo[]>([]);
  
  // Basic patient info only
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
    communicationPreferences: {
      appointmentReminders: "Text Message",
      labResults: "Patient Portal",
      generalCommunication: "Email",
      portal: true
    }
  };

  // Load insurance information
  useEffect(() => {
    const patientInsurance = store.getPatientInsurance(patientId);
    setInsuranceInfo(patientInsurance);
  }, [patientId]);

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'insurance':
        return <Insurance 
          patientId={patientId} 
          onSave={() => {
            setActiveSection(null);
            const patientInsurance = store.getPatientInsurance(patientId);
            setInsuranceInfo(patientInsurance);
          }}
        />;
      // TODO: Add other section forms
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                {insuranceInfo.length > 0 ? (
                  insuranceInfo.map((insurance) => (
                    <div key={insurance.id} className="info-group">
                      <div className="insurance-header">
                        <label>{insurance.type} Insurance</label>
                        <div className="insurance-actions">
                          <button 
                            className="action-btn"
                            onClick={() => handleSectionClick('insurance')}
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                        </div>
                      </div>
                      <div className="insurance-details">
                        <div className="info-row">
                          <span className="info-label">Provider:</span>
                          <span className="info-value">{insurance.provider}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Member ID:</span>
                          <span className="info-value">{insurance.policyNumber}</span>
                        </div>
                        {insurance.groupNumber && (
                          <div className="info-row">
                            <span className="info-label">Group #:</span>
                            <span className="info-value">{insurance.groupNumber}</span>
                          </div>
                        )}
                        {insurance.subscriberName && (
                          <div className="info-row">
                            <span className="info-label">Subscriber:</span>
                            <span className="info-value">{insurance.subscriberName}</span>
                          </div>
                        )}
                        <div className="info-row">
                          <span className="info-label">Effective:</span>
                          <span className="info-value">{formatDate(insurance.effectiveDate)}</span>
                        </div>
                        {insurance.expirationDate && (
                          <div className="info-row">
                            <span className="info-label">Expires:</span>
                            <span className="info-value">{formatDate(insurance.expirationDate)}</span>
                          </div>
                        )}
                        <div className="insurance-card-preview">
                          {(insurance.cardFront || insurance.cardBack) && (
                            <div className="card-images">
                              {insurance.cardFront && (
                                <div className="card-image">
                                  <span className="image-label">Front</span>
                                  <img src={insurance.cardFront} alt="Insurance Card Front" />
                                </div>
                              )}
                              {insurance.cardBack && (
                                <div className="card-image">
                                  <span className="image-label">Back</span>
                                  <img src={insurance.cardBack} alt="Insurance Card Back" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="info-group">
                    <div className="info-value no-data">No insurance information on file</div>
                  </div>
                )}
              </div>
            </section>

            <section className="info-section">
              <div className="section-header">
                <h2>Preferred Provider</h2>
                <button 
                  className="add-btn"
                  onClick={() => handleSectionClick('preferred-provider')}
                >
                  <i className="fa fa-plus-circle"></i> Add Provider
                </button>
              </div>
              {patientInfo.preferredProvider ? (
                <div className="patient-info-grid">
                  <div className="info-group">
                    <label>Provider Name</label>
                    <div className="info-value">{patientInfo.preferredProvider.name}</div>
                  </div>
                  <div className="info-group">
                    <label>Specialty</label>
                    <div className="info-value">{patientInfo.preferredProvider.specialty}</div>
                  </div>
                  <div className="info-group">
                    <label>Location</label>
                    <div className="info-value">{patientInfo.preferredProvider.location}</div>
                  </div>
                </div>
              ) : (
                <div className="info-group">
                  <div className="info-value no-data">No preferred provider on file</div>
                </div>
              )}
            </section>

            <section className="info-section">
              <div className="section-header">
                <h2>Primary Care Provider</h2>
                <button 
                  className="add-btn"
                  onClick={() => handleSectionClick('primary-care')}
                >
                  <i className="fa fa-plus-circle"></i> Add PCP
                </button>
              </div>
              {patientInfo.primaryCareProvider ? (
                <div className="patient-info-grid">
                  <div className="info-group">
                    <label>Provider Name</label>
                    <div className="info-value">{patientInfo.primaryCareProvider.name}</div>
                  </div>
                  <div className="info-group">
                    <label>NPI</label>
                    <div className="info-value">{patientInfo.primaryCareProvider.npi}</div>
                  </div>
                  <div className="info-group">
                    <label>Practice</label>
                    <div className="info-value">{patientInfo.primaryCareProvider.practice}</div>
                  </div>
                  <div className="info-group">
                    <label>Address</label>
                    <div className="info-value">{patientInfo.primaryCareProvider.address}</div>
                  </div>
                  <div className="info-group">
                    <label>Phone</label>
                    <div className="info-value">{patientInfo.primaryCareProvider.phone}</div>
                  </div>
                  <div className="info-group">
                    <label>Fax</label>
                    <div className="info-value">{patientInfo.primaryCareProvider.fax}</div>
                  </div>
                  <div className="info-group">
                    <label>Last Visit</label>
                    <div className="info-value">
                      {patientInfo.primaryCareProvider.lastVisit && 
                        new Date(patientInfo.primaryCareProvider.lastVisit).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="info-group">
                  <div className="info-value no-data">No primary care provider on file</div>
                </div>
              )}
            </section>

            <section className="info-section">
              <div className="section-header">
                <h2>Preferred Pharmacy</h2>
                <button 
                  className="add-btn"
                  onClick={() => handleSectionClick('pharmacy')}
                >
                  <i className="fa fa-plus-circle"></i> Add Pharmacy
                </button>
              </div>
              {patientInfo.preferredPharmacy ? (
                <div className="patient-info-grid">
                  <div className="info-group">
                    <label>Pharmacy Name</label>
                    <div className="info-value">{patientInfo.preferredPharmacy.name}</div>
                  </div>
                  <div className="info-group">
                    <label>Address</label>
                    <div className="info-value">{patientInfo.preferredPharmacy.address}</div>
                  </div>
                  <div className="info-group">
                    <label>Phone</label>
                    <div className="info-value">{patientInfo.preferredPharmacy.phone}</div>
                  </div>
                </div>
              ) : (
                <div className="info-group">
                  <div className="info-value no-data">No preferred pharmacy on file</div>
                </div>
              )}
            </section>

            <section className="info-section">
              <div className="section-header">
                <h2>Preferred Lab</h2>
                <button 
                  className="add-btn"
                  onClick={() => handleSectionClick('lab')}
                >
                  <i className="fa fa-plus-circle"></i> Add Lab
                </button>
              </div>
              {patientInfo.preferredLab ? (
                <div className="patient-info-grid">
                  <div className="info-group">
                    <label>Lab Name</label>
                    <div className="info-value">{patientInfo.preferredLab.name}</div>
                  </div>
                  <div className="info-group">
                    <label>Address</label>
                    <div className="info-value">{patientInfo.preferredLab.address}</div>
                  </div>
                  <div className="info-group">
                    <label>Phone</label>
                    <div className="info-value">{patientInfo.preferredLab.phone}</div>
                  </div>
                </div>
              ) : (
                <div className="info-group">
                  <div className="info-value no-data">No preferred lab on file</div>
                </div>
              )}
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
        title={activeSection ? activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ''}
      >
        {renderSectionContent()}
      </DetailPanel>

      <TaskBar />
    </div>
  );
} 