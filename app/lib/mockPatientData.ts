export interface PatientDemographics {
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Insurance {
  provider: string;
  memberId: string;
  groupNumber: string;
  preAuthNotes: string;
}

export interface ClinicalNote {
  date: string;
  note: string;
}

export interface Problem {
  id: number;
  code: string;
  name: string;
  dateAdded: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  dateAdded: string;
  instructions?: string;
}

export interface Allergy {
  id: number;
  name: string;
  severity: string;
  reaction: string;
  dateIdentified: string;
}

export interface Surgery {
  id: number;
  name: string;
  date: string;
  complications: string;
  notes: string;
}

export interface SubstanceHistory {
  alcohol: {
    current: boolean;
    frequency: string;
    type: string;
    amount: string;
    yearsOfUse: string;
    lastUse: string;
  };
  tobacco: {
    current: boolean;
    type: string;
  };
  caffeine: {
    coffee: {
      cupsPerDay: string;
      type: string;
    };
    soda: {
      ouncesPerDay: string;
      type: string;
    };
    energyDrinks: {
      frequency: string;
      type: string;
    };
  };
}

export interface WorkHistory {
  currentlyEmployed: boolean;
  occupation: string;
  employer: string;
  schedule: string;
  physicalDemands: string;
  workEnvironment: string;
  stressLevel: string;
  mealsAtWork: string;
  exerciseOpportunities: string;
  additionalNotes: string;
}

export interface WeightEntry {
  id: number;
  date: string;
  weight: number;
  context: string;
}

export interface Exercise {
  id: number;
  type: string;
  activity: string;
  frequency: string;
  duration: string;
  intensity: string;
  limitations: string;
}

export interface SleepHistory {
  averageHours: string;
  bedtime: string;
  wakeTime: string;
  sleepQuality: string;
  snoring: boolean;
  sleepApnea: boolean;
  insomnia: boolean;
  restlessLegs: boolean;
  daytimeSleepiness: string;
  caffeineTiming: string;
  screenTime: string;
  sleepEnvironment: string;
  additionalNotes: string;
}

export interface FoodPreferences {
  dietaryRestrictions: string[];
  customRestrictions: string;
  mealTiming: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
  foodPreferences: {
    likes: string;
    dislikes: string;
    allergies: string;
  };
  eatingHabits: {
    location: string[];
    company: string[];
    speed: string;
    portions: string;
  };
  emotionalEating: string;
  waterIntake: string;
  supplementsVitamins: string;
  culturalPreferences: string;
  cookingAbility: string;
  groceryShopping: string;
  mealPrep: string;
}

export interface Patient {
  id: number;
  name: string;
  dob: string;
  demographics: PatientDemographics;
  insurance: {
    primary?: Insurance;
    secondary?: Insurance;
  };
  clinicalNotes: ClinicalNote[];
  problems: Problem[];
  medications: Medication[];
  allergies: Allergy[];
  surgicalHistory: Surgery[];
  substanceHistory: SubstanceHistory;
  workHistory: WorkHistory;
  weightHistory: WeightEntry[];
  exerciseHistory: Exercise[];
  sleepHistory: SleepHistory;
  foodPreferences: FoodPreferences;
}

export const mockPatients: Record<number, Patient> = {
  2: {
    id: 2,
    name: 'Michael Chen',
    dob: '1992-07-22',
    demographics: {
      phone: '(555) 234-5678',
      email: 'michael.chen@email.com',
      address: '456 Oak Avenue',
      city: 'San Francisco',
      state: 'CA',
      zip: '94110'
    },
    insurance: {
      primary: {
        provider: 'Aetna',
        memberId: 'AET987654321',
        groupNumber: 'GRP123456',
        preAuthNotes: 'Prior authorization required for specialty medications'
      },
      secondary: {
        provider: 'Medicare',
        memberId: 'MED123456789',
        groupNumber: 'N/A',
        preAuthNotes: ''
      }
    },
    clinicalNotes: [
      {
        date: '2024-02-20',
        note: 'Initial consultation. Patient presents with BMI of 38.1, reports gaining 30lbs over past year. Works in tech, sedentary lifestyle. Motivated to make changes. Started on Ozempic, discussed lifestyle modifications.'
      },
      {
        date: '2024-01-15',
        note: 'Follow-up visit. Weight down 5lbs since starting Ozempic. Tolerating medication well, no side effects. Increased daily steps to 7,000. Encouraged to continue progress.'
      }
    ],
    problems: [
      { id: 1, code: 'E66.01', name: 'Morbid obesity', dateAdded: '2024-01-15' },
      { id: 2, code: 'E11.9', name: 'Type 2 diabetes mellitus', dateAdded: '2024-01-15' },
      { id: 3, code: 'I10', name: 'Essential hypertension', dateAdded: '2024-01-15' },
      { id: 4, code: 'E78.5', name: 'Dyslipidemia', dateAdded: '2024-01-15' }
    ],
    medications: [
      {
        id: 1,
        name: 'Ozempic',
        dosage: '0.5mg',
        frequency: 'Once weekly',
        dateAdded: '2024-01-15'
      },
      {
        id: 2,
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        dateAdded: '2023-02-01',
        instructions: 'Take with meals'
      },
      {
        id: 3,
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        dateAdded: '2023-01-15',
        instructions: 'Take in the morning with food'
      }
    ],
    allergies: [
      { id: 1, name: 'Shellfish', severity: 'Mild', reaction: 'Hives', dateIdentified: '2020-03-15' },
      { id: 2, name: 'Penicillin', severity: 'Moderate', reaction: 'Rash and itching', dateIdentified: '2018-06-22' },
      { id: 3, name: 'Peanuts', severity: 'Severe', reaction: 'Anaphylaxis', dateIdentified: '2010-01-10' }
    ],
    surgicalHistory: [
      {
        id: 1,
        name: 'Appendectomy',
        date: '2010-03-15',
        complications: 'None',
        notes: 'Laparoscopic procedure, routine recovery'
      },
      {
        id: 2,
        name: 'Knee Arthroscopy',
        date: '2018-09-22',
        complications: 'Minor post-operative swelling',
        notes: 'Right knee, meniscus repair'
      },
      {
        id: 3,
        name: 'Wisdom Teeth Extraction',
        date: '2012-06-30',
        complications: 'None',
        notes: 'All four wisdom teeth removed under general anesthesia'
      }
    ],
    substanceHistory: {
      alcohol: {
        current: true,
        frequency: 'weekly',
        type: 'Beer, Wine',
        amount: '2-3 drinks per occasion',
        yearsOfUse: '8',
        lastUse: '2024-02-18'
      },
      tobacco: {
        current: false,
        type: 'Never smoker'
      },
      caffeine: {
        coffee: {
          cupsPerDay: '3-4',
          type: 'regular'
        },
        soda: {
          ouncesPerDay: '20',
          type: 'diet'
        },
        energyDrinks: {
          frequency: 'occasionally',
          type: 'Sugar-free Red Bull'
        }
      }
    },
    workHistory: {
      currentlyEmployed: true,
      occupation: 'Software Engineer',
      employer: 'Tech Corp Inc',
      schedule: 'day',
      physicalDemands: 'sedentary',
      workEnvironment: 'Remote work/Office hybrid',
      stressLevel: 'moderate',
      mealsAtWork: 'Usually orders delivery, occasional team lunches',
      exerciseOpportunities: 'Has standing desk, company gym available',
      additionalNotes: 'Long hours at computer, reports neck and back strain'
    },
    weightHistory: [
      { id: 1, date: '2024-02-20', weight: 262, context: 'clinic_visit' },
      { id: 2, date: '2024-02-01', weight: 265, context: 'clinic_visit' },
      { id: 3, date: '2024-01-15', weight: 267, context: 'clinic_visit' },
      { id: 4, date: '2023-12-15', weight: 272, context: 'clinic_visit' }
    ],
    exerciseHistory: [
      {
        id: 1,
        type: 'Cardio',
        activity: 'Walking',
        frequency: 'daily',
        duration: '30',
        intensity: 'light',
        limitations: 'Knee pain with prolonged walking'
      },
      {
        id: 2,
        type: 'Strength',
        activity: 'Resistance Bands',
        frequency: '2 times per week',
        duration: '20',
        intensity: 'moderate',
        limitations: 'None'
      }
    ],
    sleepHistory: {
      averageHours: '6.5',
      bedtime: '23:30',
      wakeTime: '07:00',
      sleepQuality: 'fair',
      snoring: true,
      sleepApnea: false,
      insomnia: true,
      restlessLegs: false,
      daytimeSleepiness: 'moderate',
      caffeineTiming: 'Last cup of coffee at 4 PM',
      screenTime: 'Uses computer/phone until bedtime',
      sleepEnvironment: 'City apartment, some street noise, blackout curtains',
      additionalNotes: 'Difficulty falling asleep due to work stress'
    },
    foodPreferences: {
      dietaryRestrictions: ['Lactose-intolerant'],
      customRestrictions: 'Prefers to avoid spicy foods',
      mealTiming: {
        breakfast: '8:30 AM',
        lunch: '1:00 PM',
        dinner: '7:30 PM',
        snacks: 'Mid-morning and late evening'
      },
      foodPreferences: {
        likes: 'Asian cuisine, seafood, rice dishes, vegetables',
        dislikes: 'Dairy products, very spicy foods',
        allergies: 'Mild shellfish allergy'
      },
      eatingHabits: {
        location: ['Desk while working', 'Restaurant takeout'],
        company: ['Alone', 'With coworkers'],
        speed: 'fast',
        portions: 'Large portions'
      },
      emotionalEating: 'Tends to stress eat during work deadlines',
      waterIntake: '48 oz daily',
      supplementsVitamins: 'Multivitamin, Vitamin D',
      culturalPreferences: 'Prefers Asian cooking styles',
      cookingAbility: 'Basic cooking skills, relies on delivery often',
      groceryShopping: 'Weekly grocery delivery service',
      mealPrep: 'Minimal meal prep, often eats out'
    }
  },
  3: {
    id: 3,
    name: 'James Smith',
    dob: '1980-08-15',
    demographics: {
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    insurance: {},
    clinicalNotes: [],
    problems: [],
    medications: [],
    allergies: [],
    surgicalHistory: [],
    substanceHistory: {
      alcohol: {
        current: false,
        frequency: '',
        type: '',
        amount: '',
        yearsOfUse: '',
        lastUse: ''
      },
      tobacco: {
        current: false,
        type: ''
      },
      caffeine: {
        coffee: {
          cupsPerDay: '',
          type: ''
        },
        soda: {
          ouncesPerDay: '',
          type: ''
        },
        energyDrinks: {
          frequency: '',
          type: ''
        }
      }
    },
    workHistory: {
      currentlyEmployed: false,
      occupation: '',
      employer: '',
      schedule: '',
      physicalDemands: '',
      workEnvironment: '',
      stressLevel: '',
      mealsAtWork: '',
      exerciseOpportunities: '',
      additionalNotes: ''
    },
    weightHistory: [],
    exerciseHistory: [],
    sleepHistory: {
      averageHours: '',
      bedtime: '',
      wakeTime: '',
      sleepQuality: '',
      snoring: false,
      sleepApnea: false,
      insomnia: false,
      restlessLegs: false,
      daytimeSleepiness: '',
      caffeineTiming: '',
      screenTime: '',
      sleepEnvironment: '',
      additionalNotes: ''
    },
    foodPreferences: {
      dietaryRestrictions: [],
      customRestrictions: '',
      mealTiming: {
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: ''
      },
      foodPreferences: {
        likes: '',
        dislikes: '',
        allergies: ''
      },
      eatingHabits: {
        location: [],
        company: [],
        speed: '',
        portions: ''
      },
      emotionalEating: '',
      waterIntake: '',
      supplementsVitamins: '',
      culturalPreferences: '',
      cookingAbility: '',
      groceryShopping: '',
      mealPrep: ''
    }
  }
}; 