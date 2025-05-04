import React, { useState } from 'react';
import './Medications.css';

interface Medication {
  name: string;
  details: string;
  isActive: boolean;
  note?: string;
}

interface MedicationOption {
  name: string;
  strength?: string;
  form?: string;
  route?: string;
}

interface MedicationFormData {
  medication: MedicationOption;
  dosage: string;
  frequency: string;
  route: string;
  duration?: string;
  startDate?: string;
  status: 'Active' | 'Historical';
  note?: string;
}

export function Medications() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      name: 'flaxseed',
      details: 'Take 1 tablet every day',
      isActive: false,
      note: 'This medication cannot be associated with an active order type and can no longer be accelerated'
    },
    {
      name: 'hydroxychloroquine 200 mg tablet',
      details: 'Take 1 tablet every day by oral route.',
      isActive: true
    },
    {
      name: 'lisinopriL 10 mg tablet',
      details: 'Take 1 tablet every day by oral route.',
      isActive: true
  },
    {
      name: 'losartan 25 mg tablet',
      details: 'Take 1 tablet every day by oral route.',
      isActive: true
    },
    {
      name: 'metFORMIN 500 mg tablet',
      details: 'Take 1 tablet every day by oral route.',
      isActive: true
    },
    {
      name: 'multivitamin',
      details: 'Take 1 tablet every day',
      isActive: false,
      note: 'This medication cannot be associated with an active order type and can no longer be accelerated'
    },
    {
      name: 'rosuvastatin 20 mg tablet',
      details: 'Take 1 tablet every day by oral route.',
      isActive: true
    },
    {
      name: 'TylenoL',
      details: 'Take as needed',
      isActive: false,
      note: 'This medication cannot be associated with an active order type and can no longer be accelerated'
    },
    {
      name: 'Vitamin D3',
      details: 'Take 1 tablet every day',
      isActive: false,
      note: 'This medication cannot be associated with an active order type and can no longer be accelerated'
    },
    {
      name: 'Wegovy 2.4 mg/0.75 mL subcutaneous pen injector',
      details: 'Inject every week by subcutaneous route.',
      isActive: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<MedicationOption | null>(null);
  
  // Mock medication search results - in real app, this would come from an API
  const searchResults: MedicationOption[] = [
    { name: 'losartan', strength: '25 mg', form: 'tablet', route: 'oral' },
    { name: 'losartan', strength: '50 mg', form: 'tablet', route: 'oral' },
    { name: 'losartan', strength: '100 mg', form: 'tablet', route: 'oral' },
    { name: 'losartan', strength: '10 mg/mL', form: 'oral suspension', route: 'oral' },
  ].filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleMedicationSelect = (medication: MedicationOption) => {
    setSelectedMedication(medication);
    setIsSearching(false);
    setSearchTerm('');
  };

  const handleAddMedication = (formData: MedicationFormData) => {
    const newMedication: Medication = {
      name: `${formData.medication.name} ${formData.medication.strength}`,
      details: `Take ${formData.dosage} ${formData.frequency} ${formData.route}`,
      isActive: formData.status === 'Active',
      note: formData.note
    };
    
    setMedications([...medications, newMedication]);
    setSelectedMedication(null);
  };

  return (
    <div className="medications-list">
      <div className="list-header">
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search medications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
            />
          </div>
          
          {isSearching && searchTerm && (
            <div className="search-results">
              {searchResults.map((med, index) => (
                <div 
                  key={index} 
                  className="search-result-item"
                  onClick={() => handleMedicationSelect(med)}
                >
                  <strong>{med.name}</strong> {med.strength} {med.form}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="list-options">
          <span>View medications from other sources</span>
          <span>Arrange by: Name</span>
        </div>
      </div>

      {selectedMedication && (
        <MedicationForm 
          medication={selectedMedication}
          onSubmit={handleAddMedication}
          onCancel={() => setSelectedMedication(null)}
        />
      )}

      <div className="medications">
        {medications.map((med, index) => (
          <div key={index} className={`medication-item ${med.isActive ? 'active' : ''}`}>
            <div className="med-name">
              {med.isActive && <span className="med-dot"></span>}
              {med.name}
            </div>
            {med.note && <div className="med-note">{med.note}</div>}
            <div className="med-details">{med.details}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicationForm({ 
  medication, 
  onSubmit, 
  onCancel 
}: { 
  medication: MedicationOption;
  onSubmit: (data: MedicationFormData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<MedicationFormData>({
    medication,
    dosage: '1',
    frequency: 'every day',
    route: medication.route || 'by oral route',
    status: 'Active'
  });

  return (
    <div className="medication-form">
      <h3>{medication.name.toUpperCase()} {medication.strength}</h3>
      
      <div className="form-group">
        <label>
          <input 
            type="checkbox" 
            checked={true} 
            readOnly 
          /> Structured
        </label>
      </div>

      <div className="form-group inline-inputs">
        <label>Take</label>
        <input 
          type="number" 
          value={formData.dosage}
          onChange={(e) => setFormData({...formData, dosage: e.target.value})}
          min="1"
        />
        <select>
          <option>tablet(s)</option>
        </select>
      </div>

      <div className="form-group">
        <select 
          value={formData.frequency}
          onChange={(e) => setFormData({...formData, frequency: e.target.value})}
        >
          <option>every day</option>
          <option>twice daily</option>
          <option>as needed</option>
        </select>
      </div>

      <div className="form-group">
        <select 
          value={formData.route}
          onChange={(e) => setFormData({...formData, route: e.target.value})}
        >
          <option>by oral route</option>
          <option>by subcutaneous route</option>
        </select>
      </div>

      <div className="form-group inline-inputs">
        <label>for</label>
        <input 
          type="number" 
          value={formData.duration || ''}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
          min="1"
        />
        <span>day(s)</span>
      </div>

      <div className="form-group">
        <label>Start date</label>
        <div className="date-input-container">
          <input 
            type="date"
            value={formData.startDate || ''}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Status</label>
        <div className="status-buttons">
          <button 
            className={formData.status === 'Active' ? 'active' : ''}
            onClick={() => setFormData({...formData, status: 'Active'})}
            type="button"
          >
            Active
          </button>
          <button 
            className={formData.status === 'Historical' ? 'active' : ''}
            onClick={() => setFormData({...formData, status: 'Historical'})}
            type="button"
          >
            Historical
          </button>
        </div>
      </div>

      <div className="form-actions">
        <button onClick={() => onSubmit(formData)}>Add</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
} 