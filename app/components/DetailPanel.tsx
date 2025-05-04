import React from 'react';

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function DetailPanel({ isOpen, onClose, title, children }: DetailPanelProps) {
  console.log('DetailPanel rendering:', { isOpen, title });
  
  React.useEffect(() => {
    console.log('DetailPanel mounted/updated:', { isOpen, title });
  }, [isOpen, title]);

  return (
    <div 
      className={`detail-panel ${isOpen ? 'open' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="detail-panel-header">
        <div className="panel-title">
          <h2>{title}</h2>
        </div>
        <div className="panel-actions">
          <button 
            className="action-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className="detail-panel-content">
        {children}
      </div>
    </div>
  );
} 