import { useState } from 'react';

const mockMedications = [
  { id: 1, name: 'Phentermine', dosage: '37.5mg', category: 'Weight Loss' },
  { id: 2, name: 'Contrave', dosage: '8mg/90mg', category: 'Weight Loss' },
  { id: 3, name: 'Wegovy', dosage: '2.4mg', category: 'GLP-1 Agonist' },
  { id: 4, name: 'Saxenda', dosage: '3mg', category: 'GLP-1 Agonist' },
  { id: 5, name: 'Metformin', dosage: '1000mg', category: 'Diabetes' },
  { id: 6, name: 'Ozempic', dosage: '1mg', category: 'GLP-1 Agonist' },
  { id: 7, name: 'Mounjaro', dosage: '5mg', category: 'GLP-1/GIP Agonist' },
  { id: 8, name: 'Topiramate', dosage: '100mg', category: 'Weight Loss' },
  { id: 9, name: 'Zonisamide', dosage: '100mg', category: 'Weight Loss' },
  { id: 10, name: 'Bupropion', dosage: '150mg', category: 'Antidepressant' },
];

function Medications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [customDosage, setCustomDosage] = useState('');
  const [customFrequency, setCustomFrequency] = useState('');

  const filteredMeds = mockMedications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMedication = (med) => {
    if (!selectedMeds.find(m => m.id === med.id)) {
      setSelectedMeds([...selectedMeds, {
        ...med,
        customDosage: customDosage || med.dosage,
        frequency: customFrequency,
        dateAdded: new Date().toISOString()
      }]);
    }
    setSearchTerm('');
    setCustomDosage('');
    setCustomFrequency('');
  };

  const removeMedication = (medId) => {
    setSelectedMeds(selectedMeds.filter(m => m.id !== medId));
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Medications</h2>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Medication
          </label>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Search medications..."
              />
              {searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredMeds.map(med => (
                    <div
                      key={med.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div 
                        onClick={() => {
                          setSearchTerm(med.name);
                          setCustomDosage(med.dosage);
                        }}
                        className="font-medium"
                      >
                        {med.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Standard dose: {med.dosage} | Category: {med.category}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  value={customDosage}
                  onChange={(e) => setCustomDosage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  placeholder="Enter dosage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <input
                  type="text"
                  value={customFrequency}
                  onChange={(e) => setCustomFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  placeholder="e.g., Once daily"
                />
              </div>
            </div>

            <button
              onClick={() => {
                const med = filteredMeds.find(m => m.name === searchTerm);
                if (med) addMedication(med);
              }}
              disabled={!searchTerm || !filteredMeds.find(m => m.name === searchTerm)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Medication
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Current Medications</h3>
          <div className="space-y-2">
            {selectedMeds.map(med => (
              <div
                key={med.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium">{med.name}</div>
                  <div className="text-sm text-gray-500">
                    Dosage: {med.customDosage} | Frequency: {med.frequency}
                  </div>
                  <div className="text-xs text-gray-400">
                    Added: {new Date(med.dateAdded).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => removeMedication(med.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Remove
                </button>
              </div>
            ))}
            {selectedMeds.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No active medications
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medications; 