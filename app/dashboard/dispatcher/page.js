import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/ui/Sidebar';

export default function DispatcherDashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto grid gap-0 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <Navbar />
          <div className="px-6 py-4">
            <section className="mb-6">
              <h1 className="text-3xl font-semibold text-on-surface">
                Dispatcher Dashboard
              </h1>
              <p className="mt-3 text-sm text-surface-muted">
                Manage active dispatches, coordinate driver assignments, and keep operations moving.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-on-surface">Current dispatch queue</h2>
                <p className="mt-3 text-sm text-surface-muted">
                  Review pending jobs and route the best drivers to each pickup.
                </p>
              </div>

              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-on-surface">Driver readiness</h2>
                <p className="mt-3 text-sm text-surface-muted">
                  Monitor available drivers, vehicle statuses, and ETA performance.
                </p>
              </div>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-xl font-semibold text-on-surface">Dispatch summary</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Pending requests', value: '22' },
                  { label: 'Vehicles available', value: '14' },
                  { label: 'Average response', value: '5m 12s' },
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
