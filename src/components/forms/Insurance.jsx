import { useState } from 'react';

const insuranceCompanies = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare',
  'Humana',
  'Kaiser Permanente',
  'Medicare',
  'Medicaid'
];

function Insurance() {
  const [insuranceType, setInsuranceType] = useState('primary');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = insuranceCompanies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Insurance Information</h2>
      
      <div className="mb-4">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${insuranceType === 'primary' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setInsuranceType('primary')}
          >
            Primary Insurance
          </button>
          <button
            className={`px-4 py-2 rounded ${insuranceType === 'secondary' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setInsuranceType('secondary')}
          >
            Secondary Insurance
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Insurance Provider</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                placeholder="Search insurance providers..."
              />
              {searchTerm && (
                <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-md shadow-lg">
                  {filteredCompanies.map((company, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchTerm(company)}
                    >
                      {company}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Member ID</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Group Number</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pre-authorization Notes</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insurance; 