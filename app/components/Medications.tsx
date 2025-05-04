import React, { useState, useEffect } from 'react';
import './Medications.css';
import { Medication, SearchResponse } from '../api/medications/types';

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
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Medication[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<MedicationOption | null>(null);
  const [dosageForms, setDosageForms] = useState<string[]>([]);
  const [selectedDosageForm, setSelectedDosageForm] = useState<string>();
  const [loading, setLoading] = useState(false);

  // Fetch dosage forms on mount
  useEffect(() => {
    fetch('/api/medications', { method: 'OPTIONS' })
      .then(res => res.json())
      .then(data => setDosageForms(data.dosageForms))
      .catch(console.error);
  }, []);

  // Debounced search function
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: searchTerm,
          ...(selectedDosageForm && { dosageForm: selectedDosageForm })
        });
        
        const response = await fetch(`/api/medications?${params}`);
        const data: SearchResponse = await response.json();
        setSearchResults(data.medications);
        setIsSearching(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedDosageForm]);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication({
      name: medication.brand_name || medication.generic_name,
      strength: medication.active_ingredients[0]?.strength,
      form: medication.dosage_form,
      route: 'by oral route' // Default, should be determined by dosage form
    });
    setIsSearching(false);
    setSearchTerm('');
  };

  const handleAddMedication = (formData: MedicationFormData) => {
    const newMedication: Medication = {
      product_ndc: Date.now().toString(), // Temporary NDC for new medications
      generic_name: formData.medication.name,
      brand_name: formData.medication.name,
      active_ingredients: [{
        name: formData.medication.name,
        strength: formData.medication.strength || ''
      }],
      dosage_form: formData.medication.form || '',
      labeler_name: '',
      finished: true,
      packaging: [],
      listing_expiration_date: '',
      marketing_category: '',
      spl_id: ''
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
            {loading && <div className="search-spinner" />}
          </div>
          
          {isSearching && searchTerm && (
            <div className="search-results">
              {searchResults.map((med, index) => (
                <div 
                  key={med.product_ndc} 
                  className="search-result-item"
                  onClick={() => handleMedicationSelect(med)}
                >
                  <strong>{med.brand_name || med.generic_name}</strong>
                  {med.active_ingredients.map(ing => ing.strength).join(', ')} {med.dosage_form}
                </div>
              ))}
              {searchResults.length === 0 && !loading && (
                <div className="no-results">No medications found</div>
              )}
            </div>
          )}
        </div>

        <div className="list-options">
          <span>View medications from other sources</span>
          <span>
            Arrange by: Name
            <select 
              value={selectedDosageForm} 
              onChange={(e) => setSelectedDosageForm(e.target.value || undefined)}
            >
              <option value="">All Forms</option>
              {dosageForms.map(form => (
                <option key={form} value={form}>{form}</option>
              ))}
            </select>
          </span>
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
          <div key={med.product_ndc} className={`medication-item ${med.finished ? 'active' : ''}`}>
            <div className="med-name">
              {med.finished && <span className="med-dot"></span>}
              {med.brand_name || med.generic_name}
            </div>
            <div className="med-details">
              Take {med.active_ingredients.map(ing => ing.strength).join(', ')} {med.dosage_form}
            </div>
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