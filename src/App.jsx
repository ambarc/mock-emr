import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PatientSearch from './components/PatientSearch';
import PatientChart from './components/PatientChart';
import Dashboard from './components/Dashboard';
import { PatientProvider } from './context/PatientContext';

function Header() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-8">
        <h1 className="text-xl font-semibold">Clinic EMR</h1>
        <nav className="flex space-x-4">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
          <a href="/schedule" className="text-gray-600 hover:text-gray-900">Schedule</a>
          <a href="/messages" className="text-gray-600 hover:text-gray-900">Messages</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Dr. Smith</span>
        <button className="text-gray-600 hover:text-gray-900">Logout</button>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to Clinic EMR</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              placeholder="doctor@clinic.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <a 
              href="/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <PatientProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard/*"
              element={
                <>
                  <Header />
                  <PatientSearch />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/patient/:id"
              element={
                <>
                  <Header />
                  <PatientSearch />
                  <div className="flex">
                    <Sidebar />
                    <PatientChart />
                  </div>
                </>
              }
            />
            {/* Catch all other routes and redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </PatientProvider>
  );
}

export default App; 