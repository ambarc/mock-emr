'use client';

import React, { useState, useEffect } from 'react';
import { EMRNav, EMRHeader } from './components/EMRHeader';
import { TaskBar } from './components/TaskBar';
import Link from 'next/link';

type PageProps = {
  params: Promise<{}>;
};

type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  dateTime: string;
  type: string;
  provider: string;
  status: 'scheduled' | 'checked-in' | 'in-room' | 'with-provider' | 'completed' | 'cancelled';
  room?: string;
  duration: number;
  reasonForVisit: string;
  insuranceVerified: boolean;
  copayCollected?: boolean;
};

function generateMockAppointments(): Appointment[] {
  const appointmentTypes = ['Follow-up', 'New Patient', 'Annual Physical', 'Urgent Care', 'Vaccination', 'Lab Review'];
  const providers = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Jones', 'Dr. Garcia'];
  const reasons = [
    'Diabetes Follow-up',
    'Annual Wellness Visit',
    'High Blood Pressure',
    'Back Pain',
    'Respiratory Infection',
    'Medication Review'
  ];

  const appointments: Appointment[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day
  
  // Generate appointments for the next 14 days
  for (let i = 0; i < 14; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    // Generate 8-12 appointments per day
    const numAppointments = 8 + Math.floor(Math.random() * 5);
    
    for (let j = 0; j < numAppointments; j++) {
      const hour = 8 + Math.floor(j / 2); // Spread appointments from 8 AM
      const minute = (j % 2) * 30; // Alternate between :00 and :30
      
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hour, minute, 0, 0);

      const patientId = `patient${i}${j}`; // Deterministic ID
      appointments.push({
        id: `apt${i}${j}`, // Deterministic ID
        patientId,
        patientName: `Patient ${patientId.toUpperCase()}`,
        dateTime: appointmentDate.toISOString(),
        type: appointmentTypes[j % appointmentTypes.length],
        provider: providers[j % providers.length],
        status: 'scheduled',
        room: `${(j % 8) + 1}`,
        duration: [15, 30, 45][j % 3],
        reasonForVisit: reasons[j % reasons.length],
        insuranceVerified: j % 5 !== 0,
        copayCollected: j % 3 === 0
      });
    }
  }

  return appointments.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
}

function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

function getStatusColor(status: Appointment['status']): string {
  switch (status) {
    case 'checked-in': return '#fbbf24'; // amber
    case 'in-room': return '#60a5fa'; // blue
    case 'with-provider': return '#34d399'; // emerald
    case 'completed': return '#6b7280'; // gray
    case 'cancelled': return '#ef4444'; // red
    default: return '#a855f7'; // purple (scheduled)
  }
}

export default function Home({ params }: PageProps) {
  React.use(params);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const mockAppointments = generateMockAppointments();
    setAppointments(mockAppointments);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysApts = mockAppointments.filter(apt => {
      const aptDate = new Date(apt.dateTime);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate.getTime() === today.getTime();
    });
    setTodayAppointments(todaysApts);
  }, []);

  // Initial render with empty state
  return (
    <div className="emr-layout">
      <EMRNav />
      <EMRHeader />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <div className="left-content">
            <section className="info-section">
              <h2>
                Today's Schedule
                <span className="appointment-count">({todayAppointments.length} appointments)</span>
              </h2>
              <div className="appointments-grid">
                {todayAppointments.map(apt => (
                  <Link 
                    href={`/patients/${apt.patientId}/clinical`} 
                    key={apt.id}
                    className="appointment-card"
                  >
                    <div className="appointment-time">
                      {new Date(apt.dateTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                    <div className="appointment-details">
                      <div className="patient-name">{apt.patientName}</div>
                      <div className="appointment-type">{apt.type}</div>
                      <div className="appointment-provider">{apt.provider}</div>
                    </div>
                    <div 
                      className="appointment-status"
                      style={{ backgroundColor: getStatusColor(apt.status) }}
                    >
                      {apt.status}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="info-section">
              <h2>Upcoming Appointments</h2>
              <div className="appointments-list">
                {appointments.filter(apt => {
                  const aptDate = new Date(apt.dateTime);
                  aptDate.setHours(0, 0, 0, 0);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return aptDate.getTime() > today.getTime();
                }).map(apt => (
                  <Link 
                    href={`/patients/${apt.patientId}/clinical`}
                    key={apt.id}
                    className="appointment-row"
                  >
                    <div className="appointment-date">
                      {formatDateTime(apt.dateTime)}
                    </div>
                    <div className="appointment-info">
                      <div className="patient-name">{apt.patientName}</div>
                      <div className="appointment-type">{apt.type} with {apt.provider}</div>
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-reason">{apt.reasonForVisit}</div>
                      <div className="appointment-status-row">
                        <span 
                          className="status-indicator"
                          style={{ backgroundColor: getStatusColor(apt.status) }}
                        />
                        {apt.status}
                      </div>
                    </div>
                    <div className="appointment-verification">
                      {!apt.insuranceVerified && (
                        <span className="verification-badge insurance">
                          Insurance not verified
                        </span>
                      )}
                      {apt.insuranceVerified && !apt.copayCollected && (
                        <span className="verification-badge copay">
                          Copay not collected
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="right-content">
            <section className="info-section">
              <h2>Clinic Stats</h2>
              <div className="clinic-stats">
                <div className="stat-item">
                  <label>Today's Appointments</label>
                  <div className="stat-value">{todayAppointments.length}</div>
                </div>
                <div className="stat-item">
                  <label>Checked In</label>
                  <div className="stat-value">
                    {todayAppointments.filter(apt => apt.status === 'checked-in').length}
                  </div>
                </div>
                <div className="stat-item">
                  <label>With Provider</label>
                  <div className="stat-value">
                    {todayAppointments.filter(apt => apt.status === 'with-provider').length}
                  </div>
                </div>
                <div className="stat-item">
                  <label>Completed</label>
                  <div className="stat-value">
                    {todayAppointments.filter(apt => apt.status === 'completed').length}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <TaskBar />
    </div>
  );
}
