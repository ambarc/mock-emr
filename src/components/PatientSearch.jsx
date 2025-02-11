import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../context/PatientContext';

const mockPatients = [
  { id: 1, name: 'Sarah Johnson', dob: '1985-03-15' },
  { id: 2, name: 'Michael Chen', dob: '1992-07-22' },
  { id: 3, name: 'Emily Rodriguez', dob: '1978-11-30' },
  { id: 4, name: 'David Kim', dob: '1990-01-05' },
  // Add more mock patients as needed
];

function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { setSelectedPatient } = usePatient();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/patient/${patient.id}`);
  };

  return (
    <div className="h-16 border-b border-gray-200 px-4 flex items-center">
      <div className="relative w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search patients..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        {searchResults.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {searchResults.map(patient => (
              <div
                key={patient.id}
                onClick={() => selectPatient(patient)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div>{patient.name}</div>
                <div className="text-sm text-gray-500">DOB: {patient.dob}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientSearch; 