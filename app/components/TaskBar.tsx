import React from 'react';

export const TaskBar: React.FC = () => {
  return (
    <div className="task-bar">
      <div className="task-bar-left">
        <select className="task-select">
          <option>TeamHealth</option>
        </select>
      </div>
      <div className="task-bar-center">
        <button className="task-btn">
          <i className="fa fa-file-text-o"></i>
        </button>
        <button className="task-btn">
          <i className="fa fa-calendar"></i>
        </button>
        <div className="task-count">0</div>
        <div className="task-count">0</div>
        <div className="task-label">0 tasks</div>
      </div>
      <div className="task-bar-right">
        <button className="task-btn">
          <i className="fa fa-exclamation-circle"></i>
          <span className="notification-badge">1</span>
        </button>
      </div>
    </div>
  );
}; 