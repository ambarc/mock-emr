import React from 'react';

interface Allergy {
  name: string;
  severity?: string;
  reaction?: string;
}

interface AllergiesDetailProps {
  allergies: Allergy[];
}

export function AllergiesDetail({ allergies }: AllergiesDetailProps) {
  return (
    <div className="section-detail">
      <div className="detail-actions">
        <button className="detail-action-btn">
          <i className="fa fa-plus"></i> Add Allergy
        </button>
      </div>
      <div className="detail-list">
        {allergies.map((allergy, index) => (
          <div key={index} className="detail-item">
            <div className="detail-item-name">{allergy.name}</div>
            {allergy.severity && (
              <div className="detail-item-info">Severity: {allergy.severity}</div>
            )}
            {allergy.reaction && (
              <div className="detail-item-info">Reaction: {allergy.reaction}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 