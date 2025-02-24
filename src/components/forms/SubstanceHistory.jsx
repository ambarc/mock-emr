import { useState } from 'react';

function SubstanceHistory() {
  const [formData, setFormData] = useState({
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

  const handleChange = (category, subcategory, value) => {
    if (subcategory) {
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subcategory]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Substance History</h2>

      <div className="space-y-8">
        {/* Alcohol Section */}
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Alcohol Use</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="currentAlcohol"
                checked={formData.alcohol.current}
                onChange={(e) => handleChange('alcohol', 'current', e.target.checked)}
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
                  value={formData.alcohol.frequency}
                  onChange={(e) => handleChange('alcohol', 'frequency', e.target.value)}
                  className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="occasionally">Occasionally</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={formData.alcohol.type}
                  onChange={(e) => handleChange('alcohol', 'type', e.target.value)}
                  placeholder="e.g., Beer, Wine, Spirits"
                  className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Caffeine Section */}
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Caffeine Intake</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coffee (cups per day)
                </label>
                <input
                  type="number"
                  value={formData.caffeine.coffee.cupsPerDay}
                  onChange={(e) => handleChange('caffeine', 'coffee', {
                    ...formData.caffeine.coffee,
                    cupsPerDay: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soda (oz per day)
                </label>
                <input
                  type="number"
                  value={formData.caffeine.soda.ouncesPerDay}
                  onChange={(e) => handleChange('caffeine', 'soda', {
                    ...formData.caffeine.soda,
                    ouncesPerDay: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Energy Drinks
              </label>
              <select
                value={formData.caffeine.energyDrinks.frequency}
                onChange={(e) => handleChange('caffeine', 'energyDrinks', {
                  ...formData.caffeine.energyDrinks,
                  frequency: e.target.value
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
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => console.log('Saving substance history:', formData)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Save History
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubstanceHistory; 