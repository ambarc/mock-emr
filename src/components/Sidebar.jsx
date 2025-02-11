import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'demographics', label: 'Demographics' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'notes', label: 'Clinical Notes' },
    { id: 'problems', label: 'Problems' },
    { id: 'medications', label: 'Medications' },
    { id: 'surgicalHistory', label: 'Surgical History' },
    { id: 'substanceHistory', label: 'Substance History' },
    { id: 'workHistory', label: 'Work History' },
    { id: 'weightHistory', label: 'Weight History' },
    { id: 'exerciseHistory', label: 'Exercise History' },
    { id: 'sleepHistory', label: 'Sleep History' },
    { id: 'foodPreferences', label: 'Food Preferences' },
  ];

  return (
    <div className="w-64 border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
      {menuItems.map(item => (
        <div
          key={item.id}
          onClick={() => navigate(`${location.pathname}?section=${item.id}`)}
          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default Sidebar; 