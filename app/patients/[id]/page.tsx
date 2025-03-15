'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { mockPatients, Patient } from '@/app/lib/mockPatientData';
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
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: ''
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
  const [insuranceFlow, setInsuranceFlow] = useState<'initial' | 'upload' | 'search'>('initial');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadStep, setUploadStep] = useState<'initial' | 'upload' | 'uploading' | 'complete'>('initial');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<'standard' | 'case'>('standard');
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
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
  const [newWorkHistory, setNewWorkHistory] = useState({
    currentlyEmployed: true,
    occupation: '',
    employer: '',
    schedule: '',
    physicalDemands: '',
    workEnvironment: '',
    stressLevel: '',
    mealsAtWork: '',
    exerciseOpportunities: '',
    additionalNotes: ''
  });
  const [newFoodPreferences, setNewFoodPreferences] = useState({
    dietaryRestrictions: [] as string[],
    customRestrictions: '',
    mealTiming: {
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: '',
    },
    foodPreferences: {
      likes: '',
      dislikes: '',
      allergies: '',
    },
    eatingHabits: {
      location: [] as string[],
      company: [] as string[],
      speed: '',
      portions: '',
    },
    emotionalEating: '',
    waterIntake: '',
    supplementsVitamins: '',
    culturalPreferences: '',
    cookingAbility: '',
    groceryShopping: '',
    mealPrep: '',
    additionalNotes: '',
  });

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Kosher',
    'Halal',
    'Low-Carb',
    'Low-Fat',
    'Mediterranean',
    'Keto',
  ];

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
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);

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
    
    // Create updated patient data with new substance history
    const updatedPatient = {
      ...patient,
      substanceHistory: {
        alcohol: {
          current: newSubstanceHistory.alcohol.current,
          frequency: newSubstanceHistory.alcohol.frequency,
          type: newSubstanceHistory.alcohol.type,
          amount: newSubstanceHistory.alcohol.amount,
          yearsOfUse: newSubstanceHistory.alcohol.yearsOfUse,
          lastUse: newSubstanceHistory.alcohol.lastUse,
        },
        tobacco: {
          current: newSubstanceHistory.tobacco.current,
          type: newSubstanceHistory.tobacco.type,
          packsPerDay: newSubstanceHistory.tobacco.packsPerDay,
          yearsOfUse: newSubstanceHistory.tobacco.yearsOfUse,
          quitDate: newSubstanceHistory.tobacco.quitDate,
        },
        caffeine: {
          coffee: {
            cupsPerDay: newSubstanceHistory.caffeine.coffee.cupsPerDay,
            type: newSubstanceHistory.caffeine.coffee.type,
          },
          soda: {
            ouncesPerDay: newSubstanceHistory.caffeine.soda.ouncesPerDay,
            type: newSubstanceHistory.caffeine.soda.type,
          },
          energyDrinks: {
            frequency: newSubstanceHistory.caffeine.energyDrinks.frequency,
            type: newSubstanceHistory.caffeine.energyDrinks.type,
          },
        },
        otherSubstances: newSubstanceHistory.otherSubstances
      }
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewSubstanceHistory({
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

    // Log the update (this would typically be an API call)
    console.log('Updated substance history:', updatedPatient.substanceHistory);
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
      memberId: prev.memberId // Use existing memberId from policyDetails
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

  const handleUpdateWorkHistory = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new work history
    const updatedPatient = {
      ...patient,
      workHistory: {
        currentlyEmployed: newWorkHistory.currentlyEmployed,
        occupation: newWorkHistory.occupation,
        employer: newWorkHistory.employer,
        schedule: newWorkHistory.schedule,
        physicalDemands: newWorkHistory.physicalDemands,
        workEnvironment: newWorkHistory.workEnvironment,
        stressLevel: newWorkHistory.stressLevel,
        mealsAtWork: newWorkHistory.mealsAtWork,
        exerciseOpportunities: newWorkHistory.exerciseOpportunities,
        additionalNotes: newWorkHistory.additionalNotes
      }
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewWorkHistory({
      currentlyEmployed: true,
      occupation: '',
      employer: '',
      schedule: '',
      physicalDemands: '',
      workEnvironment: '',
      stressLevel: '',
      mealsAtWork: '',
      exerciseOpportunities: '',
      additionalNotes: ''
    });

    // Log the update (this would typically be an API call)
    console.log('Updated work history:', updatedPatient.workHistory);
  };

  const handleUpdateFoodPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated patient data with new food preferences
    const updatedPatient = {
      ...patient,
      foodPreferences: {
        ...newFoodPreferences
      }
    };

    // Update local patient data
    setPatient(updatedPatient);
    
    // Reset form
    setNewFoodPreferences({
      dietaryRestrictions: [],
      customRestrictions: '',
      mealTiming: {
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: '',
      },
      foodPreferences: {
        likes: '',
        dislikes: '',
        allergies: '',
      },
      eatingHabits: {
        location: [],
        company: [],
        speed: '',
        portions: '',
      },
      emotionalEating: '',
      waterIntake: '',
      supplementsVitamins: '',
      culturalPreferences: '',
      cookingAbility: '',
      groceryShopping: '',
      mealPrep: '',
      additionalNotes: '',
    });

    // Log the update (this would typically be an API call)
    console.log('Updated food preferences:', updatedPatient.foodPreferences);
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

            {/* Weight History List */}
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
              {patient.weightHistory.length === 0 && (
                <div className="text-center py-4 text-gray-600">
                  No weight history recorded
                </div>
              )}
            </div>
          </div>
        );

      case 'Exercise History':
        return (
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4">Exercise History</h3>
            <form onSubmit={handleAddExercise} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Type
                  </label>
                  <select
                    value={newExercise.type}
                    onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    value={newExercise.activity}
                    onChange={(e) => setNewExercise({ ...newExercise, activity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="e.g., Walking, Swimming"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newExercise.frequency}
                    onChange={(e) => setNewExercise({ ...newExercise, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="2-3_times_week">2-3 times per week</option>
                    <option value="4-5_times_week">4-5 times per week</option>
                    <option value="weekly">Weekly</option>
                    <option value="occasionally">Occasionally</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newExercise.duration}
                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Enter duration"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intensity
                </label>
                <select
                  value={newExercise.intensity}
                  onChange={(e) => setNewExercise({ ...newExercise, intensity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="light">Light - Easy to breathe and carry a conversation</option>
                  <option value="moderate">Moderate - Slightly harder to breathe but can talk</option>
                  <option value="vigorous">Vigorous - Heavy breathing, difficult to talk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Limitations or Notes
                </label>
                <textarea
                  value={newExercise.limitations}
                  onChange={(e) => setNewExercise({ ...newExercise, limitations: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Any physical limitations or additional notes..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Add Exercise
              </button>
            </form>

            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">Current Exercise Activities</h4>
              <div className="space-y-3">
                {patient.exerciseHistory.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 bg-gray-50 rounded-md"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{exercise.activity}</div>
                        <div className="text-sm text-gray-500">
                          Type: {exercise.type} | Frequency: {exercise.frequency}
                          {exercise.duration && ` | Duration: ${exercise.duration} minutes`}
                        </div>
                        {exercise.intensity && (
                          <div className="text-sm text-gray-500">
                            Intensity: {exercise.intensity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {patient.exerciseHistory.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    No exercise activities recorded
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Sleep History':
        return (
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4">Sleep History</h3>
            <form onSubmit={handleUpdateSleep} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Hours of Sleep
                  </label>
                  <input
                    type="number"
                    value={newSleep.averageHours}
                    onChange={(e) => setNewSleep({ ...newSleep, averageHours: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Hours per night"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sleep Quality
                  </label>
                  <select
                    value={newSleep.sleepQuality}
                    onChange={(e) => setNewSleep({ ...newSleep, sleepQuality: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                    <option value="very_poor">Very Poor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Typical Bedtime
                  </label>
                  <input
                    type="time"
                    value={newSleep.bedtime}
                    onChange={(e) => setNewSleep({ ...newSleep, bedtime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Typical Wake Time
                  </label>
                  <input
                    type="time"
                    value={newSleep.wakeTime}
                    onChange={(e) => setNewSleep({ ...newSleep, wakeTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Sleep Issues
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'snoring' as const, label: 'Snoring' },
                    { id: 'sleepApnea' as const, label: 'Sleep Apnea' },
                    { id: 'insomnia' as const, label: 'Insomnia' },
                    { id: 'restlessLegs' as const, label: 'Restless Legs' },
                  ].map(issue => (
                    <div key={issue.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={issue.id}
                        checked={newSleep[issue.id]}
                        onChange={(e) => setNewSleep({ ...newSleep, [issue.id]: e.target.checked })}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor={issue.id} className="ml-2 block text-sm text-gray-700">
                        {issue.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={newSleep.additionalNotes}
                  onChange={(e) => setNewSleep({ ...newSleep, additionalNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={3}
                  placeholder="Any other information about sleep patterns..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Save Sleep History
              </button>
            </form>
          </div>
        );

      case 'Substance History':
        return (
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4">Substance History</h3>
            <form onSubmit={handleUpdateSubstanceHistory} className="space-y-6">
              {/* Alcohol Section */}
              <div className="space-y-4">
                <h4 className="text-md font-medium">Alcohol Use</h4>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="currentAlcohol"
                    checked={newSubstanceHistory.alcohol.current}
                    onChange={(e) => setNewSubstanceHistory({
                      ...newSubstanceHistory,
                      alcohol: { ...newSubstanceHistory.alcohol, current: e.target.checked }
                    })}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="currentAlcohol" className="ml-2 block text-sm text-gray-700">
                    Current alcohol use
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      value={newSubstanceHistory.alcohol.frequency}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        alcohol: { ...newSubstanceHistory.alcohol, frequency: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="occasionally">Occasionally</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={newSubstanceHistory.alcohol.type}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        alcohol: { ...newSubstanceHistory.alcohol, type: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="e.g., Beer, Wine, Spirits"
                    />
                  </div>
                </div>
              </div>

              {/* Tobacco Section */}
              <div className="space-y-4">
                <h4 className="text-md font-medium">Tobacco Use</h4>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="currentTobacco"
                    checked={newSubstanceHistory.tobacco.current}
                    onChange={(e) => setNewSubstanceHistory({
                      ...newSubstanceHistory,
                      tobacco: { ...newSubstanceHistory.tobacco, current: e.target.checked }
                    })}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="currentTobacco" className="ml-2 block text-sm text-gray-700">
                    Current tobacco use
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={newSubstanceHistory.tobacco.type}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        tobacco: { ...newSubstanceHistory.tobacco, type: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="e.g., Cigarettes, Vaping"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Packs Per Day
                    </label>
                    <input
                      type="text"
                      value={newSubstanceHistory.tobacco.packsPerDay}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        tobacco: { ...newSubstanceHistory.tobacco, packsPerDay: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Number of packs"
                    />
                  </div>
                </div>
              </div>

              {/* Caffeine Section */}
              <div className="space-y-4">
                <h4 className="text-md font-medium">Caffeine Intake</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coffee (cups per day)
                    </label>
                    <input
                      type="text"
                      value={newSubstanceHistory.caffeine.coffee.cupsPerDay}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        caffeine: {
                          ...newSubstanceHistory.caffeine,
                          coffee: { ...newSubstanceHistory.caffeine.coffee, cupsPerDay: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Number of cups"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coffee Type
                    </label>
                    <select
                      value={newSubstanceHistory.caffeine.coffee.type}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        caffeine: {
                          ...newSubstanceHistory.caffeine,
                          coffee: { ...newSubstanceHistory.caffeine.coffee, type: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      <option value="">Select type</option>
                      <option value="regular">Regular</option>
                      <option value="decaf">Decaf</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Soda (oz per day)
                    </label>
                    <input
                      type="text"
                      value={newSubstanceHistory.caffeine.soda.ouncesPerDay}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        caffeine: {
                          ...newSubstanceHistory.caffeine,
                          soda: { ...newSubstanceHistory.caffeine.soda, ouncesPerDay: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Ounces per day"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Soda Type
                    </label>
                    <select
                      value={newSubstanceHistory.caffeine.soda.type}
                      onChange={(e) => setNewSubstanceHistory({
                        ...newSubstanceHistory,
                        caffeine: {
                          ...newSubstanceHistory.caffeine,
                          soda: { ...newSubstanceHistory.caffeine.soda, type: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      <option value="">Select type</option>
                      <option value="regular">Regular</option>
                      <option value="diet">Diet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Energy Drinks
                  </label>
                  <select
                    value={newSubstanceHistory.caffeine.energyDrinks.frequency}
                    onChange={(e) => setNewSubstanceHistory({
                      ...newSubstanceHistory,
                      caffeine: {
                        ...newSubstanceHistory.caffeine,
                        energyDrinks: { ...newSubstanceHistory.caffeine.energyDrinks, frequency: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="never">Never</option>
                    <option value="occasionally">Occasionally</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                    <option value="multiple_daily">Multiple times per day</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Substances
                </label>
                <textarea
                  value={newSubstanceHistory.otherSubstances}
                  onChange={(e) => setNewSubstanceHistory({
                    ...newSubstanceHistory,
                    otherSubstances: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={3}
                  placeholder="Any other substance use history..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Save Substance History
              </button>
            </form>
          </div>
        );

      case 'Work History':
        return (
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4">Work History</h3>
            <form onSubmit={handleUpdateWorkHistory} className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="currentlyEmployed"
                  checked={newWorkHistory.currentlyEmployed}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    currentlyEmployed: e.target.checked
                  })}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="currentlyEmployed" className="ml-2 block text-sm text-gray-700">
                  Currently Employed
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={newWorkHistory.occupation}
                    onChange={(e) => setNewWorkHistory({
                      ...newWorkHistory,
                      occupation: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employer
                  </label>
                  <input
                    type="text"
                    value={newWorkHistory.employer}
                    onChange={(e) => setNewWorkHistory({
                      ...newWorkHistory,
                      employer: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Schedule
                </label>
                <select
                  value={newWorkHistory.schedule}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    schedule: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Select schedule type</option>
                  <option value="day">Day shift</option>
                  <option value="evening">Evening shift</option>
                  <option value="night">Night shift</option>
                  <option value="rotating">Rotating shifts</option>
                  <option value="irregular">Irregular schedule</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Physical Demands
                </label>
                <select
                  value={newWorkHistory.physicalDemands}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    physicalDemands: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Select physical demand level</option>
                  <option value="sedentary">Sedentary - Mostly sitting</option>
                  <option value="light">Light - Some walking/standing</option>
                  <option value="moderate">Moderate - Regular physical activity</option>
                  <option value="heavy">Heavy - Constant physical demands</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Environment
                </label>
                <textarea
                  value={newWorkHistory.workEnvironment}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    workEnvironment: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe the work environment..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stress Level
                </label>
                <select
                  value={newWorkHistory.stressLevel}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    stressLevel: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Select stress level</option>
                  <option value="low">Low - Minimal stress</option>
                  <option value="moderate">Moderate - Regular stress</option>
                  <option value="high">High - Frequent stress</option>
                  <option value="severe">Severe - Constant stress</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meals at Work
                </label>
                <textarea
                  value={newWorkHistory.mealsAtWork}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    mealsAtWork: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe typical meal patterns during work hours..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Opportunities
                </label>
                <textarea
                  value={newWorkHistory.exerciseOpportunities}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    exerciseOpportunities: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe any opportunities for physical activity during work..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={newWorkHistory.additionalNotes}
                  onChange={(e) => setNewWorkHistory({
                    ...newWorkHistory,
                    additionalNotes: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={3}
                  placeholder="Any additional notes about work environment or circumstances..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Save Work History
              </button>
            </form>
          </div>
        );

      case 'Food Preferences':
        return (
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-medium mb-4">Food Preferences</h3>
            <form onSubmit={handleUpdateFoodPreferences} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Restrictions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        checked={newFoodPreferences.dietaryRestrictions.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewFoodPreferences({
                              ...newFoodPreferences,
                              dietaryRestrictions: [...newFoodPreferences.dietaryRestrictions, option]
                            });
                          } else {
                            setNewFoodPreferences({
                              ...newFoodPreferences,
                              dietaryRestrictions: newFoodPreferences.dietaryRestrictions.filter(r => r !== option)
                            });
                          }
                        }}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor={option} className="ml-2 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Dietary Restrictions
                </label>
                <textarea
                  value={newFoodPreferences.customRestrictions}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    customRestrictions: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Enter any additional dietary restrictions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typical Meal Times
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['breakfast', 'lunch', 'dinner', 'snacks'].map(meal => (
                    <div key={meal}>
                      <label className="block text-sm text-gray-700 capitalize mb-1">
                        {meal}
                      </label>
                      <input
                        type="text"
                        value={newFoodPreferences.mealTiming[meal as keyof typeof newFoodPreferences.mealTiming]}
                        onChange={(e) => setNewFoodPreferences({
                          ...newFoodPreferences,
                          mealTiming: {
                            ...newFoodPreferences.mealTiming,
                            [meal]: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="Time and frequency..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Preferences
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'likes', label: 'Favorite Foods' },
                    { id: 'dislikes', label: 'Disliked Foods' },
                    { id: 'allergies', label: 'Food Allergies' },
                  ].map(item => (
                    <div key={item.id}>
                      <label className="block text-sm text-gray-700 mb-1">
                        {item.label}
                      </label>
                      <textarea
                        value={newFoodPreferences.foodPreferences[item.id as keyof typeof newFoodPreferences.foodPreferences]}
                        onChange={(e) => setNewFoodPreferences({
                          ...newFoodPreferences,
                          foodPreferences: {
                            ...newFoodPreferences.foodPreferences,
                            [item.id]: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emotional Eating
                </label>
                <textarea
                  value={newFoodPreferences.emotionalEating}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    emotionalEating: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe any emotional eating patterns..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Water Intake
                </label>
                <input
                  type="text"
                  value={newFoodPreferences.waterIntake}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    waterIntake: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  placeholder="Daily water consumption..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplements/Vitamins
                </label>
                <textarea
                  value={newFoodPreferences.supplementsVitamins}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    supplementsVitamins: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="List any supplements or vitamins taken..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cultural Food Preferences
                </label>
                <textarea
                  value={newFoodPreferences.culturalPreferences}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    culturalPreferences: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe any cultural food preferences..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooking Ability
                </label>
                <select
                  value={newFoodPreferences.cookingAbility}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    cookingAbility: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Select cooking ability</option>
                  <option value="none">No cooking experience</option>
                  <option value="beginner">Beginner - Basic cooking skills</option>
                  <option value="intermediate">Intermediate - Can follow recipes</option>
                  <option value="advanced">Advanced - Experienced cook</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grocery Shopping
                </label>
                <textarea
                  value={newFoodPreferences.groceryShopping}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    groceryShopping: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe grocery shopping habits..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Preparation
                </label>
                <textarea
                  value={newFoodPreferences.mealPrep}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    mealPrep: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                  placeholder="Describe meal preparation habits..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={newFoodPreferences.additionalNotes}
                  onChange={(e) => setNewFoodPreferences({
                    ...newFoodPreferences,
                    additionalNotes: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={3}
                  placeholder="Any additional notes about food preferences..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Save Food Preferences
              </button>
            </form>
          </div>
        );

      case 'Insurance':
        return (
          <div className="space-y-6">
            {/* Insurance Type Selection */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setInsuranceType('primary')}
                className={`px-4 py-2 rounded-md ${
                  insuranceType === 'primary'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Primary Insurance
              </button>
              <button
                onClick={() => setInsuranceType('secondary')}
                className={`px-4 py-2 rounded-md ${
                  insuranceType === 'secondary'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Secondary Insurance
              </button>
            </div>

            {insuranceFlow === 'initial' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Add Insurance Information</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddNew}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Add New Insurance
                    </button>
                  </div>
                </div>
              </div>
            ) : insuranceFlow === 'search' ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Search Insurance Plans</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedPlanType('standard')}
                      className={`px-4 py-2 rounded-md ${
                        selectedPlanType === 'standard'
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      Standard Plans
                    </button>
                    <button
                      onClick={() => setSelectedPlanType('case')}
                      className={`px-4 py-2 rounded-md ${
                        selectedPlanType === 'case'
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      Case Plans
                    </button>
                  </div>
                </div>

                <InsuranceSearch
                  ref={searchRef}
                  onSelect={handlePlanSelect}
                  selectedPlanType={selectedPlanType}
                />

                {selectedPlan && (
                  <div className="mt-8 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Policy Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Member ID
                          </label>
                          <input
                            type="text"
                            value={policyDetails.memberId}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, memberId: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Group Number
                          </label>
                          <input
                            type="text"
                            value={policyDetails.groupNumber}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, groupNumber: e.target.value })}
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
                            onChange={(e) => setPolicyDetails({ ...policyDetails, effectiveDate: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Expiration Date
                          </label>
                          <input
                            type="date"
                            value={policyDetails.expirationDate}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, expirationDate: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Copay
                          </label>
                          <input
                            type="text"
                            value={policyDetails.copay}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, copay: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Deductible
                          </label>
                          <input
                            type="text"
                            value={policyDetails.deductible}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, deductible: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Pre-authorization Notes
                        </label>
                        <textarea
                          value={policyDetails.preAuthNotes}
                          onChange={(e) => setPolicyDetails({ ...policyDetails, preAuthNotes: e.target.value })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Subscriber Name
                          </label>
                          <input
                            type="text"
                            value={policyDetails.subscriberName}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, subscriberName: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Subscriber Relation
                          </label>
                          <select
                            value={policyDetails.subscriberRelation}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, subscriberRelation: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">Select relation</option>
                            <option value="self">Self</option>
                            <option value="spouse">Spouse</option>
                            <option value="child">Child</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Subscriber DOB
                          </label>
                          <input
                            type="date"
                            value={policyDetails.subscriberDOB}
                            onChange={(e) => setPolicyDetails({ ...policyDetails, subscriberDOB: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between items-center">
                        <button
                          onClick={handleEligibilityCheck}
                          disabled={policyDetails.isEligibilityChecking}
                          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
                        >
                          {policyDetails.isEligibilityChecking ? 'Checking...' : 'Check Eligibility'}
                        </button>
                        <button
                          onClick={handleInsuranceSubmit}
                          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                        >
                          Save Insurance Information
                        </button>
                      </div>

                      {policyDetails.isEligibilityChecked && (
                        <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
                          Patient is eligible for coverage under this plan.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Upload Dialog */}
            {showUploadDialog && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                  {uploadStep === 'initial' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Add Insurance Card</h3>
                      <p className="text-gray-600">
                        Upload images of the front and back of your insurance card or skip to search manually.
                      </p>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={handleSkipUpload}
                          className="px-4 py-2 text-gray-700 hover:text-gray-900"
                        >
                          Skip
                        </button>
                        <button
                          onClick={handleUploadImage}
                          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                        >
                          Upload Images
                        </button>
                      </div>
                    </div>
                  )}

                  {uploadStep === 'upload' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Upload Insurance Card</h3>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      {selectedFile ? (
                        <div className="text-sm text-gray-600 mb-2">
                          Selected file: {selectedFile.name}
                        </div>
                      ) : (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-700 hover:border-gray-400"
                        >
                          Click to select files
                        </button>
                      )}
                    </div>
                  )}

                  {uploadStep === 'uploading' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Uploading...</h3>
                      <div className="h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-gray-900 rounded w-1/2"></div>
                      </div>
                    </div>
                  )}

                  {uploadStep === 'complete' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Upload Complete</h3>
                      <p className="text-gray-600">
                        Insurance card images have been uploaded successfully.
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={handleUploadComplete}
                          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Display current insurance information */}
            {patient.insurance && (
              <div className="mt-6 space-y-6">
                {patient.insurance.primary && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Primary Insurance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Provider</p>
                        <p className="mt-1">{patient.insurance.primary.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Member ID</p>
                        <p className="mt-1">{patient.insurance.primary.memberId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Group Number</p>
                        <p className="mt-1">{patient.insurance.primary.groupNumber}</p>
                      </div>
                      {patient.insurance.primary.preAuthNotes && (
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-700">Pre-authorization Notes</p>
                          <p className="mt-1">{patient.insurance.primary.preAuthNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {patient.insurance.secondary && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Secondary Insurance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Provider</p>
                        <p className="mt-1">{patient.insurance.secondary.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Member ID</p>
                        <p className="mt-1">{patient.insurance.secondary.memberId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Group Number</p>
                        <p className="mt-1">{patient.insurance.secondary.groupNumber}</p>
                      </div>
                      {patient.insurance.secondary.preAuthNotes && (
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-700">Pre-authorization Notes</p>
                          <p className="mt-1">{patient.insurance.secondary.preAuthNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
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