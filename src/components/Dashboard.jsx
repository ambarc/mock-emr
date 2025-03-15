import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockPatients = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    dob: '1985-03-15',
    lastVisit: '2024-02-15',
    nextVisit: '2024-03-15',
    bmi: 32.4,
    weightTrend: 'decreasing',
    alerts: ['Lab results pending', 'Insurance pre-auth needed']
  },
  { 
    id: 2, 
    name: 'Michael Chen', 
    dob: '1992-07-22',
    lastVisit: '2024-02-10',
    nextVisit: '2024-03-10',
    bmi: 38.1,
    weightTrend: 'stable',
    alerts: ['New medication started']
  },
  { 
    id: 3, 
    name: 'Emily Rodriguez', 
    dob: '1978-11-30',
    lastVisit: '2024-02-01',
    nextVisit: '2024-03-01',
    bmi: 35.7,
    weightTrend: 'increasing',
    alerts: ['Missed last appointment']
  },
];

const todaysAppointments = [
  {
    time: '9:00 AM',
    patient: 'David Kim',
    type: 'Follow-up',
    status: 'Checked In'
  },
  {
    time: '10:30 AM',
    patient: 'Sarah Johnson',
    type: 'Weight Check',
    status: 'Scheduled'
  },
  {
    time: '2:00 PM',
    patient: 'Michael Chen',
    type: 'Initial Consultation',
    status: 'Scheduled'
  }
];

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const goToPatient = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Patients */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
            <div className="space-y-4">
              {mockPatients.map(patient => (
                <div 
                  key={patient.id}
                  className="p-4 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => goToPatient(patient.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <div className="text-sm text-gray-500">
                        DOB: {patient.dob}
                      </div>
                      <div className="text-sm text-gray-500">
                        Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">BMI: {patient.bmi}</div>
                      <div className={`text-sm ${
                        patient.weightTrend === 'decreasing' ? 'text-green-600' :
                        patient.weightTrend === 'increasing' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        Weight Trend: {patient.weightTrend}
                      </div>
                    </div>
                  </div>
                  {patient.alerts && patient.alerts.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {patient.alerts.map((alert, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                        >
                          {alert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Clinical Reminders</h2>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
                3 patients need insurance pre-authorization
              </div>
              <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
                5 lab results pending review
              </div>
              <div className="p-3 bg-green-50 text-green-800 rounded-md">
                2 patients achieved weight loss goals
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Today's Schedule */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {todaysAppointments.map((appt, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-md">
                  <div className="font-medium">{appt.time}</div>
                  <div>{appt.patient}</div>
                  <div className="text-sm text-gray-500">{appt.type}</div>
                  <div className={`text-sm ${
                    appt.status === 'Checked In' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {appt.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-2xl font-bold text-gray-700">15</div>
                <div className="text-sm text-gray-500">Patients Today</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-2xl font-bold text-gray-700">8</div>
                <div className="text-sm text-gray-500">New This Week</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 