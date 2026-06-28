import Navbar from "@/app/components/ui/Navbar";
import Sidebar from "@/app/components/ui/Sidebar";
import Footer from "@/app/components/ui/Footer";

export const metadata = {
  title: "Support — Velocity Dispatch",
};

export default function SupportLayout({ children }) {
  return (
    <div className="min-h-screen max-w-full bg-surface text-on-surface">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="min-w-0">
          <Navbar />
          <div className="px-4 sm:px-6 py-4">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
