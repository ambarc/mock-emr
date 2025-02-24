import { useState } from 'react';
import { usePatient } from '../../context/PatientContext';

function ClinicalNotes() {
  const [note, setNote] = useState('');
  const { selectedPatient } = usePatient();

  const handleSave = () => {
    // Here you would typically save the note to your backend
    console.log('Saving note:', note);
  };

  return (
    <div className="max-w-4xl text-gray-900">
      <h2 className="text-xl font-semibold mb-6">Clinical Notes</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-900">
            Patient: {selectedPatient.name} | Date: {new Date().toLocaleDateString()}
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-800 text-gray-900 rounded-md hover:bg-gray-700"
          >
            Save Note
          </button>
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-[calc(100vh-250px)] p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-900"
          placeholder="Enter clinical notes here..."
        />
      </div>
    </div>
  );
}

export default ClinicalNotes; 