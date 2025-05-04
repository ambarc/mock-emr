import React from 'react';

interface SidePanelProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const SidePanel: React.FC<SidePanelProps> = ({ isOpen, title, onClose, children }) => {
  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="side-panel-header">
        <div className="panel-title">
          <h2>{title}</h2>
          {title === 'Medications' && <span className="count">(10 new)</span>}
          {title === 'Medications' && (
            <button className="historical-btn">
              HISTORICAL (4 new)
            </button>
          )}
        </div>
        <div className="panel-actions">
          {title === 'Medications' && (
            <>
              <button className="action-btn">
                <i className="fa fa-plus"></i>
              </button>
              <button className="action-btn">
                <i className="fa fa-cog"></i>
              </button>
            </>
          )}
          <button className="action-btn" onClick={onClose}>
            <i className="fa fa-chevron-left"></i>
          </button>
        </div>
      </div>
      <div className="side-panel-content">
        {children}
      </div>
    </div>
  );
}; 