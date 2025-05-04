import React, { useState } from 'react';
import { store } from '../utils/store';

type InsuranceType = 'primary' | 'secondary' | 'tertiary';

type InsuranceInfo = {
  type: InsuranceType;
  provider: string;
  policyNumber: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDateOfBirth: string;
  relationshipToPatient: string;
  effectiveDate: string;
  expirationDate?: string;
};

interface InsuranceProps {
  patientId: string;
}

export function Insurance({ patientId }: InsuranceProps) {
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>({
    type: 'primary',
    provider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
    subscriberDateOfBirth: '',
    relationshipToPatient: '',
    effectiveDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInsuranceInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    const existingInsurance = store.get('insurance') || [];
    store.set('insurance', [...existingInsurance, { ...insuranceInfo, patientId }]);
    // TODO: Add success notification
  };

  return (
    <form onSubmit={handleSubmit} className="insurance-form">
      <div className="form-group">
        <label>Insurance Type</label>
        <select 
          name="type" 
          value={insuranceInfo.type}
          onChange={handleChange}
          required
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="tertiary">Tertiary</option>
        </select>
      </div>

      <div className="form-group">
        <label>Insurance Provider</label>
        <input
          type="text"
          name="provider"
          value={insuranceInfo.provider}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Policy Number</label>
        <input
          type="text"
          name="policyNumber"
          value={insuranceInfo.policyNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Group Number</label>
        <input
          type="text"
          name="groupNumber"
          value={insuranceInfo.groupNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Subscriber Name</label>
        <input
          type="text"
          name="subscriberName"
          value={insuranceInfo.subscriberName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Subscriber Date of Birth</label>
        <input
          type="date"
          name="subscriberDateOfBirth"
          value={insuranceInfo.subscriberDateOfBirth}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Relationship to Patient</label>
        <input
          type="text"
          name="relationshipToPatient"
          value={insuranceInfo.relationshipToPatient}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Effective Date</label>
        <input
          type="date"
          name="effectiveDate"
          value={insuranceInfo.effectiveDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Expiration Date (Optional)</label>
        <input
          type="date"
          name="expirationDate"
          value={insuranceInfo.expirationDate || ''}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Insurance Information
      </button>
    </form>
  );
} 