import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePatient } from '../context/PatientContext';
import Demographics from './forms/Demographics';
import Insurance from './forms/Insurance';
import ClinicalNotes from './forms/ClinicalNotes';
import Problems from './forms/Problems';
import Medications from './forms/Medications';
import SurgicalHistory from './forms/SurgicalHistory';
import SubstanceHistory from './forms/SubstanceHistory';
import WorkHistory from './forms/WorkHistory';
import WeightHistory from './forms/WeightHistory';
import ExerciseHistory from './forms/ExerciseHistory';
import SleepHistory from './forms/SleepHistory';
import FoodPreferences from './forms/FoodPreferences';

function PatientChart() {
  const location = useLocation();
  const { selectedPatient } = usePatient();
  const searchParams = new URLSearchParams(location.search);
  const section = searchParams.get('section') || 'demographics';

  const components = {
    demographics: Demographics,
    insurance: Insurance,
    notes: ClinicalNotes,
    problems: Problems,
    medications: Medications,
    surgicalHistory: SurgicalHistory,
    substanceHistory: SubstanceHistory,
    workHistory: WorkHistory,
    weightHistory: WeightHistory,
    exerciseHistory: ExerciseHistory,
    sleepHistory: SleepHistory,
    foodPreferences: FoodPreferences,
  };

  const Component = components[section];

  if (!selectedPatient) {
    return <div>No patient selected</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)]">
      <Component />
    </div>
  );
}

export default PatientChart; 