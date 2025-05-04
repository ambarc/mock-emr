import React from 'react';

interface Problem {
  name: string;
  status?: string;
  dateRecorded?: string;
}

interface ProblemsDetailProps {
  problems: Problem[];
}

export function ProblemsDetail({ problems }: ProblemsDetailProps) {
  return (
    <div className="section-detail">
      <div className="detail-actions">
        <button className="detail-action-btn">
          <i className="fa fa-plus"></i> Add Problem!
        </button>
      </div>
      <div className="detail-list">
        {problems.map((problem, index) => (
          <div key={index} className="detail-item">
            <div className="detail-item-name">{problem.name}</div>
            {problem.status && (
              <div className="detail-item-info">Status: {problem.status}</div>
            )}
            {problem.dateRecorded && (
              <div className="detail-item-info">Recorded: {problem.dateRecorded}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 