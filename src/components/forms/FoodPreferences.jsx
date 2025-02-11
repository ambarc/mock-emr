import { useState } from 'react';

function FoodPreferences() {
  const [formData, setFormData] = useState({
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

  const toggleDietaryRestriction = (restriction) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Food Preferences</h2>

      <div className="bg-white p-6 rounded-md border border-gray-200 space-y-6">
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
                  checked={formData.dietaryRestrictions.includes(option)}
                  onChange={() => toggleDietaryRestriction(option)}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor={option} className="ml-2 block text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={formData.customRestrictions}
            onChange={(e) => handleChange('customRestrictions', null, e.target.value)}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Other dietary restrictions..."
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
                  value={formData.mealTiming[meal]}
                  onChange={(e) => handleChange('mealTiming', meal, e.target.value)}
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
                  value={formData.foodPreferences[item.id]}
                  onChange={(e) => handleChange('foodPreferences', item.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Eating Speed
          </label>
          <select
            value={formData.eatingHabits.speed}
            onChange={(e) => handleChange('eatingHabits', 'speed', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">Select eating speed</option>
            <option value="very_slow">Very Slow</option>
            <option value="slow">Slow</option>
            <option value="moderate">Moderate</option>
            <option value="fast">Fast</option>
            <option value="very_fast">Very Fast</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Intake
          </label>
          <input
            type="text"
            value={formData.waterIntake}
            onChange={(e) => handleChange('waterIntake', null, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Daily water consumption..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emotional Eating Patterns
          </label>
          <textarea
            value={formData.emotionalEating}
            onChange={(e) => handleChange('emotionalEating', null, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={3}
            placeholder="Describe any patterns of emotional eating..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meal Preparation
          </label>
          <textarea
            value={formData.mealPrep}
            onChange={(e) => handleChange('mealPrep', null, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={3}
            placeholder="Describe your typical meal preparation habits..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => console.log('Saving food preferences:', formData)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Save Food Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodPreferences; 