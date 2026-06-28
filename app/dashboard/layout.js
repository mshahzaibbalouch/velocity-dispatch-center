import { statCards } from "@/data/cards";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import Card from "../components/Card";
import Footer from "../components/ui/Footer";

export const metadata = {
  title: "Velocity Dispatch Center",
  description: "A high-performance taxi dispatch dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen max-w-full bg-surface text-on-surface">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="min-w-0">
          <Navbar />
          <div className="px-4 sm:px-6 py-4">
            <section>{children}</section>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
