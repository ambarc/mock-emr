import React from 'react';

export const PatientInfo: React.FC = () => {
  return (
    <div className="patient-info-sections">
      <div className="info-column">
        <section className="info-section">
          <h2><i className="fa fa-exclamation-triangle section-icon"></i> Allergies</h2>
          <div className="section-content">
            <div className="item">
              <span className="item-name">Penicillins</span>
            </div>
            <div className="item">
              <span className="item-name">Sulfur dioxide</span>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2><i className="fa fa-exclamation-circle section-icon"></i> Problems</h2>
          <div className="section-content">
            <div className="item">
              <span className="item-name">Diabetes mellitus</span>
            </div>
          </div>
        </section>
      </div>

      <div className="info-column">
        <section className="info-section">
          <h2><i className="fa fa-medkit section-icon"></i> Medications</h2>
          <div className="section-content">
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Flaxseed</span>
              <span className="item-details">Take 1 tablet every day</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Hydroxychloroquine 200mg tablet</span>
              <span className="item-details">Take 1 tablet every day by oral route</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Lisinopril 10mg tablet</span>
              <span className="item-details">Take 1 tablet every day by oral route</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Metformin 500mg tablet</span>
              <span className="item-details">Take 1 tablet every day by oral route</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Rosuvastatin 20mg tablet</span>
              <span className="item-details">Take 1 tablet every day by oral route</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Tylenol</span>
              <span className="item-details">Take as needed</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Vitamin D3</span>
              <span className="item-details">Take 1 tablet every day</span>
            </div>
            <div className="item">
              <div className="med-indicator"></div>
              <span className="item-name">Wegovy 2.4 mg/0.75mL pen injector</span>
              <span className="item-details">Inject every week by subcutaneous route</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 