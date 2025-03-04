import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Intake Review | Clinic EMR',
  description: 'Review completed obesity intake survey',
};

export default function IntakeSurveyReview() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-baseline">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Obesity Intake Survey Results</h1>
                <p className="mt-1 text-sm text-gray-700">Submitted on March 15, 2024 at 2:30 PM</p>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-medium text-gray-900">James Smith</h2>
                <p className="text-sm text-gray-700">DOB: 08/15/1980</p>
                <p className="text-sm text-gray-700">Patient ID: 12345</p>
                <p className="text-sm text-gray-700">Phone: (555) 123-4567</p>
                <p className="text-sm text-gray-700">Email: james.smith@email.com</p>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="px-8 py-6 space-y-8">
            {/* Insurance Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Primary Insurance</p>
                  <div className="mt-1 space-y-1">
                    <p className="text-gray-900">Provider: Blue Cross Blue Shield</p>
                    <p className="text-gray-900">Member ID: BCBS789012345</p>
                    <p className="text-gray-900">Group Number: GRP987654</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Pre-authorization Notes</p>
                  <p className="mt-1 text-gray-900">Prior authorization required for weight management medications and specialist referrals.</p>
                </div>
              </div>
            </section>

            {/* Vital Statistics */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vital Statistics</h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Height</p>
                  <p className="mt-1 text-gray-900">5'6" (167.6 cm)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Weight</p>
                  <p className="mt-1 text-gray-900">245 lbs (111.1 kg)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">BMI</p>
                  <p className="mt-1 text-gray-900">39.5 kg/m²</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Waist Circumference</p>
                  <p className="mt-1 text-gray-900">42 inches (106.7 cm)</p>
                </div>
              </div>
            </section>

            {/* Weight History */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weight History</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Highest Adult Weight</p>
                  <p className="mt-1 text-gray-900">255 lbs (occurred 3 months ago)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Lowest Adult Weight</p>
                  <p className="mt-1 text-gray-900">165 lbs (occurred 10 years ago)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Weight Gain Pattern</p>
                  <p className="mt-1 text-gray-900">Gradual weight gain over past 5 years, accelerated during COVID-19 pandemic. Gained 45 lbs in last 2 years.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Previous Weight Loss Attempts</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Weight Watchers (2020) - Lost 20 lbs, regained</li>
                    <li>Keto Diet (2021) - Lost 15 lbs, regained</li>
                    <li>Intermittent Fasting (2022) - Lost 10 lbs, regained</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Medical History */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Medical Conditions</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Hypertension (diagnosed 2021)</li>
                    <li>Pre-diabetes (diagnosed 2022)</li>
                    <li>Sleep Apnea (diagnosed 2023)</li>
                    <li>Osteoarthritis in knees</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Allergies & Intolerances</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Penicillin - Severe (anaphylaxis)</li>
                    <li>Sulfa Drugs - Moderate (rash)</li>
                    <li>Shellfish - Mild (itching)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Medications</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Lisinopril 10mg once daily</li>
                    <li>Metformin 500mg once daily</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Family History</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Mother: Type 2 Diabetes, Obesity</li>
                    <li>Father: Hypertension, Heart Disease</li>
                    <li>Sister: Obesity</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Lifestyle Assessment */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lifestyle Assessment</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Occupation & Work Schedule</p>
                  <p className="mt-1 text-gray-900">Software Developer, Remote work, Sedentary desk job 8+ hours daily</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Physical Activity</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Currently: 2,000 steps/day average</li>
                    <li>Light walking 10 minutes during lunch break</li>
                    <li>No structured exercise program</li>
                    <li>Reports knee pain limits activity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Sleep Patterns</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>6 hours average sleep per night</li>
                    <li>Uses CPAP machine with moderate compliance</li>
                    <li>Reports difficulty falling asleep</li>
                    <li>Frequent night-time snacking</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Substance History */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Substance History</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Alcohol Use</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Current drinker: Yes</li>
                    <li>Frequency: 2-3 times per week</li>
                    <li>Type: Beer and wine</li>
                    <li>Amount: 2-3 drinks per occasion</li>
                    <li>Duration: 15 years of use</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tobacco Use</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Current smoker: No</li>
                    <li>Past smoking history: Quit 5 years ago</li>
                    <li>Previous use: 1/2 pack per day for 10 years</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Caffeine Intake</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Coffee: 4-5 cups per day (regular)</li>
                    <li>Soda: 2-3 cans of diet soda daily</li>
                    <li>Energy Drinks: 1-2 sugar-free energy drinks per week</li>
                    <li>Timing: Last caffeine intake typically around 6 PM</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Other Substances</p>
                  <p className="mt-1 text-gray-900">No current or past use of other substances reported</p>
                </div>
              </div>
            </section>

            {/* Eating Patterns */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Eating Patterns</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Meal Pattern</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Skips breakfast most days</li>
                    <li>Large lunch (usually takeout)</li>
                    <li>Snacks throughout afternoon</li>
                    <li>Large dinner after 8 PM</li>
                    <li>Night-time snacking while watching TV</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Eating Behaviors</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Reports stress eating during work deadlines</li>
                    <li>Eats while working at desk</li>
                    <li>Fast eating pace</li>
                    <li>Large portion sizes</li>
                    <li>Emotional eating when anxious or stressed</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Food Preferences & Restrictions</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Enjoys: Pasta, bread, cheese, sweets</li>
                    <li>Dislikes: Most vegetables</li>
                    <li>No food allergies</li>
                    <li>Lactose intolerant but consumes dairy</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Psychological Factors */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Psychological Factors</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Mental Health History</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Diagnosed with anxiety (2020)</li>
                    <li>Reports increased stress due to work</li>
                    <li>No current mental health treatment</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Weight Loss Motivation</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Primary goal: Improve mobility and reduce knee pain</li>
                    <li>Secondary goals: Better sleep, more energy</li>
                    <li>Motivation level: 8/10</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Barriers to Weight Loss</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Limited time for meal preparation</li>
                    <li>Work stress leading to emotional eating</li>
                    <li>Physical limitations due to knee pain</li>
                    <li>Poor sleep affecting eating patterns</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Support System */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Support System</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Household Composition</p>
                  <p className="mt-1 text-gray-900">Lives alone, single</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Social Support</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Supportive parents live nearby</li>
                    <li>Close friend interested in being exercise buddy</li>
                    <li>Coworkers often order takeout together</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Treatment Preferences */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Preferences</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Interested Treatment Options</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Open to medication options</li>
                    <li>Interested in meal planning assistance</li>
                    <li>Wants guidance on exercise with knee limitations</li>
                    <li>Considering behavioral therapy</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Goals</p>
                  <ul className="mt-1 list-disc list-inside text-gray-900">
                    <li>Initial goal: Lose 20 lbs in 6 months</li>
                    <li>Long-term goal: Reach 180 lbs</li>
                    <li>Improve mobility and reduce knee pain</li>
                    <li>Establish better eating patterns</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 