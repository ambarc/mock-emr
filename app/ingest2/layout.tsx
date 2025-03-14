import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Intake Review 2 | Clinic EMR',
  description: 'Review completed obesity intake survey - Version 2',
};

export default function IntakeSurveyLayout({
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