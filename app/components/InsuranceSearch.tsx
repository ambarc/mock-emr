'use client';

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { InsurancePlan, dcMetroInsurancePlans } from '../lib/insuranceData';

interface InsuranceSearchProps {
  onSelect: (plan: InsurancePlan) => void;
  selectedPlanType: 'standard' | 'case';
}

export interface InsuranceSearchHandle {
  handleSearch: () => void;
}

const InsuranceSearch = forwardRef<InsuranceSearchHandle, InsuranceSearchProps>(
  ({ onSelect, selectedPlanType }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<InsurancePlan[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [hasSearched, setHasSearched] = useState(false);
    const [insuranceAddress, setInsuranceAddress] = useState('');
    const [insurancePhone, setInsurancePhone] = useState('');
    const [noMatchChecked, setNoMatchChecked] = useState(false);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const [searchResults, setSearchResults] = useState<InsurancePlan[]>([]);
    const [sortBy, setSortBy] = useState<'best' | 'recent'>('best');

    useImperativeHandle(ref, () => ({
      handleSearch: () => {
        setHasSearched(true);
        setShowSuggestions(false);
        // Filter plans based on search term and plan type
        const results = dcMetroInsurancePlans
          .filter(plan => 
            plan.type === selectedPlanType &&
            plan.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        setSearchResults(results);
      }
    }));

    useEffect(() => {
      if (searchTerm.length >= 2) {
        const filteredPlans = dcMetroInsurancePlans
          .filter(plan => 
            plan.type === selectedPlanType &&
            plan.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 10);
        setSuggestions(filteredPlans);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, [searchTerm, selectedPlanType]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !focusedIndex) {
        e.preventDefault();
        setHasSearched(true);
        setShowSuggestions(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        handleSelect(suggestions[focusedIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    const handleSelect = (plan: InsurancePlan) => {
      setSearchTerm(plan.name);
      setShowSuggestions(false);
      onSelect(plan);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
            placeholder="Insurance names"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {suggestions.map((plan, index) => (
                <div
                  key={plan.id}
                  onClick={() => handleSelect(plan)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`px-4 py-2 cursor-pointer ${
                    index === focusedIndex
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-sm text-gray-500">
                    {plan.network ? `${plan.state} • ${plan.network}` : plan.state}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {hasSearched && (
          <div className="mt-8 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-medium text-gray-700">Sort by:</h4>
                <div className="flex items-center space-x-4">
                  <button 
                    className={`text-sm ${sortBy === 'best' ? 'text-gray-900 font-medium' : 'text-blue-600 hover:text-blue-800'}`}
                    onClick={() => setSortBy('best')}
                  >
                    Best match
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    className={`text-sm ${sortBy === 'recent' ? 'text-gray-900 font-medium' : 'text-blue-600 hover:text-blue-800'}`}
                    onClick={() => setSortBy('recent')}
                  >
                    Recently used
                  </button>
                </div>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((plan) => (
                    <div key={plan.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="text-base font-medium text-gray-900">{plan.name}</h4>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Affiliations:</span>{' '}
                              {plan.affiliations?.join(', ') || 'None'}
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Payer ID:</span>{' '}
                              <span className="inline-flex items-center">
                                {plan.payerId}
                                <button className="ml-1 text-blue-600 hover:text-blue-800">
                                  <span className="text-sm">ⓘ</span>
                                </button>
                              </span>
                            </div>
                            {plan.address && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Addresses:</span>{' '}
                                {plan.address}
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => onSelect(plan)}
                          className="px-4 py-1.5 bg-indigo-700 text-white text-sm font-medium rounded hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="py-4 text-center text-gray-700">
                    No results found. Please adjust search filters.
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={noMatchChecked}
                        onChange={(e) => setNoMatchChecked(e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        I've entered all available information and can't find a match
                      </span>
                    </label>
                    {noMatchChecked && (
                      <button className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                        Request New Insurance Package
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

InsuranceSearch.displayName = 'InsuranceSearch';

export default InsuranceSearch; 