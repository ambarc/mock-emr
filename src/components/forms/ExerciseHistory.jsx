import { useState } from 'react';

const exerciseTypes = [
  { category: 'Cardio', activities: ['Walking', 'Running', 'Swimming', 'Cycling', 'Elliptical', 'Rowing'] },
  { category: 'Strength', activities: ['Weight Training', 'Bodyweight Exercises', 'Resistance Bands'] },
  { category: 'Flexibility', activities: ['Yoga', 'Stretching', 'Pilates'] },
  { category: 'Sports', activities: ['Basketball', 'Tennis', 'Soccer', 'Golf'] },
  { category: 'Other', activities: ['Dancing', 'Gardening', 'House Work'] },
];

function ExerciseHistory() {
  const [currentExercise, setCurrentExercise] = useState({
    type: '',
    activity: '',
    frequency: '',
    duration: '',
    intensity: '',
    limitations: '',
    goals: '',
  });

  const [exerciseEntries, setExerciseEntries] = useState([]);

  const handleChange = (field, value) => {
    setCurrentExercise(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExercise = () => {
    if (currentExercise.activity && currentExercise.frequency) {
      setExerciseEntries([
        ...exerciseEntries,
        {
          ...currentExercise,
          id: Date.now(),
        }
      ]);
      setCurrentExercise({
        type: '',
        activity: '',
        frequency: '',
        duration: '',
        intensity: '',
        limitations: '',
        goals: '',
      });
    }
  };

  const removeExercise = (id) => {
    setExerciseEntries(exerciseEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Exercise History</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add Exercise Activity</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Type
                </label>
                <select
                  value={currentExercise.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Select type</option>
                  {exerciseTypes.map(type => (
                    <option key={type.category} value={type.category}>
                      {type.category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity
                </label>
                <select
                  value={currentExercise.activity}
                  onChange={(e) => handleChange('activity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  disabled={!currentExercise.type}
                >
                  <option value="">Select activity</option>
                  {currentExercise.type && 
                    exerciseTypes
                      .find(t => t.category === currentExercise.type)
                      ?.activities.map(activity => (
                        <option key={activity} value={activity}>
                          {activity}
                        </option>
                      ))
                  }
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={currentExercise.frequency}
                  onChange={(e) => handleChange('frequency', e.target.value)}
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
                  value={currentExercise.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  placeholder="Enter duration in minutes"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intensity Level
              </label>
              <select
                value={currentExercise.intensity}
                onChange={(e) => handleChange('intensity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="">Select intensity</option>
                <option value="light">Light - Easy to breathe and carry a conversation</option>
                <option value="moderate">Moderate - Slightly harder to breathe but can talk</option>
                <option value="vigorous">Vigorous - Heavy breathing, difficult to talk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limitations or Concerns
              </label>
              <textarea
                value={currentExercise.limitations}
                onChange={(e) => handleChange('limitations', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                rows={2}
                placeholder="Any physical limitations or concerns..."
              />
            </div>

            <button
              onClick={addExercise}
              disabled={!currentExercise.activity || !currentExercise.frequency}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Exercise
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Current Exercise Activities</h3>
          <div className="space-y-2">
            {exerciseEntries.map(entry => (
              <div
                key={entry.id}
                className="p-4 bg-gray-50 rounded-md"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{entry.activity}</div>
                    <div className="text-sm text-gray-500">
                      Type: {entry.type} | Frequency: {entry.frequency}
                      {entry.duration && ` | Duration: ${entry.duration} minutes`}
                    </div>
                    {entry.intensity && (
                      <div className="text-sm text-gray-500">
                        Intensity: {entry.intensity}
                      </div>
                    )}
                    {entry.limitations && (
                      <div className="text-sm text-gray-500 mt-1">
                        Limitations: {entry.limitations}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeExercise(entry.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {exerciseEntries.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No exercise activities recorded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseHistory; 