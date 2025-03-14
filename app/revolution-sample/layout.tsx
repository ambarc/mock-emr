import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revolution Sample Form | Clinic EMR',
  description: 'Sample obesity intake survey form for Revolution Medicine',
};

export default function RevolutionSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
} 