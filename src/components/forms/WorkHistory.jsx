import { useState } from 'react';

function WorkHistory() {
  const [formData, setFormData] = useState({
    currentlyEmployed: true,
    occupation: '',
    employer: '',
    schedule: '',
    physicalDemands: '',
    workEnvironment: '',
    stressLevel: '',
    mealsAtWork: '',
    exerciseOpportunities: '',
    additionalNotes: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Work History</h2>

      <div className="space-y-6 bg-white p-6 rounded-md border border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="currentlyEmployed"
            checked={formData.currentlyEmployed}
            onChange={(e) => handleChange('currentlyEmployed', e.target.checked)}
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
              value={formData.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employer
            </label>
            <input
              type="text"
              value={formData.employer}
              onChange={(e) => handleChange('employer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Schedule
          </label>
          <select
            value={formData.schedule}
            onChange={(e) => handleChange('schedule', e.target.value)}
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
            value={formData.physicalDemands}
            onChange={(e) => handleChange('physicalDemands', e.target.value)}
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
            Meals at Work
          </label>
          <textarea
            value={formData.mealsAtWork}
            onChange={(e) => handleChange('mealsAtWork', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={3}
            placeholder="Describe typical meal patterns during work hours..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exercise Opportunities
          </label>
          <textarea
            value={formData.exerciseOpportunities}
            onChange={(e) => handleChange('exerciseOpportunities', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={3}
            placeholder="Describe any opportunities for physical activity during work..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => handleChange('additionalNotes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={3}
            placeholder="Any additional notes about work environment or circumstances..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => console.log('Saving work history:', formData)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Save Work History
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkHistory; 