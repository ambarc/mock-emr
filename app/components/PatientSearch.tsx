'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const mockPatients = [
  { id: 1, name: 'Sarah Johnson', dob: '1985-03-15' },
  { id: 2, name: 'Michael Chen', dob: '1992-07-22' },
  { id: 3, name: 'Emily Rodriguez', dob: '1978-11-30' },
];

export default function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientSelect = (patientId: number) => {
    router.push(`/patients/${patientId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        placeholder="Search patients..."
        className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-900"
      />
      {showResults && searchQuery && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              onClick={() => handlePatientSelect(patient.id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium text-gray-900">{patient.name}</div>
              <div className="text-sm text-gray-700">
                DOB: {new Date(patient.dob).toLocaleDateString()}
              </div>
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <div className="px-4 py-2 text-gray-700">No patients found</div>
          )}
        </div>
      )}
    </div>
  );
} 