import React, { useState, useEffect } from 'react';
import './Allergies.css';
import { store } from '../utils/store';

interface Allergy {
  id: string;
  name: string;
  type?: 'Drug' | 'Food' | 'Environmental';
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction: string;
  dateIdentified?: string;
  status?: 'Active' | 'Inactive';
  notes?: string;
  score?: number;
}

interface SearchResponse {
  allergies: Allergy[];
  total: number;
  page: number;
  pageSize: number;
}

interface AllergiesProps {
  allergies?: Allergy[];
}

export function Allergies({ allergies: initialAllergies }: AllergiesProps = {}) {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Allergy[]>([]);
  const [selectedAllergy, setSelectedAllergy] = useState<Allergy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load allergies from store or props on mount
  useEffect(() => {
    const storedAllergies = initialAllergies || store.get('allergies') || [];
    setAllergies(storedAllergies);
  }, [initialAllergies]);

  // Debounced search function
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: searchTerm,
        });
        
        const response = await fetch(`/api/allergies/search?${params}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to search allergies');
        }
        
        const data: SearchResponse = await response.json();
        setSearchResults(data.allergies);
        setIsSearching(true);
      } catch (error) {
        console.error('Search error:', error);
        setError(error instanceof Error ? error.message : 'Failed to search allergies');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleAllergySelect = (allergy: Allergy) => {
    setSelectedAllergy(allergy);
    setIsSearching(false);
    setSearchTerm('');
  };

  const handleAddAllergy = (allergy: Allergy) => {
    const updatedAllergies = [...allergies, allergy];
    setAllergies(updatedAllergies);
    store.set('allergies', updatedAllergies);
    setSelectedAllergy(null);
  };

  return (
    <div className="section-detail">
      <div className="detail-actions">
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search allergies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
            />
            {loading && <div className="search-spinner" />}
          </div>
          
          {isSearching && searchTerm && (
            <div className="search-results">
              {error && (
                <div className="search-error">{error}</div>
              )}
              {!error && searchResults.length === 0 && !loading && (
                <div className="no-results">No allergies found</div>
              )}
              {searchResults.map((allergy) => (
                <div 
                  key={allergy.id} 
                  className="search-result-item"
                  onClick={() => handleAllergySelect(allergy)}
                >
                  <div className="result-name">{allergy.name}</div>
                  {allergy.type && (
                    <div className="result-details">
                      Type: {allergy.type}
                    </div>
                  )}
                  {allergy.reaction && (
                    <div className="result-category">{allergy.reaction}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedAllergy && (
        <AllergyForm 
          allergy={selectedAllergy}
          onSubmit={handleAddAllergy}
          onCancel={() => setSelectedAllergy(null)}
        />
      )}

      <div className="detail-list">
        {allergies.map((allergy) => (
          <div key={allergy.id} className="detail-item">
            <div className="detail-item-name">{allergy.name}</div>
            <div className="detail-item-info">
              Severity: {allergy.severity}
              {allergy.type && ` · Type: ${allergy.type}`}
            </div>
            {allergy.reaction && (
              <div className="detail-item-info">
                Reaction: {allergy.reaction}
              </div>
            )}
            {allergy.dateIdentified && (
              <div className="detail-item-info">
                Identified: {allergy.dateIdentified}
              </div>
            )}
            {allergy.notes && (
              <div className="detail-item-info note">{allergy.notes}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AllergyForm({ 
  allergy, 
  onSubmit, 
  onCancel 
}: { 
  allergy: Allergy;
  onSubmit: (allergy: Allergy) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Allergy>({
    ...allergy,
    status: 'Active',
    dateIdentified: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="allergy-form" onSubmit={handleSubmit}>
      <h3>{allergy.name}</h3>
      {allergy.type && <div className="allergy-type">Type: {allergy.type}</div>}

      <div className="form-group">
        <label>Severity</label>
        <select 
          value={formData.severity}
          onChange={(e) => setFormData({...formData, severity: e.target.value as Allergy['severity']})}
        >
          <option>Mild</option>
          <option>Moderate</option>
          <option>Severe</option>
        </select>
      </div>

      <div className="form-group">
        <label>Reaction</label>
        <input 
          type="text"
          value={formData.reaction}
          onChange={(e) => setFormData({...formData, reaction: e.target.value})}
          placeholder="Describe the allergic reaction..."
        />
      </div>

      <div className="form-group">
        <label>Date Identified</label>
        <input 
          type="date"
          value={formData.dateIdentified || ''}
          onChange={(e) => setFormData({...formData, dateIdentified: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <div className="status-buttons">
          <button 
            type="button"
            className={formData.status === 'Active' ? 'active' : ''}
            onClick={() => setFormData({...formData, status: 'Active'})}
          >
            Active
          </button>
          <button 
            type="button"
            className={formData.status === 'Inactive' ? 'active' : ''}
            onClick={() => setFormData({...formData, status: 'Inactive'})}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="form-actions">
        <button type="submit">Add Allergy</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
} 