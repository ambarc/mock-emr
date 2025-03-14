import { ReactNode } from 'react';
import IframeContent from '../components/IframeContent';

export default function IngestLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Patient Intake Review</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
              Save & Continue
            </button>
          </div>
        </div>
      </header>
      <IframeContent>
        {children}
      </IframeContent>
    </div>
  );
} 