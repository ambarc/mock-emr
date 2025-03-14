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
        </div>
      </header>
      <IframeContent>
        {children}
      </IframeContent>
    </div>
  );
} 