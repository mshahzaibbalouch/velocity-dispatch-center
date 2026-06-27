import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';

export default function DriverDashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto grid gap-0 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <Navbar />
          <div className="px-6 py-4">
            <section className="mb-6">
              <h1 className="text-3xl font-semibold text-on-surface">Driver Dashboard</h1>
              <p className="mt-3 text-sm text-surface-muted">
                See your assigned routes, live dispatch status, and upcoming pickups.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-on-surface">My active rides</h2>
                <p className="mt-3 text-sm text-surface-muted">
                  Track your current assignments and estimated arrival times.
                </p>
              </div>

              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-on-surface">Availability</h2>
                <p className="mt-3 text-sm text-surface-muted">
                  Update your status and see if any immediate dispatches are waiting.
                </p>
              </div>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-xl font-semibold text-on-surface">Performance summary</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Completed trips', value: '128' },
                  { label: 'On-time rate', value: '96%' },
                  { label: 'Next pickup', value: '12 min' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-surface-container p-4">
                    <p className="text-sm text-surface-muted">{stat.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-on-surface">{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
