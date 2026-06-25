import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto grid gap-0 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <Navbar />
          <div className="px-6 py-4">
            <section className="grid gap-6 lg:grid-cols-2">
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-on-surface">Live Dispatch</h2>
                <p className="mt-3 text-sm text-surface-muted">
                  Monitor active trips, assign drivers, and view route performance in real time.
                </p>
              </div>

              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-on-surface">Recent activity</h2>
                <p className="mt-3 text-sm text-surface-muted">
                  Check recent ride requests, vehicle status, and estimated arrival times.
                </p>
              </div>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-xl font-semibold text-on-surface">Dispatch summary</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Pending requests', value: '22' },
                  { label: 'Drivers on duty', value: '18' },
                  { label: 'Average ETA', value: '4m 22s' },
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
