import './globals.css';
import { EMRHeader } from './components/EMRHeader';
import { EMRSidebar } from './components/EMRSidebar';

export const metadata = {
  title: 'Mock EMR System',
  description: 'A mock Electronic Medical Record system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <div className="emr-layout">
          <EMRHeader 
            patientName="Connor JONES"
            patientId="#3316"
            dob="05-18-1992"
          />
          <EMRSidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
