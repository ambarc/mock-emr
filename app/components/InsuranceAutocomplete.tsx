import React, { useState, useRef, useEffect } from 'react';

// Mock data - in real app this would come from an API
const insuranceProviders = [
  {
    id: '1',
    name: 'Aetna',
    code: '1362',
    subcontracting: 'Direct Contract',
    affiliates: ['Aetna Better Health', 'Innovation Health'],
    plans: ['Medicare', 'Commercial', 'Medicaid'],
    claimsAddress: 'PO Box 14001, Lexington, KY 40512',
    electronicPayer: 'ID: 60054 - Claims Office Lexington'
  },
  {
    id: '2',
    name: 'BCBS-DC - FEP',
    code: '32186',
    subcontracting: 'Via CareFirst Alliance',
    affiliates: ['CareFirst BlueCross BlueShield'],
    plans: ['Federal Employee Program'],
    claimsAddress: 'PO Box 14115, Lexington, KY 40512',
    electronicPayer: 'ID: 00510 - DC FEP Claims'
  },
  {
    id: '3',
    name: 'Cigna',
    code: '74',
    subcontracting: 'Direct Contract + MultiPlan Network',
    affiliates: ['Cigna HealthSpring', 'Evernorth'],
    plans: ['Commercial', 'Medicare Advantage', 'Behavioral Health'],
    claimsAddress: 'PO Box 182223, Chattanooga, TN 37422',
    electronicPayer: 'ID: 62308 - Commercial Claims'
  },
  {
    id: '4',
    name: 'UnitedHealthcare',
    code: '982',
    subcontracting: 'Direct Contract',
    affiliates: ['Optum', 'UMR', 'All Savers'],
    plans: ['Commercial', 'Medicare', 'Medicaid', 'Dual Eligible'],
    claimsAddress: 'PO Box 740800, Atlanta, GA 30374',
    electronicPayer: 'ID: 87726 - Commercial Claims'
  },
  {
    id: '5',
    name: 'TRICARE East - Humana Military',
    code: '77034',
    subcontracting: 'Military Health System Contract',
    affiliates: ['Humana Military Healthcare Services'],
    plans: ['TRICARE Prime', 'TRICARE Select', 'TRICARE For Life'],
    claimsAddress: 'PO Box 7890, Madison, WI 53707',
    electronicPayer: 'ID: TRIGON - TRICARE East Claims'
  },
  {
    id: '6',
    name: 'VA Community Care Network',
    code: '84146',
    subcontracting: 'Via Optum VA Contract',
    affiliates: ['Veterans Health Administration', 'Optum VA CCN'],
    plans: ['VA Medical Benefits', 'Veterans Choice Program'],
    claimsAddress: 'PO Box 30780, Salt Lake City, UT 84130',
    electronicPayer: 'ID: VACCN1 - VA CCN Region 1'
  },
  {
    id: '7',
    name: 'Medicare Traditional',
    code: '16014',
    subcontracting: 'CMS Direct',
    affiliates: ['CMS', 'Novitas Solutions'],
    plans: ['Medicare Part A', 'Medicare Part B'],
    claimsAddress: 'PO Box 3095, Mechanicsburg, PA 17055',
    electronicPayer: 'ID: 12202 - Medicare Part B Claims'
  },
  {
    id: '8',
    name: 'Kaiser Permanente',
    code: '95201',
    subcontracting: 'Exclusive Provider Network',
    affiliates: ['Kaiser Foundation Health Plan', 'Mid-Atlantic Permanente Medical Group'],
    plans: ['HMO', 'Medicare Advantage', 'Federal Employee Program'],
    claimsAddress: 'PO Box 371860, Denver, CO 80237',
    electronicPayer: 'ID: 94265 - Kaiser Claims'
  },
  {
    id: '9',
    name: 'GEHA - Federal',
    code: '40308',
    subcontracting: 'Federal Employee Program',
    affiliates: ['Government Employees Health Association', 'Connection Dental'],
    plans: ['Standard Option', 'High Option', 'HDHP'],
    claimsAddress: 'PO Box 21542, Eagan, MN 55121',
    electronicPayer: 'ID: 41047 - GEHA FEP Claims'
  },
  {
    id: '10',
    name: 'CHAMPVA',
    code: '84240',
    subcontracting: 'VA Health Administration Center',
    affiliates: ['Veterans Health Administration'],
    plans: ['CHAMPVA Benefits', 'CHAMPVA For Life'],
    claimsAddress: 'PO Box 469064, Denver, CO 80246',
    electronicPayer: 'ID: 84240 - CHAMPVA Claims'
  },
  {
    id: '11',
    name: 'Anthem BCBS',
    code: '00751',
    subcontracting: 'Blue Card Program',
    affiliates: ['Empire BCBS', 'Anthem Blue Cross'],
    plans: ['PPO', 'HMO', 'Medicare Advantage', 'Federal Employee Program'],
    claimsAddress: 'PO Box 105187, Atlanta, GA 30348',
    electronicPayer: 'ID: 00751 - Anthem Claims'
  },
  {
    id: '12',
    name: 'Medicaid DC',
    code: '77013',
    subcontracting: 'DC Department of Healthcare Finance',
    affiliates: ['DC Healthy Families', 'DC Healthcare Alliance'],
    plans: ['Fee for Service', 'Managed Care', 'Long Term Care'],
    claimsAddress: 'PO Box 34734, Washington, DC 20043',
    electronicPayer: 'ID: 77013 - DC Medicaid Claims'
  },
  {
    id: '13',
    name: 'NALC Health Benefit Plan',
    code: '53130',
    subcontracting: 'Federal Employee Program',
    affiliates: ['National Association of Letter Carriers', 'Cigna Healthcare'],
    plans: ['High Option', 'Consumer Driven', 'Value Option'],
    claimsAddress: 'PO Box 188004, Chattanooga, TN 37422',
    electronicPayer: 'ID: 53130 - NALC Claims'
  },
  {
    id: '14',
    name: 'Foreign Service Benefit Plan',
    code: '72150',
    subcontracting: 'Aetna Federal Plans',
    affiliates: ['American Foreign Service Protective Association', 'Aetna'],
    plans: ['High Option', 'Consumer Driven', 'Foreign Service Plan'],
    claimsAddress: 'PO Box 14079, Lexington, KY 40512',
    electronicPayer: 'ID: 72150 - FSBP Claims'
  }
];

interface InsuranceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export function InsuranceAutocomplete({ value, onChange }: InsuranceAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [results, setResults] = useState<typeof insuranceProviders>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter insurance providers based on search term
    const filtered = insuranceProviders.filter(provider =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.code.includes(searchTerm) ||
      provider.affiliates.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setResults(filtered);
  }, [searchTerm]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleSelectProvider = (provider: typeof insuranceProviders[0]) => {
    setSearchTerm(provider.name);
    onChange(provider.name);
    setIsOpen(false);
  };

  return (
    <div className="insurance-autocomplete" ref={wrapperRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Search insurance providers..."
        className="insurance-search-input"
      />
      {isOpen && results.length > 0 && (
        <div className="insurance-results">
          {results.map(provider => (
            <div
              key={provider.id}
              className="insurance-result-item"
              onClick={() => handleSelectProvider(provider)}
            >
              <div className="result-header">
                <span className="provider-name">{provider.name}</span>
                <span className="provider-code">#{provider.code}</span>
              </div>
              <div className="result-details">
                <div className="detail-row">
                  <span className="detail-label">Contract:</span>
                  <span className="detail-value">{provider.subcontracting}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Affiliates:</span>
                  <span className="detail-value">{provider.affiliates.join(', ')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Plans:</span>
                  <span className="detail-value">{provider.plans.join(', ')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Claims:</span>
                  <span className="detail-value">{provider.claimsAddress}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payer ID:</span>
                  <span className="detail-value">{provider.electronicPayer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 