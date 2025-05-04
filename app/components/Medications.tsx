import React, { useState, useEffect, useRef } from 'react';
import './Medications.css';
import { store } from '../utils/store';

interface ActiveIngredient {
  name: string;
  strength: string;
}

interface Medication {
  id: string;
  generic_name: string;
  brand_name: string;
  active_ingredients: ActiveIngredient[];
  dosage_form: string;
  labeler_name: string;
  product_ndc: string;
  score: number;
  dosage?: string;
  frequency?: string;
  route?: string;
  duration?: string;
  startDate?: string;
  status?: 'Active' | 'Historical';
  note?: string;
}

interface SearchResponse {
  medications: Medication[];
  total: number;
  page: number;
  pageSize: number;
}

// Helper function to format medication display
function formatMedicationDisplay(medication: Medication): string {
  const strength = medication.active_ingredients.map(ing => ing.strength).join(', ');
  return `${medication.brand_name || medication.generic_name} ${strength} ${medication.dosage_form}`;
}

export function Medications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Medication[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load medications from store on mount
  useEffect(() => {
    const storedMeds = store.get('medications');
    setMedications(storedMeds);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search function
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: searchTerm,
        });
        
        const response = await fetch(`/api/medications/search?${params}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to search medications');
        }
        
        const data: SearchResponse = await response.json();
        setSearchResults(data.medications);
      } catch (error) {
        console.error('Search error:', error);
        setError(error instanceof Error ? error.message : 'Failed to search medications');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);
  };

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication(medication);
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleAddMedication = (medication: Medication) => {
    // Add to local state and store
    const updatedMeds = [...medications, medication];
    setMedications(updatedMeds);
    store.set('medications', updatedMeds);
    setSelectedMedication(null);
  };

  return (
    <div className="medications-list">
      <div className="list-header">
        <div className="search-container" ref={searchRef}>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search medications..." 
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearching(true)}
            />
            {loading && <div className="search-spinner" />}
          </div>
          
          {isSearching && (
            <div className="search-results">
              {error && (
                <div className="search-error">{error}</div>
              )}
              {!error && searchResults.length === 0 && !loading && searchTerm && (
                <div className="no-results">No medications found</div>
              )}
              {searchResults.map((med) => (
                <div 
                  key={med.id} 
                  className="search-result-item"
                  onClick={() => handleMedicationSelect(med)}
                >
                  <div className="result-name">{med.brand_name || med.generic_name}</div>
                  <div className="result-details">
                    {med.active_ingredients.map(ing => ing.strength).join(', ')} · {med.dosage_form}
                  </div>
                  <div className="result-manufacturer">{med.labeler_name}</div>
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
        {medications.map((med) => (
          <div key={med.id} className="medication-item active">
            <div className="med-name">
              <span className="med-dot"></span>
              {formatMedicationDisplay(med)}
            </div>
            <div className="med-details">
              {med.labeler_name}
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
  medication: Medication;
  onSubmit: (medication: Medication) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Medication>({
    ...medication,
    dosage: '1',
    frequency: 'every day',
    route: 'by oral route',
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="medication-form" onSubmit={handleSubmit}>
      <h3>{formatMedicationDisplay(medication)}</h3>
      
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
        <button type="submit">Add Medication</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
} 