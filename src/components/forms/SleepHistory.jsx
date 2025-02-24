import { useState } from 'react';

function SleepHistory() {
  const [formData, setFormData] = useState({
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sleep History</h2>

      <div className="bg-white p-6 rounded-md border border-gray-200 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Average Hours of Sleep
            </label>
            <input
              type="number"
              value={formData.averageHours}
              onChange={(e) => handleChange('averageHours', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Hours per night"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sleep Quality
            </label>
            <select
              value={formData.sleepQuality}
              onChange={(e) => handleChange('sleepQuality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option value="">Select quality</option>
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
              value={formData.bedtime}
              onChange={(e) => handleChange('bedtime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Typical Wake Time
            </label>
            <input
              type="time"
              value={formData.wakeTime}
              onChange={(e) => handleChange('wakeTime', e.target.value)}
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
              { id: 'snoring', label: 'Snoring' },
              { id: 'sleepApnea', label: 'Sleep Apnea' },
              { id: 'insomnia', label: 'Insomnia' },
              { id: 'restlessLegs', label: 'Restless Legs' },
            ].map(issue => (
              <div key={issue.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={issue.id}
                  checked={formData[issue.id]}
                  onChange={(e) => handleChange(issue.id, e.target.checked)}
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
            Daytime Sleepiness
          </label>
          <select
            value={formData.daytimeSleepiness}
            onChange={(e) => handleChange('daytimeSleepiness', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">Select level</option>
            <option value="none">None</option>
            <option value="mild">Mild - Occasionally sleepy during day</option>
            <option value="moderate">Moderate - Regular daytime sleepiness</option>
            <option value="severe">Severe - Constant struggle to stay awake</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Evening Screen Time
          </label>
          <select
            value={formData.screenTime}
            onChange={(e) => handleChange('screenTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">Select usage</option>
            <option value="none">No screen time before bed</option>
            <option value="limited">Limited - Less than 30 minutes</option>
            <option value="moderate">Moderate - 30-60 minutes</option>
            <option value="heavy">Heavy - More than 1 hour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sleep Environment
          </label>
          <textarea
            value={formData.sleepEnvironment}
            onChange={(e) => handleChange('sleepEnvironment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={2}
            placeholder="Describe your sleep environment (temperature, noise, light, etc.)"
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
            placeholder="Any other information about your sleep patterns..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => console.log('Saving sleep history:', formData)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Save Sleep History
          </button>
        </div>
      </div>
    </div>
  );
}

export default SleepHistory; 