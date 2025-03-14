"use client"

import { usePDF } from 'react-to-pdf';

// Complete form schema from original form
const formioSchema = {
  "display": "wizard",
  "components": [
    {
      "key": "page1",
      "type": "panel",
      "input": false,
      "title": "Personal Information",
      "components": [
        {
          "key": "personalInfo",
          "type": "panel",
          "input": false,
          "components": [
            {
              "key": "first_name",
              "type": "textfield",
              "input": true,
              "label": "First Name",
              "validate": { "required": true }
            },
            {
              "key": "last_name",
              "type": "textfield",
              "input": true,
              "label": "Last Name",
              "validate": { "required": true }
            },
            {
              "key": "preferred_name",
              "type": "textfield",
              "input": true,
              "label": "Preferred Name / Nickname"
            },
            {
              "key": "dob",
              "type": "textfield",
              "input": true,
              "label": "Date of Birth",
              "validate": { "required": true },
              "placeholder": "mm/dd/yyyy"
            }
          ]
        },
        {
          "key": "demographics",
          "type": "panel",
          "input": false,
          "title": "Demographics",
          "components": [
            {
              "key": "sex",
              "type": "select",
              "input": true,
              "label": "Sex assigned at birth",
              "validate": { "required": true },
              "data": {
                "values": [
                  { "label": "Male", "value": "male" },
                  { "label": "Female", "value": "female" },
                  { "label": "Other", "value": "other" }
                ]
              }
            },
            {
              "key": "gender_identity",
              "type": "radio",
              "input": true,
              "label": "Gender identity",
              "validate": { "required": true },
              "inline": true,
              "values": [
                { "label": "Male", "value": "male" },
                { "label": "Female", "value": "female" },
                { "label": "Other", "value": "other" }
              ]
            },
            {
              "key": "race",
              "type": "select",
              "input": true,
              "label": "Race",
              "validate": { "required": true },
              "data": {
                "values": [
                  { "label": "American Indian or Alaska Native", "value": "americanIndianOrAlaskaNative" },
                  { "label": "Asian", "value": "asian" },
                  { "label": "Black or African American", "value": "blackOrAfricanAmerican" },
                  { "label": "Native Hawaiian or Other Pacific Islander", "value": "nativeHawaiianOrOtherPacificIslander" },
                  { "label": "White", "value": "white" }
                ]
              }
            },
            {
              "key": "ethnicity",
              "type": "select",
              "input": true,
              "label": "Ethnicity",
              "validate": { "required": true },
              "data": {
                "values": [
                  { "label": "Hispanic or Latino", "value": "hispanicOrLatino" },
                  { "label": "Non-Hispanic or Latino", "value": "nonHispanicOrLatino" }
                ]
              }
            }
          ]
        },
        {
          "key": "contact",
          "type": "panel",
          "input": false,
          "title": "Contact Information",
          "components": [
            {
              "key": "address_1",
              "type": "textfield",
              "input": true,
              "label": "Street address",
              "validate": { "required": true }
            },
            {
              "key": "city",
              "type": "textfield",
              "input": true,
              "label": "City",
              "validate": { "required": true }
            },
            {
              "key": "state",
              "type": "select",
              "input": true,
              "label": "State",
              "validate": { "required": true },
              "data": {
                "values": [
                  {"label": "AL", "value": "AL"}, {"label": "AK", "value": "AK"},
                  {"label": "AZ", "value": "AZ"}, {"label": "AR", "value": "AR"},
                  {"label": "CA", "value": "CA"}, {"label": "CO", "value": "CO"},
                  {"label": "CT", "value": "CT"}, {"label": "DE", "value": "DE"},
                  {"label": "DC", "value": "DC"}, {"label": "FL", "value": "FL"},
                  {"label": "GA", "value": "GA"}, {"label": "HI", "value": "HI"},
                  {"label": "ID", "value": "ID"}, {"label": "IL", "value": "IL"},
                  {"label": "IN", "value": "IN"}, {"label": "IA", "value": "IA"},
                  {"label": "KS", "value": "KS"}, {"label": "KY", "value": "KY"},
                  {"label": "LA", "value": "LA"}, {"label": "ME", "value": "ME"},
                  {"label": "MD", "value": "MD"}, {"label": "MA", "value": "MA"},
                  {"label": "MI", "value": "MI"}, {"label": "MN", "value": "MN"},
                  {"label": "MS", "value": "MS"}, {"label": "MO", "value": "MO"},
                  {"label": "MT", "value": "MT"}, {"label": "NE", "value": "NE"},
                  {"label": "NV", "value": "NV"}, {"label": "NH", "value": "NH"},
                  {"label": "NJ", "value": "NJ"}, {"label": "NM", "value": "NM"},
                  {"label": "NY", "value": "NY"}, {"label": "NC", "value": "NC"},
                  {"label": "ND", "value": "ND"}, {"label": "OH", "value": "OH"},
                  {"label": "OK", "value": "OK"}, {"label": "OR", "value": "OR"},
                  {"label": "PA", "value": "PA"}, {"label": "RI", "value": "RI"},
                  {"label": "SC", "value": "SC"}, {"label": "SD", "value": "SD"},
                  {"label": "TN", "value": "TN"}, {"label": "TX", "value": "TX"},
                  {"label": "UT", "value": "UT"}, {"label": "VT", "value": "VT"},
                  {"label": "VA", "value": "VA"}, {"label": "WA", "value": "WA"},
                  {"label": "WV", "value": "WV"}, {"label": "WI", "value": "WI"},
                  {"label": "WY", "value": "WY"}
                ]
              }
            },
            {
              "key": "zip_code",
              "type": "textfield",
              "input": true,
              "label": "Zip Code",
              "validate": { "required": true },
              "inputMask": "99999"
            },
            {
              "key": "phone",
              "type": "phoneNumber",
              "input": true,
              "label": "Phone # (mobile preferred)",
              "validate": { "required": true },
              "inputMask": "(999) 999-9999"
            },
            {
              "key": "email",
              "type": "email",
              "input": true,
              "label": "Preferred email",
              "validate": { "required": true }
            }
          ]
        },
        {
          "key": "insurance",
          "type": "panel",
          "input": false,
          "title": "Insurance Information",
          "components": [
            {
              "key": "insurance_provider",
              "type": "textfield",
              "input": true,
              "label": "Insurance Provider",
              "validate": { "required": true }
            },
            {
              "key": "member_id",
              "type": "textfield",
              "input": true,
              "label": "Member ID",
              "validate": { "required": true }
            },
            {
              "key": "group_number",
              "type": "textfield",
              "input": true,
              "label": "Group Number"
            },
            {
              "key": "pre_auth_notes",
              "type": "textarea",
              "input": true,
              "label": "Pre-authorization Notes",
              "rows": 2
            }
          ]
        },
        {
          "key": "medical_history",
          "type": "panel",
          "input": false,
          "title": "Medical History",
          "components": [
            {
              "key": "conditions",
              "type": "selectboxes",
              "input": true,
              "label": "Current Medical Conditions",
              "values": [
                { "label": "Hypertension", "value": "hypertension" },
                { "label": "Pre-diabetes", "value": "prediabetes" },
                { "label": "Sleep Apnea", "value": "sleep_apnea" },
                { "label": "Osteoarthritis", "value": "osteoarthritis" },
                { "label": "High Blood Pressure", "value": "high_blood_pressure" },
                { "label": "Diabetes", "value": "diabetes" },
                { "label": "High Cholesterol", "value": "high_cholesterol" },
                { "label": "Cardiovascular Disease", "value": "cardiovascular_disease" },
                { "label": "Cardiac Arrhythmias", "value": "cardiac_arrhythmias" },
                { "label": "Cancer", "value": "cancer" },
                { "label": "PCOS", "value": "pcos" },
                { "label": "Fatty Liver", "value": "fatty_liver" },
                { "label": "Kidney Disease", "value": "kidney_disease" }
              ]
            },
            {
              "key": "medications",
              "type": "textarea",
              "input": true,
              "label": "Current Medications",
              "rows": 3
            },
            {
              "key": "allergies",
              "type": "textarea",
              "input": true,
              "label": "Allergies",
              "rows": 2
            },
            {
              "key": "family_history",
              "type": "panel",
              "input": false,
              "title": "Family History",
              "components": [
                {
                  "key": "family_history.mother",
                  "type": "textfield",
                  "input": true,
                  "label": "Mother's Conditions"
                },
                {
                  "key": "family_history.father",
                  "type": "textfield",
                  "input": true,
                  "label": "Father's Conditions"
                },
                {
                  "key": "family_history.sister",
                  "type": "textfield",
                  "input": true,
                  "label": "Sibling's Conditions"
                }
              ]
            }
          ]
        },
        {
          "key": "lifestyle",
          "type": "panel",
          "input": false,
          "title": "Lifestyle Assessment",
          "components": [
            {
              "key": "lifestyle.sleep_hours",
              "type": "radio",
              "input": true,
              "label": "How many hours of sleep do you get on average?",
              "inline": true,
              "values": [
                { "label": "4 or less", "value": "fourOrLess" },
                { "label": "5 - 6", "value": "fiveToSix" },
                { "label": "6 - 7", "value": "sixToSeven" },
                { "label": "7 - 8", "value": "sevenToEight" },
                { "label": "8 +", "value": "eightPlus" }
              ]
            },
            {
              "key": "lifestyle.exercise_attitude",
              "type": "radio",
              "input": true,
              "label": "How do you feel about exercise?",
              "inline": true,
              "values": [
                { "label": "I love to exercise", "value": "loveExercise" },
                { "label": "I like to exercise", "value": "likeExercise" },
                { "label": "I don't like to exercise", "value": "dontLikeExercise" },
                { "label": "I hate exercise!", "value": "hateExercise" }
              ]
            },
            {
              "key": "lifestyle.exercise_minutes",
              "type": "radio",
              "input": true,
              "label": "How many minutes per week do you currently exercise?",
              "inline": true,
              "values": [
                { "label": "< 30", "value": "lessThan30" },
                { "label": "30 - 60", "value": "thirtyToSixty" },
                { "label": "60 - 90", "value": "sixtyToNinety" },
                { "label": "90 - 120", "value": "ninetyToOneTwenty" },
                { "label": "> 150", "value": "moreThan150" }
              ]
            },
            {
              "key": "occupation",
              "type": "textfield",
              "input": true,
              "label": "Occupation"
            },
            {
              "key": "physical_activity",
              "type": "textarea",
              "input": true,
              "label": "Physical Activity Level",
              "rows": 3
            },
            {
              "key": "sleep",
              "type": "textarea",
              "input": true,
              "label": "Sleep Patterns",
              "rows": 3
            },
            {
              "key": "substance_use",
              "type": "panel",
              "input": false,
              "title": "Substance Use",
              "components": [
                {
                  "key": "substance_use.alcohol",
                  "type": "panel",
                  "input": false,
                  "title": "Alcohol Use",
                  "components": [
                    {
                      "key": "substance_use.alcohol.current_drinker",
                      "type": "radio",
                      "input": true,
                      "label": "Current Drinker",
                      "values": [
                        { "label": "Yes", "value": "Yes" },
                        { "label": "No", "value": "No" }
                      ]
                    },
                    {
                      "key": "substance_use.alcohol.frequency",
                      "type": "textfield",
                      "input": true,
                      "label": "Frequency"
                    },
                    {
                      "key": "substance_use.alcohol.type",
                      "type": "textfield",
                      "input": true,
                      "label": "Type"
                    },
                    {
                      "key": "substance_use.alcohol.amount",
                      "type": "textfield",
                      "input": true,
                      "label": "Amount per Occasion"
                    },
                    {
                      "key": "substance_use.alcohol.duration",
                      "type": "textfield",
                      "input": true,
                      "label": "Duration of Use"
                    }
                  ]
                },
                {
                  "key": "substance_use.tobacco",
                  "type": "panel",
                  "input": false,
                  "title": "Tobacco Use",
                  "components": [
                    {
                      "key": "substance_use.tobacco.current_smoker",
                      "type": "radio",
                      "input": true,
                      "label": "Current Smoker",
                      "values": [
                        { "label": "Yes", "value": "Yes" },
                        { "label": "No", "value": "No" }
                      ]
                    },
                    {
                      "key": "substance_use.tobacco.quit_history",
                      "type": "textfield",
                      "input": true,
                      "label": "Quit History"
                    },
                    {
                      "key": "substance_use.tobacco.previous_use",
                      "type": "textfield",
                      "input": true,
                      "label": "Previous Use"
                    }
                  ]
                },
                {
                  "key": "substance_use.caffeine",
                  "type": "panel",
                  "input": false,
                  "title": "Caffeine Use",
                  "components": [
                    {
                      "key": "substance_use.caffeine.coffee",
                      "type": "textfield",
                      "input": true,
                      "label": "Coffee Consumption"
                    },
                    {
                      "key": "substance_use.caffeine.soda",
                      "type": "textfield",
                      "input": true,
                      "label": "Soda Consumption"
                    },
                    {
                      "key": "substance_use.caffeine.energy_drinks",
                      "type": "textfield",
                      "input": true,
                      "label": "Energy Drinks"
                    },
                    {
                      "key": "substance_use.caffeine.timing",
                      "type": "textfield",
                      "input": true,
                      "label": "Last Caffeine Intake"
                    }
                  ]
                }
              ]
            },
            {
              "key": "eating_patterns",
              "type": "panel",
              "input": false,
              "title": "Eating Patterns",
              "components": [
                {
                  "key": "eating_patterns.cooking_attitude",
                  "type": "radio",
                  "input": true,
                  "label": "How do you feel about cooking?",
                  "inline": false,
                  "values": [
                    { "label": "I love to cook!", "value": "iLoveToCook" },
                    { "label": "I like cooking", "value": "iLikeCooking" },
                    { "label": "I don't like cooking, but don't mind doing it occasionally", "value": "dontLikeButOccasionallyOk" },
                    { "label": "I hate cooking and please don't ask me to!", "value": "hateCooking" },
                    { "label": "My partner does most of the cooking", "value": "partnerCooks" }
                  ]
                },
                {
                  "key": "eating_patterns.cooking_frequency",
                  "type": "radio",
                  "input": true,
                  "label": "How many times per week do you (or your partner) generally cook?",
                  "inline": true,
                  "values": [
                    { "label": "Not at all", "value": "notAtAll" },
                    { "label": "1", "value": "once" },
                    { "label": "2-3", "value": "twoToThree" },
                    { "label": "4-5", "value": "fourToFive" },
                    { "label": "6-7", "value": "sixToSeven" }
                  ]
                },
                {
                  "key": "eating_patterns.cooking_style",
                  "type": "radio",
                  "input": true,
                  "label": "When cooking, do you generally thrive when flexible and having many recipes to choose from, or would you prefer a structured meal plan?",
                  "inline": false,
                  "values": [
                    { "label": "Flexible! I like to find my own recipes and plan my supermarket trips accordingly", "value": "flexible" },
                    { "label": "Structure! Please just tell me exactly what to do and buy", "value": "structured" }
                  ]
                },
                {
                  "key": "eating_patterns.partner_diet",
                  "type": "radio",
                  "input": true,
                  "label": "If you live with a partner or spouse and start a diet, would your partner also diet with you?",
                  "inline": false,
                  "values": [
                    { "label": "Yes, we would likely diet together and mostly cook/eat the same foods", "value": "dietTogether" },
                    { "label": "No, my partner isn't interested in dieting. I'm on my own here!", "value": "dietAlone" },
                    { "label": "I do not live with a partner", "value": "noPartner" }
                  ]
                },
                {
                  "key": "eating_patterns.morning_appetite",
                  "type": "radio",
                  "input": true,
                  "label": "How is your appetite first thing in the morning?",
                  "inline": false,
                  "values": [
                    { "label": "I'm starving! If I don't eat breakfast or a snack I'll feel sluggish", "value": "veryHungry" },
                    { "label": "Something in the middle", "value": "moderate" },
                    { "label": "Pretty low, I'll usually skip breakfast or just have a coffee or tea, and feel fine until lunch", "value": "low" }
                  ]
                },
                {
                  "key": "eating_patterns.food_preferences",
                  "type": "panel",
                  "input": false,
                  "title": "Food Preferences",
                  "components": [
                    {
                      "key": "eating_patterns.food_preferences.meat",
                      "type": "radio",
                      "input": true,
                      "label": "How do you feel about meat?",
                      "inline": false,
                      "values": [
                        { "label": "I love meat!", "value": "loveMeat" },
                        { "label": "I like meat, but would be okay eating a little less", "value": "okayWithLess" },
                        { "label": "I don't like meat, and am already mostly a vegetarian or vegan", "value": "vegetarianOrVegan" }
                      ]
                    },
                    {
                      "key": "eating_patterns.food_preferences.carbs",
                      "type": "radio",
                      "input": true,
                      "label": "How do you feel about grains and starchy carbs (bread, pasta, rice, potatoes, etc)?",
                      "inline": false,
                      "values": [
                        { "label": "I love them!", "value": "loveCarbs" },
                        { "label": "I like them, but would be okay eating a little less", "value": "okayWithLessCarbs" },
                        { "label": "I already eat low carb", "value": "lowCarb" }
                      ]
                    },
                    {
                      "key": "eating_patterns.food_preferences.sweets",
                      "type": "radio",
                      "input": true,
                      "label": "What is your relationship with sweets (chocolate, ice cream, candy, baked goods, etc.)?",
                      "inline": false,
                      "values": [
                        { "label": "I love them!", "value": "loveSweets" },
                        { "label": "I like sweets, but would be okay eating a little less", "value": "okayWithLessSweets" },
                        { "label": "I already don't eat a lot of sweets", "value": "lowSweets" }
                      ]
                    }
                  ]
                },
                {
                  "key": "eating_patterns.meal_pattern",
                  "type": "textarea",
                  "input": true,
                  "label": "What are the most typical things you eat day-to-day?",
                  "rows": 4
                }
              ]
            }
          ]
        },
        {
          "key": "weight_history",
          "type": "panel",
          "input": false,
          "title": "Weight History",
          "components": [
            {
              "key": "height",
              "type": "textfield",
              "input": true,
              "label": "Height",
              "validate": { "required": true }
            },
            {
              "key": "current_weight",
              "type": "number",
              "input": true,
              "label": "Current Weight (lbs)",
              "validate": { "required": true }
            },
            {
              "key": "waist_circumference",
              "type": "textfield",
              "input": true,
              "label": "Waist Circumference",
              "validate": { "required": true }
            },
            {
              "key": "highest_weight",
              "type": "panel",
              "input": false,
              "title": "Highest Adult Weight",
              "components": [
                {
                  "key": "highest_weight.weight",
                  "type": "number",
                  "input": true,
                  "label": "Weight (lbs)"
                },
                {
                  "key": "highest_weight.time",
                  "type": "textfield",
                  "input": true,
                  "label": "When"
                }
              ]
            },
            {
              "key": "lowest_weight",
              "type": "panel",
              "input": false,
              "title": "Lowest Adult Weight",
              "components": [
                {
                  "key": "lowest_weight.weight",
                  "type": "number",
                  "input": true,
                  "label": "Weight (lbs)"
                },
                {
                  "key": "lowest_weight.time",
                  "type": "textfield",
                  "input": true,
                  "label": "When"
                }
              ]
            },
            {
              "key": "goal_weight",
              "type": "number",
              "input": true,
              "label": "Goal Weight (lbs)",
              "validate": { "required": true }
            },
            {
              "key": "weight_history",
              "type": "textarea",
              "input": true,
              "label": "Weight History Details",
              "rows": 4
            },
            {
              "key": "previous_attempts",
              "type": "datagrid",
              "input": true,
              "label": "Previous Weight Loss Attempts",
              "components": [
                {
                  "key": "method",
                  "type": "textfield",
                  "input": true,
                  "label": "Method"
                },
                {
                  "key": "year",
                  "type": "number",
                  "input": true,
                  "label": "Year"
                },
                {
                  "key": "result",
                  "type": "textfield",
                  "input": true,
                  "label": "Result"
                }
              ]
            }
          ]
        },
        {
          "key": "psychological_factors",
          "type": "panel",
          "input": false,
          "title": "Psychological Factors",
          "components": [
            {
              "key": "psychological_factors.mental_health",
              "type": "textarea",
              "input": true,
              "label": "Mental Health History",
              "rows": 3
            },
            {
              "key": "psychological_factors.weight_loss_motivation",
              "type": "panel",
              "input": false,
              "title": "Weight Loss Motivation",
              "components": [
                {
                  "key": "psychological_factors.weight_loss_motivation.primary_goal",
                  "type": "textfield",
                  "input": true,
                  "label": "Primary Goal"
                },
                {
                  "key": "psychological_factors.weight_loss_motivation.secondary_goals",
                  "type": "textfield",
                  "input": true,
                  "label": "Secondary Goals"
                },
                {
                  "key": "psychological_factors.weight_loss_motivation.motivation_level",
                  "type": "textfield",
                  "input": true,
                  "label": "Motivation Level"
                }
              ]
            },
            {
              "key": "psychological_factors.barriers",
              "type": "textarea",
              "input": true,
              "label": "Barriers to Weight Loss",
              "rows": 3
            }
          ]
        },
        {
          "key": "support_system",
          "type": "panel",
          "input": false,
          "title": "Support System",
          "components": [
            {
              "key": "support_system.household",
              "type": "textfield",
              "input": true,
              "label": "Household Composition"
            },
            {
              "key": "support_system.social_support",
              "type": "textarea",
              "input": true,
              "label": "Social Support",
              "rows": 3
            }
          ]
        },
        {
          "key": "treatment_preferences",
          "type": "panel",
          "input": false,
          "title": "Treatment Preferences",
          "components": [
            {
              "key": "treatment_preferences.interested_options",
              "type": "textarea",
              "input": true,
              "label": "Interested Treatment Options",
              "rows": 3
            },
            {
              "key": "treatment_preferences.goals",
              "type": "textarea",
              "input": true,
              "label": "Treatment Goals",
              "rows": 3
            }
          ]
        },
        {
          "key": "healthcare_providers",
          "type": "panel",
          "input": false,
          "title": "Healthcare Providers",
          "components": [
            {
              "key": "preferred_lab",
              "type": "radio",
              "input": true,
              "label": "Do you know your health insurer's preferred lab?",
              "validate": { "required": true },
              "inline": true,
              "values": [
                { "label": "Labcorp", "value": "labcorp" },
                { "label": "Quest", "value": "quest" },
                { "label": "I'm not sure", "value": "imNotSure" },
                { "label": "Other", "value": "other" }
              ]
            },
            {
              "key": "primary_care",
              "type": "textfield",
              "input": true,
              "label": "Primary care physician/PCP",
              "validate": { "required": true }
            },
            {
              "key": "pcp_phone",
              "type": "phoneNumber",
              "input": true,
              "label": "PCP Phone No.",
              "validate": { "required": true },
              "inputMask": "(999) 999-9999"
            },
            {
              "key": "specialists",
              "type": "textarea",
              "input": true,
              "label": "Please list all specialists that you see regularly, and their field of medicine",
              "validate": { "required": true },
              "rows": 2
            },
            {
              "key": "preferred_pharmacy",
              "type": "textarea",
              "input": true,
              "label": "What is your preferred pharmacy? Please include phone # and address.",
              "validate": { "required": true },
              "rows": 2
            }
          ]
        },
        {
          "key": "referral",
          "type": "panel",
          "input": false,
          "title": "Referral Information",
          "components": [
            {
              "key": "referral_source",
              "type": "textfield",
              "input": true,
              "label": "How did you hear about NewCo? Please let us know if you had a specific referral, so we can thank them!",
              "validate": { "required": true }
            }
          ]
        }
      ]
    }
  ]
};

// Complete original data from the form
const originalData = {
  first_name: "John",
  last_name: "Smith",
  dob: "1980-01-01",
  insurance_provider: "Blue Cross Blue Shield",
  member_id: "ABC123456789",
  group_number: "GRP987654",
  pre_auth_notes: "Pre-authorization required for bariatric surgery",
  conditions: {
    hypertension: true,
    prediabetes: true,
    sleep_apnea: true,
    osteoarthritis: true,
    high_blood_pressure: true,
    diabetes: false,
    high_cholesterol: true,
    cardiovascular_disease: false,
    cardiac_arrhythmias: false,
    cancer: false,
    pcos: false,
    fatty_liver: true,
    kidney_disease: false
  },
  medications: "Lisinopril 10mg daily\nMetformin 500mg twice daily\nAtorvastatin 40mg daily",
  allergies: "Penicillin, Sulfa drugs",
  "family_history.mother": "Type 2 Diabetes, Hypertension",
  "family_history.father": "Heart Disease, High Cholesterol",
  "family_history.sister": "None reported",
  occupation: "Office Manager",
  "lifestyle.sleep_hours": "sixToSeven",
  "lifestyle.exercise_attitude": "dontLikeExercise",
  "lifestyle.exercise_minutes": "lessThan30",
  physical_activity: "Sedentary job, walks 20 minutes 3 times per week",
  sleep: "6-7 hours per night, frequent waking, uses CPAP machine",
  "substance_use.alcohol.current_drinker": "Yes",
  "substance_use.alcohol.frequency": "1-2 times per week",
  "substance_use.alcohol.type": "Wine",
  "substance_use.alcohol.amount": "2 glasses",
  "substance_use.alcohol.duration": "15 years",
  "substance_use.tobacco.current_smoker": "No",
  "substance_use.tobacco.quit_history": "Quit 5 years ago",
  "substance_use.tobacco.previous_use": "10 pack-years",
  "substance_use.caffeine.coffee": "2-3 cups daily",
  "substance_use.caffeine.soda": "1-2 cans daily",
  "substance_use.caffeine.energy_drinks": "None",
  "substance_use.caffeine.timing": "Last intake by 2pm",
  "eating_patterns.cooking_attitude": "iLikeCooking",
  "eating_patterns.cooking_frequency": "fourToFive",
  "eating_patterns.cooking_style": "flexible",
  "eating_patterns.partner_diet": "dietTogether",
  "eating_patterns.morning_appetite": "moderate",
  "eating_patterns.food_preferences.meat": "okayWithLess",
  "eating_patterns.food_preferences.carbs": "okayWithLessCarbs",
  "eating_patterns.food_preferences.sweets": "okayWithLessSweets",
  "eating_patterns.meal_pattern": "Breakfast: Oatmeal with fruit or eggs with toast\nLunch: Sandwich or salad with protein\nDinner: Chicken or fish with vegetables and rice\nSnacks: Fruit, nuts, yogurt",
  "eating_patterns.eating_behaviors": "Emotional eating, late night eating, large portions",
  "eating_patterns.food_preferences.enjoys": "Italian food, desserts, comfort foods",
  "eating_patterns.food_preferences.dislikes": "Most vegetables, seafood",
  "eating_patterns.food_preferences.allergies": "None",
  "eating_patterns.food_preferences.intolerances": "Lactose intolerant",
  height: "5'10\"",
  current_weight: 285,
  waist_circumference: "46 inches",
  "highest_weight.weight": 295,
  "highest_weight.time": "6 months ago",
  "lowest_weight.weight": 180,
  "lowest_weight.time": "Age 25",
  goal_weight: 200,
  weight_history: "Weight gain started in late 20s after marriage. Gradual increase of 10-15 lbs per year. Multiple attempts at dieting with temporary success.",
  previous_attempts: [
    {
      method: "Weight Watchers",
      year: 2018,
      result: "Lost 25 lbs, regained within 1 year"
    },
    {
      method: "Low Carb Diet",
      year: 2020,
      result: "Lost 30 lbs, regained during COVID"
    },
    {
      method: "Commercial Meal Plan",
      year: 2022,
      result: "Lost 15 lbs, stopped due to cost"
    }
  ],
  "psychological_factors.mental_health": "History of anxiety and depression, currently managed with therapy",
  "psychological_factors.weight_loss_motivation.primary_goal": "Improve health and reduce medications",
  "psychological_factors.weight_loss_motivation.secondary_goals": "More energy, better mobility, improved self-confidence",
  "psychological_factors.weight_loss_motivation.motivation_level": "High - 8/10",
  "psychological_factors.barriers": "Work stress, emotional eating, limited time for exercise",
  "support_system.household": "Lives with spouse and two teenage children",
  "support_system.social_support": "Supportive spouse, mixed support from extended family",
  "treatment_preferences.interested_options": "Interested in medical weight loss program, possibly bariatric surgery if needed",
  "treatment_preferences.goals": "Sustainable weight loss, better eating habits, improved health markers",
  preferred_name: "",
  sex: "male",
  gender_identity: "male",
  race: "white",
  ethnicity: "nonHispanicOrLatino",
  address_1: "123 Main St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94105",
  phone: "(555) 123-4567",
  email: "john.smith@email.com",
  preferred_lab: "imNotSure",
  primary_care: "Dr. Smith",
  pcp_phone: "(555) 987-6543",
  specialists: "None",
  preferred_pharmacy: "Walgreens, 123 Market St, (555) 555-5555",
  referral_source: "Online search"
};

export default function RevolutionSamplePage() {
  const handleDownload = () => {
    const iframe = document.getElementById('formContainer') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'download-pdf' }, '*');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold text-white">Revolution Sample Form</h1>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download PDF
                </button>
              </div>
              <p className="mt-2 text-blue-100 text-sm">Submitted on March 15, 2024 at 2:30 PM</p>
            </div>
            <div className="text-right bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-lg font-medium text-white">James Smith</h2>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-blue-100">DOB: 01/02/1992</p>
                <p className="text-sm text-blue-100">ID: 123456789</p>
                <p className="text-sm text-blue-100">Phone: (555) 555-5555</p>
                <p className="text-sm text-blue-100">Email: james.smith@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="px-4 py-6">
          <iframe
            id="formContainer"
            srcDoc={`
              <!DOCTYPE html>
              <html>
              <head>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                <title>Form Container</title>
                <script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
                <link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <style>
                  :root {
                    --primary-color: #3b82f6;
                    --text-color: #374151;
                    --border-color: #e5e7eb;
                    --background-color: #ffffff;
                    --panel-background: #fafafa;
                  }

                  body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    line-height: 1.6;
                    color: var(--text-color);
                    background-color: var(--background-color);
                    font-size: 15px;
                  }
                  
                  .card {
                    border: 1px solid var(--border-color) !important;
                    box-shadow: none !important;
                    margin-bottom: 2rem !important;
                    border-radius: 0.5rem !important;
                    max-width: 1000px !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                  }
                  
                  .card-header {
                    background: var(--panel-background) !important;
                    color: var(--text-color) !important;
                    padding: 1rem !important;
                    border-bottom: 1px solid var(--border-color) !important;
                    font-weight: 600 !important;
                    font-size: 1.1rem !important;
                  }
                  
                  .card-body {
                    padding: 1.25rem 1rem !important;
                    background-color: var(--background-color) !important;
                  }
                  
                  .form-control {
                    width: 100% !important;
                    border-radius: 0.375rem !important;
                    border: 1px solid var(--border-color) !important;
                    padding: 0.625rem 0.75rem !important;
                    transition: all 0.2s ease-in-out !important;
                    background-color: var(--background-color) !important;
                    color: var(--text-color) !important;
                    font-size: 0.95rem !important;
                  }
                  
                  .form-control:focus {
                    border-color: var(--primary-color) !important;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
                    outline: none !important;
                  }
                  
                  label.col-form-label {
                    font-weight: 500 !important;
                    color: var(--text-color) !important;
                    margin-bottom: 0.375rem !important;
                    font-size: 0.95rem !important;
                  }
                  
                  .card-title {
                    font-size: 1.1rem !important;
                    font-weight: 600 !important;
                    color: var(--text-color) !important;
                  }
                  
                  .form-check {
                    margin-bottom: 0.5rem !important;
                    padding-left: 1.5rem !important;
                  }
                  
                  .form-check-label {
                    color: var(--text-color) !important;
                    font-size: 0.95rem !important;
                  }
                  
                  .form-check-input {
                    margin-top: 0.25rem !important;
                  }
                  
                  .field-required:after {
                    color: #ef4444 !important;
                    margin-left: 0.25rem !important;
                  }
                  
                  textarea.form-control {
                    min-height: 80px !important;
                  }
                  
                  .row {
                    margin-left: -0.5rem !important;
                    margin-right: -0.5rem !important;
                  }
                  
                  [class*="col-"] {
                    padding-left: 0.5rem !important;
                    padding-right: 0.5rem !important;
                  }
                  
                  .form-group {
                    margin-bottom: 1.25rem !important;
                  }
                  
                  .form-text {
                    color: #6b7280 !important;
                    font-size: 0.875rem !important;
                    margin-top: 0.25rem !important;
                  }
                  
                  .has-error .form-control {
                    border-color: #ef4444 !important;
                  }
                  
                  .invalid-feedback {
                    color: #ef4444 !important;
                    font-size: 0.875rem !important;
                    margin-top: 0.25rem !important;
                  }

                  @media print {
                    .formio-component {
                      page-break-inside: avoid;
                    }
                  }
                </style>
              </head>
              <body>
                <div id="formio_holder"></div>
                <script>
                  const formioSchema = ${JSON.stringify(formioSchema)};
                  const originalData = ${JSON.stringify(originalData)};

                  let theForm;
                  Formio.createForm(
                    document.getElementById('formio_holder'),
                    formioSchema,
                    {
                      readOnly: false,
                      renderMode: 'flat',
                    }
                  ).then((form) => {
                    theForm = form;
                    form.submission = { data: JSON.parse(JSON.stringify(originalData)) };
                  });

                  // Listen for download request from parent
                  window.addEventListener('message', function(event) {
                    if (event.data && event.data.type === 'download-pdf') {
                      const element = document.getElementById('formio_holder');
                      const opt = {
                        margin: 20,
                        filename: 'revolution-intake-form.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { 
                          scale: 2,
                          useCORS: true,
                          scrollY: 0,
                          windowWidth: element.scrollWidth
                        },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                      };
                      html2pdf().set(opt).from(element).save();
                    }
                  });
                </script>
              </body>
              </html>
            `}
            className="w-full min-h-[600px] border-0 bg-white"
            style={{ height: '100vh' }}
          />
        </div>
      </div>
    </div>
  );
} 