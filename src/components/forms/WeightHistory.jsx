import { useState } from 'react';

function WeightHistory() {
  const [weightEntries, setWeightEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    weight: '',
    notes: '',
    context: '', // e.g., "Morning weight", "After exercise", etc.
  });

  const addWeightEntry = () => {
    if (newEntry.date && newEntry.weight) {
      setWeightEntries([
        ...weightEntries,
        {
          ...newEntry,
          id: Date.now(),
        }
      ]);
      setNewEntry({
        date: '',
        weight: '',
        notes: '',
        context: '',
      });
    }
  };

  const removeEntry = (id) => {
    setWeightEntries(weightEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Weight History</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add Weight Entry</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry({...newEntry, weight: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  placeholder="Enter weight in pounds"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Context
              </label>
              <select
                value={newEntry.context}
                onChange={(e) => setNewEntry({...newEntry, context: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="">Select context</option>
                <option value="morning">Morning weight</option>
                <option value="evening">Evening weight</option>
                <option value="post_exercise">After exercise</option>
                <option value="clinic_visit">Clinic visit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                rows={2}
                placeholder="Any additional notes about this weight measurement..."
              />
            </div>

            <button
              onClick={addWeightEntry}
              disabled={!newEntry.date || !newEntry.weight}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Entry
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Weight History Log</h3>
          <div className="space-y-2">
            {weightEntries.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => (
              <div
                key={entry.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium">
                    {entry.weight} lbs
                    {entry.context && <span className="text-sm text-gray-500 ml-2">({entry.context})</span>}
                  </div>
                  <div className="text-sm text-gray-500">
                    Date: {new Date(entry.date).toLocaleDateString()}
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-gray-500 mt-1">
                      Notes: {entry.notes}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Remove
                </button>
              </div>
            ))}
            {weightEntries.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No weight entries recorded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeightHistory; 