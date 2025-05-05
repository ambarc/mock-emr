'use client';

import React, { useState, useEffect } from 'react';
import { store } from '../utils/store';

export default function StorePage() {
  const [storeData, setStoreData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data
    const data = store.getAll();
    setStoreData(JSON.stringify(data, null, 2));
  }, []);

  const handleSave = () => {
    try {
      const parsedData = JSON.parse(storeData);
      localStorage.setItem('emr_data', JSON.stringify(parsedData));
      setSaveStatus('✓ Saved successfully');
      setError(null);
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all store data? This cannot be undone.')) {
      store.clear();
      setStoreData(JSON.stringify(store.getAll(), null, 2));
      setSaveStatus('✓ Store cleared');
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(storeData);
      setStoreData(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="store-page">
      <div className="store-header">
        <h1>Store Inspector</h1>
        <div className="store-actions">
          <button 
            className="store-btn format-btn" 
            onClick={handleFormat}
          >
            Format JSON
          </button>
          <button 
            className="store-btn clear-btn" 
            onClick={handleClear}
          >
            Clear Store
          </button>
          <button 
            className="store-btn save-btn" 
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {saveStatus && <div className="success-message">{saveStatus}</div>}
      
      <div className="editor-container">
        <textarea
          value={storeData}
          onChange={(e) => {
            setStoreData(e.target.value);
            setError(null);
            setSaveStatus(null);
          }}
          spellCheck={false}
          className="json-editor"
        />
      </div>

      <div className="store-info">
        <h2>Store Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Store Key</label>
            <code>emr_data</code>
          </div>
          <div className="info-item">
            <label>Size</label>
            <code>{(new Blob([storeData]).size / 1024).toFixed(2)} KB</code>
          </div>
          <div className="info-item">
            <label>Last Modified</label>
            <code>{new Date().toLocaleString()}</code>
          </div>
        </div>
      </div>
    </div>
  );
} 