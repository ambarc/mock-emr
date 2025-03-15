import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basic Ingest Form | Clinic EMR',
  description: 'Basic obesity intake survey form with iframe integration',
};

export default function BasicIngestIframeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 