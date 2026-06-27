"use client";

import {
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  User,
  Navigation2,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

const BookingStatusTimeline = ({ booking }) => {
  const statusSteps = [
    { status: "pending", label: "Pending", icon: Clock, color: "text-yellow-400" },
    { status: "confirmed", label: "Confirmed", icon: CheckCircle, color: "text-blue-400" },
    { status: "driver_assigned", label: "Driver Assigned", icon: Truck, color: "text-purple-400" },
    { status: "driver_arrived", label: "Arrived", icon: MapPin, color: "text-indigo-400" },
    { status: "picked_up", label: "Picked Up", icon: User, color: "text-cyan-400" },
    { status: "in_transit", label: "In Transit", icon: Navigation2, color: "text-orange-400" },
    { status: "completed", label: "Completed", icon: CheckCircle2, color: "text-emerald-400" },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((step) => step.status === booking.status);
  };

  const currentStep = getCurrentStepIndex();

  const getStatusIcon = (status) => {
    if (status === "cancelled") return XCircle;
    if (status === "dropped_out" || status === "no_show") return AlertCircle;
    const step = statusSteps.find((s) => s.status === status);
    return step ? step.icon : Clock;
  };

  const getStatusColor = (status) => {
    if (status === "cancelled") return "text-red-400";
    if (status === "dropped_out" || status === "no_show") return "text-red-400";
    const step = statusSteps.find((s) => s.status === status);
    return step ? step.color : "text-gray-400";
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Booking Timeline</h3>

      {/* Main Status Display */}
      <div className="mb-6 flex items-center gap-3">
        {(() => {
          const Icon = getStatusIcon(booking.status);
          const color = getStatusColor(booking.status);
          return (
            <>
              <Icon size={24} className={color} />
              <div>
                <p className="text-xs text-gray-500">Current Status</p>
                <p className="text-white font-semibold capitalize">
                  {booking.status?.replace(/_/g, " ")}
                </p>
              </div>
            </>
          );
        })()}
      </div>

      {/* Timeline for Normal Statuses */}
      {!["cancelled", "dropped_out", "no_show"].includes(booking.status) && (
        <div className="space-y-0">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.status} className="relative flex">
                {/* Timeline Line */}
                {index < statusSteps.length - 1 && (
                  <div
                    className={`absolute left-4 top-10 w-0.5 h-8 ${
                      isCompleted ? "bg-amber-500" : "bg-white/10"
                    }`}
                  />
                )}

                {/* Step Circle and Content */}
                <div className="relative flex-1 pl-12 pb-6">
                  <div
                    className={`absolute left-0 top-0.5 flex items-center justify-center h-9 w-9 rounded-full border-2 ${
                      isCurrent
                        ? "border-amber-500 bg-amber-500/20"
                        : isCompleted
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-white/10 bg-white/5"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isCurrent || isCompleted ? step.color : "text-gray-500"}
                    />
                  </div>

                  <p className={`font-medium ${isCurrent || isCompleted ? "text-white" : "text-gray-500"}`}>
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alternative Status Display */}
      {["cancelled", "dropped_out", "no_show"].includes(booking.status) && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">
            This booking is marked as{" "}
            <span className="font-semibold capitalize">
              {booking.status?.replace(/_/g, " ")}
            </span>
            {booking.cancellationReason && (
              <>
                <br />
                <span className="text-xs text-red-300">
                  Reason: {booking.cancellationReason}
                </span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Additional Info */}
      {booking.pickupTime && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
          {booking.pickupTime && (
            <div className="flex justify-between">
              <span className="text-gray-500">Pickup Time:</span>
              <span className="text-white">
                {new Date(booking.pickupTime).toLocaleTimeString()}
              </span>
            </div>
          )}
          {booking.dropoffTime && (
            <div className="flex justify-between">
              <span className="text-gray-500">Dropoff Time:</span>
              <span className="text-white">
                {new Date(booking.dropoffTime).toLocaleTimeString()}
              </span>
            </div>
          )}
          {booking.actualDuration && (
            <div className="flex justify-between">
              <span className="text-gray-500">Actual Duration:</span>
              <span className="text-white">{booking.actualDuration} minutes</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingStatusTimeline;
