import { ReactNode } from 'react';
import Link from 'next/link';
import PatientSearch from '../components/PatientSearch';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">Clinic EMR</h1>
            <nav className="flex space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link 
                href="/patients" 
                className="text-gray-700 hover:text-gray-900"
              >
                Patients
              </Link>
              <Link 
                href="/schedule" 
                className="text-gray-700 hover:text-gray-900"
              >
                Schedule
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <PatientSearch />
            <span className="text-gray-700">Dr. Smith</span>
            <button className="text-gray-700 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
} 