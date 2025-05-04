import React, { useState, useEffect } from 'react';
import './Problems.css';
import { store } from '../utils/store';

interface Problem {
  id: string;
  name: string;
  icd10_code?: string;
  category?: string;
  description?: string;
  status?: 'Active' | 'Resolved' | 'Inactive';
  severity?: 'Mild' | 'Moderate' | 'Severe';
  dateRecorded?: string;
  dateResolved?: string;
  note?: string;
  score?: number;
}

interface SearchResponse {
  problems: Problem[];
  total: number;
  page: number;
  pageSize: number;
}

interface ProblemsProps {
  problems?: Problem[];
}

export function Problems({ problems: initialProblems }: ProblemsProps = {}) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load problems from store or props on mount
  useEffect(() => {
    const storedProblems = initialProblems || store.get('problems') || [];
    setProblems(storedProblems);
  }, [initialProblems]);

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
        
        const response = await fetch(`/api/problems/search?${params}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to search problems');
        }
        
        const data: SearchResponse = await response.json();
        setSearchResults(data.problems);
        setIsSearching(true);
      } catch (error) {
        console.error('Search error:', error);
        setError(error instanceof Error ? error.message : 'Failed to search problems');
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

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsSearching(false);
    setSearchTerm('');
  };

  const handleAddProblem = (problem: Problem) => {
    const updatedProblems = [...problems, problem];
    setProblems(updatedProblems);
    store.set('problems', updatedProblems);
    setSelectedProblem(null);
  };

  return (
    <div className="section-detail">
      <div className="detail-actions">
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search problems..." 
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
                <div className="no-results">No problems found</div>
              )}
              {searchResults.map((problem) => (
                <div 
                  key={problem.id} 
                  className="search-result-item"
                  onClick={() => handleProblemSelect(problem)}
                >
                  <div className="result-name">{problem.name}</div>
                  {problem.icd10_code && (
                    <div className="result-details">
                      ICD-10: {problem.icd10_code}
                    </div>
                  )}
                  {problem.category && (
                    <div className="result-category">{problem.category}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProblem && (
        <ProblemForm 
          problem={selectedProblem}
          onSubmit={handleAddProblem}
          onCancel={() => setSelectedProblem(null)}
        />
      )}

      <div className="detail-list">
        {problems.map((problem) => (
          <div key={problem.id} className="detail-item">
            <div className="detail-item-name">{problem.name}</div>
            <div className="detail-item-info">
              Status: {problem.status || 'Active'}
              {problem.icd10_code && ` · ICD-10: ${problem.icd10_code}`}
            </div>
            {problem.dateRecorded && (
              <div className="detail-item-info">
                Recorded: {problem.dateRecorded}
                {problem.status === 'Resolved' && problem.dateResolved && 
                  ` · Resolved: ${problem.dateResolved}`}
              </div>
            )}
            {problem.severity && (
              <div className="detail-item-info">Severity: {problem.severity}</div>
            )}
            {problem.note && (
              <div className="detail-item-info note">{problem.note}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemForm({ 
  problem, 
  onSubmit, 
  onCancel 
}: { 
  problem: Problem;
  onSubmit: (problem: Problem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Problem>({
    ...problem,
    status: 'Active',
    dateRecorded: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="problem-form" onSubmit={handleSubmit}>
      <h3>{problem.name}</h3>
      {problem.icd10_code && <div className="icd10-code">ICD-10: {problem.icd10_code}</div>}

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
            className={formData.status === 'Resolved' ? 'active' : ''}
            onClick={() => setFormData({...formData, status: 'Resolved'})}
          >
            Resolved
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
        <label>Severity</label>
        <select 
          value={formData.severity || 'Mild'}
          onChange={(e) => setFormData({...formData, severity: e.target.value as Problem['severity']})}
        >
          <option>Mild</option>
          <option>Moderate</option>
          <option>Severe</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date Recorded</label>
        <input 
          type="date"
          value={formData.dateRecorded || ''}
          onChange={(e) => setFormData({...formData, dateRecorded: e.target.value})}
        />
      </div>

      {formData.status === 'Resolved' && (
        <div className="form-group">
          <label>Date Resolved</label>
          <input 
            type="date"
            value={formData.dateResolved || ''}
            onChange={(e) => setFormData({...formData, dateResolved: e.target.value})}
          />
        </div>
      )}

      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={formData.note || ''}
          onChange={(e) => setFormData({...formData, note: e.target.value})}
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="form-actions">
        <button type="submit">Add Problem</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
} 