"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DriverTable from "../../components/ui/DriverTable";
import { useDrivers } from "@/hooks/useDrivers";
import SummaryCard from "@/app/components/ui/SummaryCard";

export default function DriversContent() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [driverStats, setDriverStats] = useState([]);
  const { drivers, loading, error, pagination, refetch } = useDrivers(
    currentPage,
    10,
  );

  // fetch data from the API and update the state
  const fetchDriversStatsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/drivers/stats");
      const result = await response.json();
      setDriverStats(result.data);
    } catch (error) {
      console.error("Error fetching driver stats data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is admin by verifying the token
    const checkAdminRole = async () => {
      try {
        const res = await fetch("/api/drivers?page=1&limit=1");

        if (res.status === 403) {
          // User is not authorized
          setIsAdmin(false);
          // Redirect to dashboard after a brief delay
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else if (res.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAdmin(false);
      }
    };

    checkAdminRole();
    fetchDriversStatsData();
  }, [router]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isAdmin === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="rounded-2xl bg-surface-container border border-red-500/30 p-6">
        <h2 className="text-lg font-semibold text-red-400 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-400">
          You don't have permission to access the drivers management page. Only
          admin users can view this page. Redirecting you back to the
          dashboard...
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Drivers Management
        </h1>
        <p className="text-gray-400">
          Manage all drivers in your fleet. View driver details, ratings, and
          status.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 ">
        {driverStats?.map((item, index) => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </div>
      <DriverTable
        drivers={drivers}
        total={pagination.total}
        pagination={true}
        isLoading={loading}
        refresh={refetch}
        currentPage={currentPage}
        totalPages={pagination.pages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
