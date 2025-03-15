import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Clinic EMR',
  description: 'Doctor dashboard for Clinic EMR system',
};

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Patients</h2>
            <div className="space-y-4">
              {/* Patient cards will be populated here */}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Reminders</h2>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
                3 patients need insurance pre-authorization
              </div>
              <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
                5 lab results pending review
              </div>
            </div>
          </section>
        </div>

        {/* Today's Schedule Section */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Today&apos;s Schedule</h2>
            <div className="space-y-3">
              {/* Appointments will be populated here */}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-700">Patients Today</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-700">Success Rate</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 