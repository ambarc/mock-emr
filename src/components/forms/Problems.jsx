import { useState } from 'react';

const mockProblems = [
  { id: 1, code: 'E66.01', name: 'Morbid obesity' },
  { id: 2, code: 'E66.3', name: 'Overweight' },
  { id: 3, code: 'E66.09', name: 'Other obesity' },
  { id: 4, code: 'E78.5', name: 'Dyslipidemia' },
  { id: 5, code: 'I10', name: 'Essential hypertension' },
  { id: 6, code: 'E11.9', name: 'Type 2 diabetes mellitus without complications' },
  { id: 7, code: 'G47.33', name: 'Obstructive sleep apnea' },
  { id: 8, code: 'M25.50', name: 'Joint pain' },
  { id: 9, code: 'F32.9', name: 'Depression' },
  { id: 10, code: 'E03.9', name: 'Hypothyroidism' },
];

function Problems() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);

  const filteredProblems = mockProblems.filter(problem =>
    problem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProblem = (problem) => {
    if (!selectedProblems.find(p => p.id === problem.id)) {
      setSelectedProblems([...selectedProblems, problem]);
    }
    setSearchTerm('');
  };

  const removeProblem = (problemId) => {
    setSelectedProblems(selectedProblems.filter(p => p.id !== problemId));
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Problem List</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Add Problem
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Search by problem or ICD-10 code..."
            />
            {searchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredProblems.map(problem => (
                  <div
                    key={problem.id}
                    onClick={() => addProblem(problem)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{problem.name}</div>
                    <div className="text-sm text-gray-500">ICD-10: {problem.code}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Active Problems</h3>
          <div className="space-y-2">
            {selectedProblems.map(problem => (
              <div
                key={problem.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium">{problem.name}</div>
                  <div className="text-sm text-gray-500">ICD-10: {problem.code}</div>
                </div>
                <button
                  onClick={() => removeProblem(problem.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Remove
                </button>
              </div>
            ))}
            {selectedProblems.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No active problems
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problems; 