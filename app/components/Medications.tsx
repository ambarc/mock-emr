import React from 'react';

export function Medications() {
  const medications = [
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
  ];

  return (
    <div className="medications-list">
      <div className="list-header">
        <div className="search-bar">
          <input type="text" placeholder="Search medications..." />
        </div>
        <div className="list-options">
          <span>View medications from other sources</span>
          <span>Arrange by: Name</span>
        </div>
      </div>
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