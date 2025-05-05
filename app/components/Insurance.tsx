import React, { useState, useRef } from 'react';
import { InsuranceAutocomplete } from './InsuranceAutocomplete';
import { store } from '../utils/store';

interface InsuranceProps {
  patientId: string;
  onSave?: () => void;
}

interface FormError {
  provider?: string;
  policyNumber?: string;
}

export function Insurance({ patientId, onSave }: InsuranceProps) {
  const [formData, setFormData] = useState({
    type: 'Primary',
    provider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
    subscriberDOB: '',
    relationship: '',
    effectiveDate: '',
    expirationDate: '',
    cardFront: null as File | null,
    cardBack: null as File | null
  });

  const [errors, setErrors] = useState<FormError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is modified
    if (errors[field as keyof FormError]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleFileChange = (side: 'front' | 'back') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [side === 'front' ? 'cardFront' : 'cardBack']: file
      }));
    }
  };

  const handleUploadClick = (side: 'front' | 'back') => {
    if (side === 'front' && frontInputRef.current) {
      frontInputRef.current.click();
    } else if (side === 'back' && backInputRef.current) {
      backInputRef.current.click();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    if (!formData.provider.trim()) {
      newErrors.provider = 'Insurance provider is required';
    }
    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = 'Member ID/Policy Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert File objects to base64 strings if they exist
      const cardFrontBase64 = formData.cardFront ? await fileToBase64(formData.cardFront) : null;
      const cardBackBase64 = formData.cardBack ? await fileToBase64(formData.cardBack) : null;

      store.addInsurance(patientId || 'default', {
        type: formData.type,
        provider: formData.provider,
        policyNumber: formData.policyNumber,
        groupNumber: formData.groupNumber,
        subscriberName: formData.subscriberName,
        subscriberDOB: formData.subscriberDOB,
        relationship: formData.relationship,
        effectiveDate: formData.effectiveDate,
        expirationDate: formData.expirationDate,
        cardFront: cardFrontBase64,
        cardBack: cardBackBase64
      });

      // Reset form after successful submission
      setFormData({
        type: 'Primary',
        provider: '',
        policyNumber: '',
        groupNumber: '',
        subscriberName: '',
        subscriberDOB: '',
        relationship: '',
        effectiveDate: '',
        expirationDate: '',
        cardFront: null,
        cardBack: null
      });
      setErrors({});
      
      // Call onSave callback if provided
      onSave?.();
    } catch (error) {
      console.error('Error saving insurance information:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <form className="insurance-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Insurance Type</label>
        <select 
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Tertiary">Tertiary</option>
        </select>
      </div>

      <div className="form-group">
        <label>Insurance Provider*</label>
        <InsuranceAutocomplete
          value={formData.provider}
          onChange={(value) => handleChange('provider', value)}
        />
        {errors.provider && <div className="error-message">{errors.provider}</div>}
      </div>

      <div className="form-group">
        <label>Member ID/Policy Number*</label>
        <input
          type="text"
          value={formData.policyNumber}
          onChange={(e) => handleChange('policyNumber', e.target.value)}
        />
        {errors.policyNumber && <div className="error-message">{errors.policyNumber}</div>}
      </div>

      <div className="form-group">
        <label>Group Number</label>
        <input
          type="text"
          value={formData.groupNumber}
          onChange={(e) => handleChange('groupNumber', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Subscriber Name</label>
        <input
          type="text"
          value={formData.subscriberName}
          onChange={(e) => handleChange('subscriberName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Subscriber Date of Birth</label>
        <input
          type="date"
          value={formData.subscriberDOB}
          onChange={(e) => handleChange('subscriberDOB', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Relationship to Patient</label>
        <select
          value={formData.relationship}
          onChange={(e) => handleChange('relationship', e.target.value)}
        >
          <option value="">Select relationship...</option>
          <option value="Self">Self</option>
          <option value="Spouse">Spouse</option>
          <option value="Child">Child</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Effective Date</label>
        <input
          type="date"
          value={formData.effectiveDate}
          onChange={(e) => handleChange('effectiveDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Expiration Date (Optional)</label>
        <input
          type="date"
          value={formData.expirationDate}
          onChange={(e) => handleChange('expirationDate', e.target.value)}
        />
      </div>

      <div className="insurance-card-upload">
        <label className="upload-label">Insurance Card Images</label>
        <div className="upload-container">
          <div className="upload-side">
            <input
              type="file"
              ref={frontInputRef}
              onChange={handleFileChange('front')}
              accept="image/*"
              className="file-input"
              hidden
            />
            <button
              type="button"
              className="upload-btn"
              onClick={() => handleUploadClick('front')}
            >
              <i className="fa fa-upload"></i>
              {formData.cardFront ? 'Change Front Image' : 'Upload Front of Card'}
            </button>
            {formData.cardFront && (
              <div className="file-name">{formData.cardFront.name}</div>
            )}
          </div>
          <div className="upload-side">
            <input
              type="file"
              ref={backInputRef}
              onChange={handleFileChange('back')}
              accept="image/*"
              className="file-input"
              hidden
            />
            <button
              type="button"
              className="upload-btn"
              onClick={() => handleUploadClick('back')}
            >
              <i className="fa fa-upload"></i>
              {formData.cardBack ? 'Change Back Image' : 'Upload Back of Card'}
            </button>
            {formData.cardBack && (
              <div className="file-name">{formData.cardBack.name}</div>
            )}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Insurance Information'}
      </button>
    </form>
  );
} 