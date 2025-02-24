'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockPatients, Patient, Allergy, Problem, Medication, Surgery, ClinicalNote, WeightEntry, Exercise, Insurance, SubstanceHistory } from '@/app/lib/mockPatientData';
import { useParams } from 'next/navigation';

const formatPhoneNumber = (value: string) => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '');
  
  // Format the number as the user types
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

type FormSection = 
  | 'Demographics'
  | 'Insurance'
  | 'Clinical Notes'
  | 'Problems'
  | 'Medications'
  | 'Allergies'
  | 'Surgical History'
  | 'Substance History'
  | 'Work History'
  | 'Weight History'
  | 'Exercise History'
  | 'Sleep History'
  | 'Food Preferences';

export default function PatientChart() {
  const params = useParams();
  const patientId = typeof params.id === 'string' ? parseInt(params.id) : 2; // default to Michael Chen if invalid ID
  const [selectedSection, setSelectedSection] = useState<FormSection>('Demographics');
  const [insuranceType, setInsuranceType] = useState<'primary' | 'secondary'>('primary');
  const [newInsurance, setNewInsurance] = useState({
    provider: '',
    memberId: '',
    groupNumber: '',
    planType: '',
    effectiveDate: '',
    expirationDate: '',
    copay: '',
    deductible: '',
    preAuthNotes: '',
    subscriberName: '',
    subscriberRelation: '',
    subscriberDOB: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: ''
  });
  const [newNote, setNewNote] = useState({
    note: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [newSurgery, setNewSurgery] = useState({
    name: '',
    date: '',
    complications: '',
    notes: ''
  });
  const [newProblem, setNewProblem] = useState({
    name: '',
    code: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });
  const [newWeight, setNewWeight] = useState({
    weight: '',
    date: new Date().toISOString().split('T')[0],
    context: 'routine'
  });
  const [newExercise, setNewExercise] = useState({
    activity: '',
    type: 'cardio',
    frequency: '',
    duration: '',
    intensity: 'moderate',
    limitations: ''
  });
  const [newSleep, setNewSleep] = useState({
    averageHours: '',
    sleepQuality: 'good',
    bedtime: '',
    wakeTime: '',
    snoring: false,
    sleepApnea: false,
    insomnia: false,
    restlessLegs: false,
    daytimeSleepiness: '',
    caffeineTiming: '',
    screenTime: '',
    sleepEnvironment: '',
    additionalNotes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [patient, setPatient] = useState<Patient>(mockPatients[patientId]);
  const [newSubstanceHistory, setNewSubstanceHistory] = useState({
    alcohol: {
      current: false,
      frequency: '',
      type: '',
      amount: '',
      yearsOfUse: '',
      lastUse: '',
    },
    tobacco: {
      current: false,
      type: '',
      packsPerDay: '',
      yearsOfUse: '',
      quitDate: '',
    },
    caffeine: {
      coffee: {
        cupsPerDay: '',
        type: '', // regular, decaf
      },
      soda: {
        ouncesPerDay: '',
        type: '', // regular, diet
      },
      energyDrinks: {
        frequency: '',
        type: '',
      },
    },
    otherSubstances: '',
  });
  const [newAllergy, setNewAllergy] = useState({
    name: '',
    severity: '',
    reaction: '',
    dateIdentified: new Date().toISOString().split('T')[0]
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const commonSurgeries = [
    { name: 'Appendectomy', category: 'General' },
    { name: 'Cholecystectomy', category: 'General' },
    { name: 'Hernia Repair', category: 'General' },
    { name: 'Tonsillectomy', category: 'ENT' },
    { name: 'Knee Arthroscopy', category: 'Orthopedic' },
    { name: 'Hip Replacement', category: 'Orthopedic' },
    { name: 'Cataract Surgery', category: 'Ophthalmology' },
    { name: 'Wisdom Teeth Extraction', category: 'Dental' },
  ];

  const commonAllergens = [
    'Penicillin',
    'Sulfa Drugs',
    'NSAIDs',
    'Shellfish',
    'Peanuts',
    'Tree Nuts',
    'Eggs',
    'Milk',
    'Soy',
    'Wheat',
    'Fish',
    'Latex',
    'Contrast Dye',
    'Bee Stings',
  ];

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new medication
    const updatedPatient = {
      ...patient,
      medications: [
        ...patient.medications,
        {
          id: Date.now(), // Using timestamp as a simple unique ID
          name: newMedication.name,
          dosage: newMedication.dosage,
          frequency: newMedication.frequency,
          instructions: newMedication.instructions,
          dateAdded: new Date().toISOString().split('T')[0],
          severity: 1 // Default severity
        }
      ]
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      instructions: ''
    });

    // Log the update (this would typically be an API call)
    console.log('Added new medication:', updatedPatient.medications[updatedPatient.medications.length - 1]);
  };

  const handleDiscontinueMedication = (medId: number) => {
    // Here you would typically make an API call to discontinue the medication
    console.log('Discontinuing medication:', medId);
  };

  const handleAddSurgery = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the surgery
    console.log('Adding surgery:', newSurgery);
    // Reset form
    setNewSurgery({
      name: '',
      date: '',
      complications: '',
      notes: ''
    });
    setSearchTerm('');
  };

  const handleInsuranceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new insurance information
    const updatedPatient = {
      ...patient,
      insurance: {
        ...patient.insurance,
        [insuranceType]: {
          provider: newInsurance.provider,
          memberId: newInsurance.memberId,
          groupNumber: newInsurance.groupNumber,
          preAuthNotes: newInsurance.preAuthNotes,
          planType: newInsurance.planType,
          effectiveDate: newInsurance.effectiveDate,
          expirationDate: newInsurance.expirationDate,
          copay: newInsurance.copay,
          deductible: newInsurance.deductible,
          subscriberName: newInsurance.subscriberName,
          subscriberRelation: newInsurance.subscriberRelation,
          subscriberDOB: newInsurance.subscriberDOB
        }
      }
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);

    // Reset form
    setNewInsurance({
      provider: '',
      memberId: '',
      groupNumber: '',
      planType: '',
      effectiveDate: '',
      expirationDate: '',
      copay: '',
      deductible: '',
      preAuthNotes: '',
      subscriberName: '',
      subscriberRelation: '',
      subscriberDOB: ''
    });

    // Log the update (this would typically be an API call)
    console.log('Updated patient insurance:', updatedPatient.insurance);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new note
    const updatedPatient = {
      ...patient,
      clinicalNotes: [
        {
          date: newNote.date,
          note: newNote.note
        },
        ...patient.clinicalNotes
      ]
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewNote({
      note: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Log the update (this would typically be an API call)
    console.log('Added new clinical note:', updatedPatient.clinicalNotes[0]);
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new problem
    const updatedPatient = {
      ...patient,
      problems: [
        {
          id: Date.now(), // Using timestamp as a simple unique ID
          name: newProblem.name,
          code: newProblem.code,
          dateAdded: newProblem.dateAdded
        },
        ...patient.problems
      ]
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewProblem({
      name: '',
      code: '',
      dateAdded: new Date().toISOString().split('T')[0]
    });

    // Log the update (this would typically be an API call)
    console.log('Added new problem:', updatedPatient.problems[0]);
  };

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new weight entry
    const updatedPatient = {
      ...patient,
      weightHistory: [
        {
          id: Date.now(), // Using timestamp as a simple unique ID
          weight: parseFloat(newWeight.weight),
          date: newWeight.date,
          context: newWeight.context
        },
        ...patient.weightHistory
      ]
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewWeight({
      weight: '',
      date: new Date().toISOString().split('T')[0],
      context: 'routine'
    });

    // Log the update (this would typically be an API call)
    console.log('Added new weight entry:', updatedPatient.weightHistory[0]);
  };

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new exercise entry
    const updatedPatient = {
      ...patient,
      exerciseHistory: [
        {
          id: Date.now(), // Using timestamp as a simple unique ID
          activity: newExercise.activity,
          type: newExercise.type,
          frequency: newExercise.frequency,
          duration: newExercise.duration,
          intensity: newExercise.intensity,
          limitations: newExercise.limitations
        },
        ...patient.exerciseHistory
      ]
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewExercise({
      activity: '',
      type: 'cardio',
      frequency: '',
      duration: '',
      intensity: 'moderate',
      limitations: ''
    });

    // Log the update (this would typically be an API call)
    console.log('Added new exercise:', updatedPatient.exerciseHistory[0]);
  };

  const handleUpdateSleep = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new sleep information
    const updatedPatient = {
      ...patient,
      sleepHistory: {
        averageHours: newSleep.averageHours,
        sleepQuality: newSleep.sleepQuality,
        bedtime: newSleep.bedtime,
        wakeTime: newSleep.wakeTime,
        snoring: newSleep.snoring,
        sleepApnea: newSleep.sleepApnea,
        insomnia: newSleep.insomnia,
        restlessLegs: newSleep.restlessLegs,
        daytimeSleepiness: newSleep.daytimeSleepiness,
        caffeineTiming: newSleep.caffeineTiming,
        screenTime: newSleep.screenTime,
        sleepEnvironment: newSleep.sleepEnvironment,
        additionalNotes: newSleep.additionalNotes
      }
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewSleep({
      averageHours: '',
      sleepQuality: 'good',
      bedtime: '',
      wakeTime: '',
      snoring: false,
      sleepApnea: false,
      insomnia: false,
      restlessLegs: false,
      daytimeSleepiness: '',
      caffeineTiming: '',
      screenTime: '',
      sleepEnvironment: '',
      additionalNotes: ''
    });

    // Log the update (this would typically be an API call)
    console.log('Updated sleep history:', updatedPatient.sleepHistory);
  };

  const handleUpdateSubstanceHistory = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const substanceHistory: SubstanceHistory = {
      alcohol: {
        current: formData.get('alcoholCurrent') === 'true',
        frequency: formData.get('alcoholFrequency') as string,
        type: formData.get('alcoholType') as string,
        amount: formData.get('alcoholAmount') as string,
        yearsOfUse: formData.get('alcoholYearsOfUse') as string,
        lastUse: formData.get('alcoholLastUse') as string,
      },
      tobacco: {
        current: formData.get('tobaccoCurrent') === 'true',
        type: formData.get('tobaccoType') as string,
      },
      caffeine: {
        coffee: {
          cupsPerDay: formData.get('coffeeCupsPerDay') as string,
          type: formData.get('coffeeType') as string,
        },
        soda: {
          ouncesPerDay: formData.get('sodaOuncesPerDay') as string,
          type: formData.get('sodaType') as string,
        },
        energyDrinks: {
          frequency: formData.get('energyDrinksFrequency') as string,
          type: formData.get('energyDrinksType') as string,
        },
      },
    };

    setPatient(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        substanceHistory
      };
    });
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllergy.name && newAllergy.severity) {
      const updatedPatient = {
        ...patient,
        allergies: [
          {
            id: Date.now(),
            ...newAllergy
          },
          ...(patient.allergies || [])
        ]
      };
      setPatient(updatedPatient);
      setNewAllergy({
        name: '',
        severity: '',
        reaction: '',
        dateIdentified: new Date().toISOString().split('T')[0]
      });
      console.log('Added new allergy:', newAllergy);
    }
  };

  const handleRemoveAllergy = (allergyId: number) => {
    const updatedPatient = {
      ...patient,
      allergies: patient.allergies.filter(allergy => allergy.id !== allergyId)
    };
    setPatient(updatedPatient);
  };

  const handleInsuranceChange = (type: 'primary' | 'secondary', field: keyof Insurance, value: string) => {
    setPatient(prev => ({
      ...prev,
      insurance: {
        ...prev.insurance,
        [type]: type === 'secondary' && !prev.insurance.secondary 
          ? { provider: '', memberId: '', groupNumber: '', preAuthNotes: '', [field]: value }
          : {
              ...(type === 'primary' ? prev.insurance.primary : prev.insurance.secondary),
              [field]: value
            }
      }
    }));
  };

  const handleSaveDemographics = () => {
    console.log('Demographics saved:', patient.demographics);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000); // Hide after 3 seconds
  };

  const renderFormContent = () => {
    switch (selectedSection) {
      case 'Demographics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Name</label>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Date of Birth</label>
                <input
                  type="date"
                  value={patient.dob}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    dob: e.target.value
                  }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Phone</label>
                <input
                  type="tel"
                  value={patient.demographics.phone}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      phone: formatPhoneNumber(e.target.value)
                    }
                  }))}
                  maxLength={14}
                  placeholder="(555) 555-5555"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  value={patient.demographics.email}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      email: e.target.value
                    }
                  }))}
                  placeholder="patient@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Address</label>
              <input
                type="text"
                value={patient.demographics.address}
                onChange={(e) => setPatient(prev => ({
                  ...prev,
                  demographics: {
                    ...prev.demographics,
                    address: e.target.value
                  }
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">City</label>
                <input
                  type="text"
                  value={patient.demographics.city}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      city: e.target.value
                    }
                  }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">State</label>
                <input
                  type="text"
                  value={patient.demographics.state}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      state: e.target.value
                    }
                  }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">ZIP</label>
                <input
                  type="text"
                  value={patient.demographics.zip}
                  onChange={(e) => setPatient(prev => ({
                    ...prev,
                    demographics: {
                      ...prev.demographics,
                      zip: e.target.value
                    }
                  }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div className="flex items-center gap-4">
                {showSaveSuccess && (
                  <span className="text-green-600 text-sm">
                    Demographics saved successfully!
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSaveDemographics}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  Save Demographics
                </button>
              </div>
            </div>
          </div>
        );

      case 'Problems':
        return (
          <div className="space-y-6">
            {/* Add New Problem Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Problem</h3>
              <form onSubmit={handleAddProblem} className="space-y-4">
                <div>
                  <label htmlFor="problem-name" className="block text-sm font-medium text-gray-700">
                    Problem Name
                  </label>
                  <input
                    type="text"
                    id="problem-name"
                    value={newProblem.name}
                    onChange={(e) => setNewProblem({ ...newProblem, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="problem-code" className="block text-sm font-medium text-gray-700">
                    ICD-10 Code
                  </label>
                  <input
                    type="text"
                    id="problem-code"
                    value={newProblem.code}
                    onChange={(e) => setNewProblem({ ...newProblem, code: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="problem-date" className="block text-sm font-medium text-gray-700">
                    Date Added
                  </label>
                  <input
                    type="date"
                    id="problem-date"
                    value={newProblem.dateAdded}
                    onChange={(e) => setNewProblem({ ...newProblem, dateAdded: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Add Problem
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Problems List */}
            <div className="space-y-4">
              {patient.problems.map(problem => (
                <div key={problem.id} className="p-4 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-900">{problem.name}</div>
                  <div className="text-sm text-gray-900">ICD-10: {problem.code}</div>
                  <div className="text-sm text-gray-900">
                    Added: {new Date(problem.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Medications':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
              {patient.medications.length > 0 ? (
                <div className="space-y-4">
                  {patient.medications.map((med, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium text-gray-900">{med.name}</h4>
                        <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                        <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                        {med.instructions && (
                          <p className="text-sm text-gray-600 mt-1">Instructions: {med.instructions}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDiscontinueMedication(index)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        Discontinue
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No current medications</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Medication</h3>
              <form onSubmit={handleAddMedication} className="space-y-4">
                <div>
                  <label htmlFor="med-name" className="block text-sm font-medium text-gray-700">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    id="med-name"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="med-dosage" className="block text-sm font-medium text-gray-700">
                    Dosage
                  </label>
                  <input
                    type="text"
                    id="med-dosage"
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="med-frequency" className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    id="med-frequency"
                    value={newMedication.frequency}
                    onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                    className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="med-instructions" className="block text-sm font-medium text-gray-700">
                    Additional Instructions
                  </label>
                  <textarea
                    id="med-instructions"
                    value={newMedication.instructions}
                    onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Add Medication
                </button>
              </form>
            </div>
          </div>
        );

      case 'Allergies':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-gray-900">Add New Allergy</h3>
              <form onSubmit={handleAddAllergy} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Allergen
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newAllergy.name}
                      onChange={(e) => setNewAllergy({ ...newAllergy, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-900 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Enter or select allergen..."
                      list="common-allergens"
                    />
                    <datalist id="common-allergens">
                      {commonAllergens.map((allergen) => (
                        <option key={allergen} value={allergen} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="grid grid-cols-2 text-gray-900 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Severity
                    </label>
                    <select
                      value={newAllergy.severity}
                      onChange={(e) => setNewAllergy({ ...newAllergy, severity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      <option value="">Select severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Date Identified
                    </label>
                    <input
                      type="date"
                      value={newAllergy.dateIdentified}
                      onChange={(e) => setNewAllergy({ ...newAllergy, dateIdentified: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Reaction
                  </label>
                  <textarea
                    value={newAllergy.reaction}
                    onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
                    className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    rows={2}
                    placeholder="Describe the allergic reaction..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newAllergy.name || !newAllergy.severity}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add Allergy
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Known Allergies</h3>
              <div className="space-y-2">
                {patient.allergies?.map((allergy) => (
                  <div
                    key={allergy.id}
                    className="flex justify-between items-start p-4 bg-gray-50 rounded-md"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{allergy.name}</div>
                      <div className="text-sm text-gray-900">
                        Severity: {allergy.severity}
                      </div>
                      {allergy.reaction && (
                        <div className="text-sm text-gray-900">
                          Reaction: {allergy.reaction}
                        </div>
                      )}
                      <div className="text-sm text-gray-900">
                        Identified: {new Date(allergy.dateIdentified).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveAllergy(allergy.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {!patient.allergies?.length && (
                  <div className="text-gray-900 text-center py-4">
                    No known allergies
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Surgical History':
        const filteredSurgeries = commonSurgeries.filter(surgery =>
          surgery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          surgery.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Surgical History</h3>
              <div className="space-y-4">
                {patient.surgicalHistory.map(surgery => (
                  <div key={surgery.id} className="p-4 bg-gray-50 rounded-md">
                    <div className="font-medium text-gray-900">{surgery.name}</div>
                    <div className="text-sm text-gray-600">
                      Date: {new Date(surgery.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Complications: {surgery.complications || 'None reported'}
                    </div>
                    {surgery.notes && (
                      <div className="text-sm text-gray-600 mt-1">
                        Notes: {surgery.notes}
                      </div>
                    )}
                  </div>
                ))}
                {patient.surgicalHistory.length === 0 && (
                  <p className="text-gray-600">No surgical history recorded</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Surgery</h3>
              <form onSubmit={handleAddSurgery} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Search Common Surgeries
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Search or enter custom surgery name..."
                    />
                    {searchTerm && filteredSurgeries.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredSurgeries.map((surgery, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setNewSurgery({ ...newSurgery, name: surgery.name });
                              setSearchTerm(surgery.name);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <div className="font-medium">{surgery.name}</div>
                            <div className="text-sm text-gray-500">Category: {surgery.category}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="surgery-name" className="block text-sm font-medium text-gray-700">
                    Surgery Name
                  </label>
                  <input
                    type="text"
                    id="surgery-name"
                    value={newSurgery.name}
                    onChange={(e) => setNewSurgery({ ...newSurgery, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="surgery-date" className="block text-sm font-medium text-gray-700">
                    Date of Surgery
                  </label>
                  <input
                    type="date"
                    id="surgery-date"
                    value={newSurgery.date}
                    onChange={(e) => setNewSurgery({ ...newSurgery, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="surgery-complications" className="block text-sm font-medium text-gray-700">
                    Complications
                  </label>
                  <input
                    type="text"
                    id="surgery-complications"
                    value={newSurgery.complications}
                    onChange={(e) => setNewSurgery({ ...newSurgery, complications: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter any complications (if applicable)"
                  />
                </div>

                <div>
                  <label htmlFor="surgery-notes" className="block text-sm font-medium text-gray-700">
                    Additional Notes
                  </label>
                  <textarea
                    id="surgery-notes"
                    value={newSurgery.notes}
                    onChange={(e) => setNewSurgery({ ...newSurgery, notes: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter any additional notes about the surgery..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Add Surgery
                </button>
              </form>
            </div>
          </div>
        );

      case 'Insurance':
        const insuranceProviders = [
          'Aetna',
          'Anthem Blue Cross',
          'Blue Cross Blue Shield',
          'Cigna',
          'UnitedHealthcare',
          'Humana',
          'Kaiser Permanente',
          'Medicare',
          'Medicaid',
          'Oxford',
          'Molina Healthcare',
          'Centene',
          'Health Net',
          'WellCare',
          'Ambetter',
          'TRICARE',
          'Veterans Affairs (VA)'
        ];

        return (
          <div className="space-y-6">
            {showSuccessMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                Insurance information updated successfully
              </div>
            )}

            {/* Current Insurance Display */}
            <div className="space-y-6">
              {/* Primary Insurance */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-4">Primary Insurance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Provider</label>
                    <div className="text-gray-900">{patient.insurance.primary?.provider}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Member ID</label>
                    <div className="text-gray-900">{patient.insurance.primary?.memberId}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Group Number</label>
                    <div className="text-gray-900">{patient.insurance.primary?.groupNumber}</div>
                  </div>
                  {patient.insurance.primary?.preAuthNotes && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-900">Pre-Authorization Notes</label>
                      <div className="text-gray-900">{patient.insurance.primary?.preAuthNotes}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Insurance */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-4">Secondary Insurance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Provider</label>
                    <div className="text-gray-900">{patient.insurance.secondary?.provider || 'None'}</div>
                  </div>
                  {patient.insurance.secondary?.provider && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">Member ID</label>
                        <div className="text-gray-900">{patient.insurance.secondary.memberId}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">Group Number</label>
                        <div className="text-gray-900">{patient.insurance.secondary.groupNumber}</div>
                      </div>
                      {patient.insurance.secondary.preAuthNotes && (
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-900">Pre-Authorization Notes</label>
                          <div className="text-gray-900">{patient.insurance.secondary.preAuthNotes}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Update Insurance Form */}
            <div className="bg-white p-6 rounded-lg shadow text-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Insurance Information</h3>
              
              <div className="mb-6">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setInsuranceType('primary')}
                    className={`px-4 py-2 rounded-md ${
                      insuranceType === 'primary'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Primary Insurance
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsuranceType('secondary')}
                    className={`px-4 py-2 rounded-md ${
                      insuranceType === 'secondary'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Secondary Insurance
                  </button>
                </div>
              </div>

              <form onSubmit={handleInsuranceSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Insurance Provider</label>
                    <select
                      value={newInsurance.provider}
                      onChange={(e) => setNewInsurance({ ...newInsurance, provider: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select provider</option>
                      {insuranceProviders.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member ID</label>
                    <input
                      type="text"
                      value={newInsurance.memberId}
                      onChange={(e) => setNewInsurance({ ...newInsurance, memberId: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter member ID"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Group Number</label>
                    <input
                      type="text"
                      value={newInsurance.groupNumber}
                      onChange={(e) => setNewInsurance({ ...newInsurance, groupNumber: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter group number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Type</label>
                    <select
                      value={newInsurance.planType}
                      onChange={(e) => setNewInsurance({ ...newInsurance, planType: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select plan type</option>
                      <option value="HMO">HMO</option>
                      <option value="PPO">PPO</option>
                      <option value="EPO">EPO</option>
                      <option value="POS">POS</option>
                      <option value="HDHP">HDHP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                    <input
                      type="date"
                      value={newInsurance.effectiveDate}
                      onChange={(e) => setNewInsurance({ ...newInsurance, effectiveDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input
                      type="date"
                      value={newInsurance.expirationDate}
                      onChange={(e) => setNewInsurance({ ...newInsurance, expirationDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Copay</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        value={newInsurance.copay}
                        onChange={(e) => setNewInsurance({ ...newInsurance, copay: e.target.value })}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deductible</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        value={newInsurance.deductible}
                        onChange={(e) => setNewInsurance({ ...newInsurance, deductible: e.target.value })}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Subscriber Information</label>
                    <div className="grid grid-cols-3 gap-4 mt-1">
                      <input
                        type="text"
                        value={newInsurance.subscriberName}
                        onChange={(e) => setNewInsurance({ ...newInsurance, subscriberName: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Subscriber Name"
                      />
                      <select
                        value={newInsurance.subscriberRelation}
                        onChange={(e) => setNewInsurance({ ...newInsurance, subscriberRelation: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Relation to Patient</option>
                        <option value="self">Self</option>
                        <option value="spouse">Spouse</option>
                        <option value="parent">Parent</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                        type="date"
                        value={newInsurance.subscriberDOB}
                        onChange={(e) => setNewInsurance({ ...newInsurance, subscriberDOB: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Subscriber DOB"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Pre-Authorization Notes</label>
                    <textarea
                      value={newInsurance.preAuthNotes}
                      onChange={(e) => setNewInsurance({ ...newInsurance, preAuthNotes: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter any pre-authorization notes or requirements"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setNewInsurance({
                      provider: '',
                      memberId: '',
                      groupNumber: '',
                      planType: '',
                      effectiveDate: '',
                      expirationDate: '',
                      copay: '',
                      deductible: '',
                      preAuthNotes: '',
                      subscriberName: '',
                      subscriberRelation: '',
                      subscriberDOB: ''
                    })}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Update {insuranceType === 'primary' ? 'Primary' : 'Secondary'} Insurance
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'Clinical Notes':
        return (
          <div className="space-y-6 text-gray-900">
            {/* Add New Note Form */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Clinical Note</h3>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newNote.date}
                    onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Clinical Note
                  </label>
                  <textarea
                    value={newNote.note}
                    onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter clinical note..."
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Add Note
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Notes */}
            <div className="space-y-4">
              {patient.clinicalNotes.map((note, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-900">
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                  <div className="mt-2 text-gray-900 whitespace-pre-wrap">
                    {note.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Substance History':
        return (
          <form onSubmit={handleUpdateSubstanceHistory} className="max-w-3xl space-y-6">
            <div className="bg-white p-6 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Alcohol Use</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="alcoholCurrent"
                    name="alcoholCurrent"
                    defaultChecked={patient?.substanceHistory.alcohol.current}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="alcoholCurrent" className="ml-2 text-sm text-gray-700">
                    Current alcohol use
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Frequency</label>
                    <select
                      name="alcoholFrequency"
                      defaultValue={patient?.substanceHistory.alcohol.frequency}
                      className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="occasionally">Occasionally</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      name="alcoholType"
                      defaultValue={patient?.substanceHistory.alcohol.type}
                      className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      placeholder="e.g., Beer, Wine, Spirits"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Amount</label>
                    <input
                      type="text"
                      name="alcoholAmount"
                      defaultValue={patient?.substanceHistory.alcohol.amount}
                      className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      placeholder="e.g., 2-3 drinks per occasion"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Years of Use</label>
                    <input
                      type="text"
                      name="alcoholYearsOfUse"
                      defaultValue={patient?.substanceHistory.alcohol.yearsOfUse}
                      className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900">Last Use</label>
                  <input
                    type="date"
                    name="alcoholLastUse"
                    defaultValue={patient?.substanceHistory.alcohol.lastUse}
                    className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tobacco Use</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tobaccoCurrent"
                    name="tobaccoCurrent"
                    defaultChecked={patient?.substanceHistory.tobacco.current}
                    className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="tobaccoCurrent" className="ml-2 text-sm text-gray-700">
                    Current tobacco use
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    name="tobaccoType"
                    defaultValue={patient?.substanceHistory.tobacco.type}
                    className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    placeholder="e.g., Cigarettes, Vaping, etc."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Caffeine Intake</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Coffee</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700">Cups per day</label>
                      <input
                        type="text"
                        name="coffeeCupsPerDay"
                        defaultValue={patient?.substanceHistory.caffeine.coffee.cupsPerDay}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700">Type</label>
                      <select
                        name="coffeeType"
                        defaultValue={patient?.substanceHistory.caffeine.coffee.type}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">Select type</option>
                        <option value="regular">Regular</option>
                        <option value="decaf">Decaf</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Soda</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700">Ounces per day</label>
                      <input
                        type="text"
                        name="sodaOuncesPerDay"
                        defaultValue={patient?.substanceHistory.caffeine.soda.ouncesPerDay}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700">Type</label>
                      <select
                        name="sodaType"
                        defaultValue={patient?.substanceHistory.caffeine.soda.type}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">Select type</option>
                        <option value="regular">Regular</option>
                        <option value="diet">Diet</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Energy Drinks</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-900 text-sm text-gray-700">Frequency</label>
                      <select
                        name="energyDrinksFrequency"
                        defaultValue={patient?.substanceHistory.caffeine.energyDrinks.frequency}
                        className="mt-1 text-gray-900 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">Select frequency</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                        <option value="multiple_daily">Multiple times per day</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-900 text-sm text-gray-700">Type</label>
                      <input
                        type="text"
                        name="energyDrinksType"
                        defaultValue={patient?.substanceHistory.caffeine.energyDrinks.type}
                        className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                        placeholder="e.g., Red Bull, Monster, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Save Substance History
              </button>
            </div>
          </form>
        );

      case 'Work History':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Employment Status</label>
                  <div className="text-gray-900">{patient.workHistory.currentlyEmployed ? 'Currently Employed' : 'Not Employed'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Occupation</label>
                  <div className="text-gray-900">{patient.workHistory.occupation}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Employer</label>
                  <div className="text-gray-900">{patient.workHistory.employer}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Schedule</label>
                  <div className="text-gray-900 capitalize">{patient.workHistory.schedule}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Physical Demands</label>
                  <div className="text-gray-900 capitalize">{patient.workHistory.physicalDemands}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Work Environment</label>
                  <div className="text-gray-900">{patient.workHistory.workEnvironment}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Meals at Work</label>
                  <div className="text-gray-900">{patient.workHistory.mealsAtWork}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Exercise Opportunities</label>
                  <div className="text-gray-900">{patient.workHistory.exerciseOpportunities}</div>
                </div>
                {patient.workHistory.additionalNotes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Additional Notes</label>
                    <div className="text-gray-900">{patient.workHistory.additionalNotes}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Weight History':
        return (
          <div className="space-y-6 text-gray-900">
            {/* Add New Weight Entry Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Weight Measurement</h3>
              <form onSubmit={handleAddWeight} className="space-y-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={newWeight.weight}
                    onChange={(e) => setNewWeight({ ...newWeight, weight: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    step="0.1"
                    min="0"
                  />
                </div>

                <div className="text-gray-900">
                  <label htmlFor="weight-date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="weight-date"
                    value={newWeight.date}
                    onChange={(e) => setNewWeight({ ...newWeight, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="text-gray-900">
                  <label htmlFor="weight-context" className="block text-sm font-medium text-gray-700">
                    Context
                  </label>
                  <select
                    id="weight-context"
                    value={newWeight.context}
                    onChange={(e) => setNewWeight({ ...newWeight, context: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="routine">Routine Check-up</option>
                    <option value="sick">Sick Visit</option>
                    <option value="self-reported">Self Reported</option>
                    <option value="pre-surgery">Pre-surgery</option>
                    <option value="post-surgery">Post-surgery</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Add Weight Entry
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Weight History */}
            <div className="space-y-4 text-gray-900">
              {patient.weightHistory.map(entry => (
                <div key={entry.id} className="p-4 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-900">
                    {entry.weight} lbs
                    <span className="text-sm ml-2 capitalize text-gray-900">({entry.context})</span>
                  </div>
                  <div className="text-sm text-gray-900">
                    Date: {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Exercise History':
        return (
          <div className="space-y-6 text-gray-900">
            {/* Add New Exercise Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Exercise Activity</h3>
              <form onSubmit={handleAddExercise} className="space-y-4">
                <div>
                  <label htmlFor="exercise-activity" className="block text-sm font-medium text-gray-700">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    id="exercise-activity"
                    value={newExercise.activity}
                    onChange={(e) => setNewExercise({ ...newExercise, activity: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Walking, Swimming, Yoga"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="exercise-type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="exercise-type"
                    value={newExercise.type}
                    onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="balance">Balance</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="exercise-frequency" className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    id="exercise-frequency"
                    value={newExercise.frequency}
                    onChange={(e) => setNewExercise({ ...newExercise, frequency: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="2-3 times per week">2-3 times per week</option>
                    <option value="4-5 times per week">4-5 times per week</option>
                    <option value="weekly">Weekly</option>
                    <option value="occasionally">Occasionally</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="exercise-duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="exercise-duration"
                    value={newExercise.duration}
                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="exercise-intensity" className="block text-sm font-medium text-gray-700">
                    Intensity
                  </label>
                  <select
                    id="exercise-intensity"
                    value={newExercise.intensity}
                    onChange={(e) => setNewExercise({ ...newExercise, intensity: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="vigorous">Vigorous</option>
                    <option value="high-intensity">High Intensity</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="exercise-limitations" className="block text-sm font-medium text-gray-700">
                    Limitations or Notes
                  </label>
                  <textarea
                    id="exercise-limitations"
                    value={newExercise.limitations}
                    onChange={(e) => setNewExercise({ ...newExercise, limitations: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter any limitations, modifications, or additional notes..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Add Exercise
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Exercise History */}
            <div className="space-y-4">
              {patient.exerciseHistory.map(exercise => (
                <div key={exercise.id} className="p-4 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-900">{exercise.activity}</div>
                  <div className="text-sm text-gray-900">Type: {exercise.type}</div>
                  <div className="text-sm text-gray-900">
                    Frequency: {exercise.frequency} | Duration: {exercise.duration} minutes
                  </div>
                  <div className="text-sm text-gray-900">Intensity: {exercise.intensity}</div>
                  {exercise.limitations && (
                    <div className="text-sm text-gray-900 mt-1">
                      Limitations: {exercise.limitations}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'Sleep History':
        return (
          <div className="space-y-6">
            {/* Update Sleep History Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Sleep Information</h3>
              <form onSubmit={handleUpdateSleep} className="space-y-6">
                {/* Sleep Pattern */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Sleep Pattern</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sleep-hours" className="block text-sm font-medium text-gray-700">
                        Average Hours of Sleep
                      </label>
                      <input
                        type="number"
                        id="sleep-hours"
                        value={newSleep.averageHours}
                        onChange={(e) => setNewSleep({ ...newSleep, averageHours: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        min="0"
                        max="24"
                        step="0.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="sleep-quality" className="block text-sm font-medium text-gray-700">
                        Sleep Quality
                      </label>
                      <select
                        id="sleep-quality"
                        value={newSleep.sleepQuality}
                        onChange={(e) => setNewSleep({ ...newSleep, sleepQuality: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="poor">Poor</option>
                        <option value="fair">Fair</option>
                        <option value="good">Good</option>
                        <option value="excellent">Excellent</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="bedtime" className="block text-sm font-medium text-gray-700">
                        Typical Bedtime
                      </label>
                      <input
                        type="time"
                        id="bedtime"
                        value={newSleep.bedtime}
                        onChange={(e) => setNewSleep({ ...newSleep, bedtime: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="waketime" className="block text-sm font-medium text-gray-700">
                        Typical Wake Time
                      </label>
                      <input
                        type="time"
                        id="waketime"
                        value={newSleep.wakeTime}
                        onChange={(e) => setNewSleep({ ...newSleep, wakeTime: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sleep Issues */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Sleep Issues</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="snoring"
                        checked={newSleep.snoring}
                        onChange={(e) => setNewSleep({ ...newSleep, snoring: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="snoring" className="ml-2 block text-sm text-gray-900">
                        Snoring
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sleep-apnea"
                        checked={newSleep.sleepApnea}
                        onChange={(e) => setNewSleep({ ...newSleep, sleepApnea: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="sleep-apnea" className="ml-2 block text-sm text-gray-900">
                        Sleep Apnea
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="insomnia"
                        checked={newSleep.insomnia}
                        onChange={(e) => setNewSleep({ ...newSleep, insomnia: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="insomnia" className="ml-2 block text-sm text-gray-900">
                        Insomnia
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="restless-legs"
                        checked={newSleep.restlessLegs}
                        onChange={(e) => setNewSleep({ ...newSleep, restlessLegs: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="restless-legs" className="ml-2 block text-sm text-gray-900">
                        Restless Legs
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Additional Information</h4>
                  <div>
                    <label htmlFor="daytime-sleepiness" className="block text-sm font-medium text-gray-700">
                      Daytime Sleepiness
                    </label>
                    <select
                      id="daytime-sleepiness"
                      value={newSleep.daytimeSleepiness}
                      onChange={(e) => setNewSleep({ ...newSleep, daytimeSleepiness: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select level</option>
                      <option value="none">None</option>
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="caffeine-timing" className="block text-sm font-medium text-gray-700">
                      Caffeine Timing
                    </label>
                    <input
                      type="text"
                      id="caffeine-timing"
                      value={newSleep.caffeineTiming}
                      onChange={(e) => setNewSleep({ ...newSleep, caffeineTiming: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Last cup at 2 PM"
                    />
                  </div>

                  <div>
                    <label htmlFor="screen-time" className="block text-sm font-medium text-gray-700">
                      Screen Time Before Bed
                    </label>
                    <input
                      type="text"
                      id="screen-time"
                      value={newSleep.screenTime}
                      onChange={(e) => setNewSleep({ ...newSleep, screenTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 1 hour of TV before bed"
                    />
                  </div>

                  <div>
                    <label htmlFor="sleep-environment" className="block text-sm font-medium text-gray-700">
                      Sleep Environment
                    </label>
                    <input
                      type="text"
                      id="sleep-environment"
                      value={newSleep.sleepEnvironment}
                      onChange={(e) => setNewSleep({ ...newSleep, sleepEnvironment: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Dark room with white noise machine"
                    />
                  </div>

                  <div>
                    <label htmlFor="sleep-notes" className="block text-sm font-medium text-gray-700">
                      Additional Notes
                    </label>
                    <textarea
                      id="sleep-notes"
                      value={newSleep.additionalNotes}
                      onChange={(e) => setNewSleep({ ...newSleep, additionalNotes: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter any additional notes about sleep patterns or issues..."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Update Sleep Information
                  </button>
                </div>
              </form>
            </div>

            {/* Display Current Sleep History */}
            <div className="space-y-6">
              {/* Sleep Pattern */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-4">Sleep Pattern</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Average Hours</label>
                    <div className="text-gray-900">{patient.sleepHistory.averageHours} hours</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Sleep Quality</label>
                    <div className="text-gray-900 capitalize">{patient.sleepHistory.sleepQuality}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Bedtime</label>
                    <div className="text-gray-900">{patient.sleepHistory.bedtime}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Wake Time</label>
                    <div className="text-gray-900">{patient.sleepHistory.wakeTime}</div>
                  </div>
                </div>
              </div>

              {/* Sleep Issues */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-4">Sleep Issues</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${patient.sleepHistory.snoring ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-900">Snoring</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${patient.sleepHistory.sleepApnea ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-900">Sleep Apnea</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${patient.sleepHistory.insomnia ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-900">Insomnia</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${patient.sleepHistory.restlessLegs ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-900">Restless Legs</span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-4">Additional Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Daytime Sleepiness</label>
                    <div className="text-gray-900">{patient.sleepHistory.daytimeSleepiness}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Caffeine Timing</label>
                    <div className="text-gray-900">{patient.sleepHistory.caffeineTiming}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Screen Time</label>
                    <div className="text-gray-900">{patient.sleepHistory.screenTime}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Sleep Environment</label>
                    <div className="text-gray-900">{patient.sleepHistory.sleepEnvironment}</div>
                  </div>
                  {patient.sleepHistory.additionalNotes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Additional Notes</label>
                      <div className="text-gray-900">{patient.sleepHistory.additionalNotes}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Food Preferences':
        return (
          <div className="space-y-6">
            {/* Dietary Restrictions */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-4">Dietary Restrictions</h4>
              <div className="space-y-2">
                {patient.foodPreferences.dietaryRestrictions.map((restriction, index) => (
                  <div key={index} className="inline-block mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {restriction}
                  </div>
                ))}
                {patient.foodPreferences.customRestrictions && (
                  <div className="text-gray-900 mt-2">
                    <span className="font-medium">Additional Restrictions: </span>
                    {patient.foodPreferences.customRestrictions}
                  </div>
                )}
              </div>
            </div>

            {/* Meal Schedule */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-4">Meal Schedule</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(patient.foodPreferences.mealTiming).map(([meal, time]) => (
                  <div key={meal}>
                    <label className="block text-sm font-medium text-gray-900 capitalize">{meal}</label>
                    <div className="text-gray-900">{time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Preferences */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-4">Food Preferences & Allergies</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Likes</label>
                  <div className="text-gray-900">{patient.foodPreferences.foodPreferences.likes}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Dislikes</label>
                  <div className="text-gray-900">{patient.foodPreferences.foodPreferences.dislikes}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Allergies</label>
                  <div className="text-gray-900">{patient.foodPreferences.foodPreferences.allergies || 'None reported'}</div>
                </div>
              </div>
            </div>

            {/* Eating Habits */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-4">Eating Habits</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Eating Speed</label>
                  <div className="text-gray-900 capitalize">{patient.foodPreferences.eatingHabits.speed}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Typical Locations</label>
                  <div className="text-gray-900">{patient.foodPreferences.eatingHabits.location.join(', ')}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Emotional Eating</label>
                  <div className="text-gray-900">{patient.foodPreferences.emotionalEating}</div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-4">Additional Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Water Intake</label>
                  <div className="text-gray-900">{patient.foodPreferences.waterIntake}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Cultural Preferences</label>
                  <div className="text-gray-900">{patient.foodPreferences.culturalPreferences}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Cooking & Meal Prep</label>
                  <div className="text-gray-900">
                    {patient.foodPreferences.cookingAbility}
                    {patient.foodPreferences.mealPrep && (
                      <div className="mt-1">Meal Prep: {patient.foodPreferences.mealPrep}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-900">
            Select a section from the sidebar to view details
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200">
        <div className="h-full px-6 flex items-center">
          <Link 
            href="/dashboard" 
            className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Clinic EMR
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-700">
              DOB: {new Date(patient.dob).toLocaleDateString()}
            </p>
          </div>
          <nav className="mt-4">
            {[
              'Demographics',
              'Insurance',
              'Clinical Notes',
              'Problems',
              'Medications',
              'Allergies',
              'Surgical History',
              'Substance History',
              'Work History',
              'Weight History',
              'Exercise History',
              'Sleep History',
              'Food Preferences',
            ].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedSection(item as FormSection)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  selectedSection === item 
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedSection}
              </h3>
              {renderFormContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 