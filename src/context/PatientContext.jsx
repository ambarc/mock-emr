import { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientData, setPatientData] = useState({});

  return (
    <PatientContext.Provider value={{
      selectedPatient,
      setSelectedPatient,
      patientData,
      setPatientData
    }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  return useContext(PatientContext);
} 