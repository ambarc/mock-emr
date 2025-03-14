'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { mockPatients, Patient, Allergy, Problem, Medication, Surgery, ClinicalNote, WeightEntry, Exercise, Insurance, SubstanceHistory } from '@/app/lib/mockPatientData';
import { useParams } from 'next/navigation';
import InsuranceSearch from '@/app/components/InsuranceSearch';
import { InsurancePlan } from '@/app/lib/insuranceData';

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
  const [insuranceFlow, setInsuranceFlow] = useState('initial'); // 'initial' | 'upload' | 'search'
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadStep, setUploadStep] = useState<'initial' | 'upload' | 'uploading' | 'complete'>('initial');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<'standard' | 'case'>('standard');
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
  const [memberId, setMemberId] = useState('');
  const [policyDetails, setPolicyDetails] = useState({
    memberId: '',
    groupNumber: '',
    effectiveDate: '',
    expirationDate: '',
    copay: '',
    deductible: '',
    preAuthNotes: '',
    subscriberName: '',
    subscriberRelation: '',
    subscriberDOB: '',
    isEligibilityChecking: false,
    isEligibilityChecked: false
  });
  const searchRef = useRef<{ handleSearch: () => void }>(null);

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

  const handleAddNew = () => {
    setShowUploadDialog(true);
  };

  const handleSkipUpload = () => {
    setInsuranceFlow('search');
    setShowUploadDialog(false);
  };

  const handleUploadImage = () => {
    setUploadStep('upload');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStep('uploading');
      // Simulate upload progress
      setTimeout(() => {
        setUploadStep('complete');
      }, 1500);
    }
  };

  const handleUploadComplete = () => {
    setShowUploadDialog(false);
    setInsuranceFlow('search');
    setUploadStep('initial');
    setSelectedFile(null);
  };

  const handlePlanSelect = (plan: InsurancePlan) => {
    setSelectedPlan(plan);
    setPolicyDetails(prev => ({
      ...prev,
      memberId: memberId // Auto-populate with the entered Member ID
    }));
  };

  const handleEligibilityCheck = () => {
    setPolicyDetails(prev => ({ ...prev, isEligibilityChecking: true }));
    // Simulate eligibility check
    setTimeout(() => {
      setPolicyDetails(prev => ({
        ...prev,
        isEligibilityChecking: false,
        isEligibilityChecked: true
      }));
    }, 1500);
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
        return (
          <>
            {showUploadDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full mx-4">
                  {uploadStep === 'initial' && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Add insurance by uploading card image?</h3>
                        <button 
                          onClick={() => setShowUploadDialog(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-base text-gray-600 mb-8">
                        The system will use the image to automatically look for the policy. Any image will be saved when you finish adding the insurance details.
                      </p>

                      <div className="space-y-6">
                        <div className="border-2 border-gray-200 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
                          <div className="w-40 h-24 bg-white rounded-lg shadow-sm mb-6 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="w-full h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={handleSkipUpload}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            No, Skip This Step
                          </button>
                          <button
                            onClick={handleUploadImage}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Yes, Upload Image
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {uploadStep === 'upload' && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Upload Insurance Card Image</h3>
                        <button 
                          onClick={() => setShowUploadDialog(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div 
                          className="border-2 border-gray-200 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 bg-gray-50 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-base text-gray-600 mb-1">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleSkipUpload}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {uploadStep === 'uploading' && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Uploading Image</h3>
                      </div>
                      <div className="space-y-6 py-4">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out animate-progress" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-base text-gray-600 text-center">Uploading {selectedFile?.name}...</p>
                      </div>
                    </>
                  )}

                  {uploadStep === 'complete' && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Upload Complete</h3>
                      </div>
                      <div className="space-y-6 py-4">
                        <div className="flex items-center justify-center">
                          <div className="rounded-full bg-green-100 p-3">
                            <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-center text-lg text-gray-900 font-medium">Image uploaded successfully!</p>
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={handleUploadComplete}
                            className="px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {insuranceFlow === 'search' ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  {selectedPlan ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Policy Details</h3>
                        <button
                          onClick={() => setSelectedPlan(null)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Change Plan
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900">{selectedPlan.name}</h4>
                        {selectedPlan.address && (
                          <p className="text-sm text-gray-600 mt-1">{selectedPlan.address}</p>
                        )}
                      </div>

                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Member ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={policyDetails.memberId}
                            onChange={(e) => setPolicyDetails(prev => ({ ...prev, memberId: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Group Number
                            </label>
                            <input
                              type="text"
                              value={policyDetails.groupNumber}
                              onChange={(e) => setPolicyDetails(prev => ({ ...prev, groupNumber: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Effective Date
                            </label>
                            <input
                              type="date"
                              value={policyDetails.effectiveDate}
                              onChange={(e) => setPolicyDetails(prev => ({ ...prev, effectiveDate: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Subscriber Name
                            </label>
                            <input
                              type="text"
                              value={policyDetails.subscriberName}
                              onChange={(e) => setPolicyDetails(prev => ({ ...prev, subscriberName: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Subscriber Relation
                            </label>
                            <select
                              value={policyDetails.subscriberRelation}
                              onChange={(e) => setPolicyDetails(prev => ({ ...prev, subscriberRelation: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="">Select relation</option>
                              <option value="self">Self</option>
                              <option value="spouse">Spouse</option>
                              <option value="child">Child</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Pre-Authorization Notes
                          </label>
                          <textarea
                            value={policyDetails.preAuthNotes}
                            onChange={(e) => setPolicyDetails(prev => ({ ...prev, preAuthNotes: e.target.value }))}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={handleEligibilityCheck}
                            disabled={!policyDetails.memberId || policyDetails.isEligibilityChecking}
                            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            {policyDetails.isEligibilityChecking ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Checking Eligibility...
                              </>
                            ) : policyDetails.isEligibilityChecked ? (
                              <>
                                <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Eligibility Confirmed
                              </>
                            ) : (
                              'Add and Check Eligibility'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">Search:</span>
                          <button 
                            onClick={() => setSelectedPlanType('standard')}
                            className={`text-sm ${
                              selectedPlanType === 'standard' 
                                ? 'text-blue-700 font-semibold' 
                                : 'text-blue-600 hover:text-blue-800'
                            } font-medium`}
                          >
                            Standard policies
                          </button>
                          <span className="text-gray-300">|</span>
                          <button 
                            onClick={() => setSelectedPlanType('case')}
                            className={`text-sm ${
                              selectedPlanType === 'case' 
                                ? 'text-blue-700 font-semibold' 
                                : 'text-blue-600 hover:text-blue-800'
                            } font-medium`}
                          >
                            Case policies
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-[2fr,1fr] gap-4 mb-6">
                        <div>
                          <InsuranceSearch
                            ref={searchRef}
                            onSelect={handlePlanSelect}
                            selectedPlanType={selectedPlanType}
                          />
                          <div className="mt-2 flex items-center">
                            <span className="text-sm text-gray-600 font-medium">General Tip:</span>
                            <span className="text-sm text-gray-600 ml-1">Add more names for better search results</span>
                            <button className="ml-1 text-blue-600 hover:text-blue-800">
                              <span className="text-sm">ⓘ</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            placeholder="Member ID"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">For BCBS plans:</span>
                          <span className="ml-1">Please select the BCBS plan that matches the state on the patient's insurance card.</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button 
                          onClick={() => searchRef.current?.handleSearch()}
                          className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                        >
                          Search
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Give us feedback
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Insurances</h2>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View cancelled insurances</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Add case policy</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Add payment plan</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Add prepayment plan</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Change policy order</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Add reference policy</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Save a new Card on File</button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Primary</h3>
                      <button
                        onClick={handleAddNew}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        add new
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Prescription</h3>
                      <div className="space-x-6">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">check now</button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Add card image</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
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
              DOB: {patient.dob}
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