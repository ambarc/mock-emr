import { useState } from 'react';

const mockSurgeries = [
  { id: 1, name: 'Gastric Bypass', category: 'Bariatric' },
  { id: 2, name: 'Sleeve Gastrectomy', category: 'Bariatric' },
  { id: 3, name: 'Gastric Band', category: 'Bariatric' },
  { id: 4, name: 'Duodenal Switch', category: 'Bariatric' },
  { id: 5, name: 'Gallbladder Removal', category: 'General' },
  { id: 6, name: 'Appendectomy', category: 'General' },
  { id: 7, name: 'Hernia Repair', category: 'General' },
  { id: 8, name: 'Joint Replacement', category: 'Orthopedic' },
];

function SurgicalHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [surgeries, setSurgeries] = useState([]);
  const [customSurgery, setCustomSurgery] = useState('');
  const [surgeryDate, setSurgeryDate] = useState('');
  const [complications, setComplications] = useState('');

  const filteredSurgeries = mockSurgeries.filter(surgery =>
    surgery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surgery.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSurgery = (surgery = null) => {
    const newSurgery = {
      id: Date.now(),
      name: surgery ? surgery.name : customSurgery,
      date: surgeryDate,
      complications: complications,
    };
    setSurgeries([...surgeries, newSurgery]);
    setSearchTerm('');
    setCustomSurgery('');
    setSurgeryDate('');
    setComplications('');
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Surgical History</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Common Surgeries
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Type to search surgeries..."
              />
              {searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredSurgeries.map(surgery => (
                    <div
                      key={surgery.id}
                      onClick={() => {
                        setSearchTerm(surgery.name);
                        setCustomSurgery(surgery.name);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="font-medium">{surgery.name}</div>
                      <div className="text-sm text-gray-500">Category: {surgery.category}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Surgery Name
              </label>
              <input
                type="text"
                value={customSurgery}
                onChange={(e) => setCustomSurgery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Enter surgery name if not found above..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Surgery
                </label>
                <input
                  type="date"
                  value={surgeryDate}
                  onChange={(e) => setSurgeryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complications/Notes
              </label>
              <textarea
                value={complications}
                onChange={(e) => setComplications(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Enter any complications or additional notes..."
              />
            </div>

            <button
              onClick={() => addSurgery()}
              disabled={!customSurgery || !surgeryDate}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Surgery
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Surgery History</h3>
          <div className="space-y-2">
            {surgeries.map(surgery => (
              <div
                key={surgery.id}
                className="p-4 bg-gray-50 rounded-md"
              >
                <div className="font-medium">{surgery.name}</div>
                <div className="text-sm text-gray-500">
                  Date: {new Date(surgery.date).toLocaleDateString()}
                </div>
                {surgery.complications && (
                  <div className="text-sm text-gray-500 mt-1">
                    Notes: {surgery.complications}
                  </div>
                )}
              </div>
            ))}
            {surgeries.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No surgical history recorded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurgicalHistory; 