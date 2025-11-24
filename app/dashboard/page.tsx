'use client';

import { Users, TrendingUp, FileText, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import EmployeeTable from "@/components/employees/EmployeeTable";
import CreateEmployeeDialog from "@/components/employees/CreateEmployeeDialog";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { useGetDashboardStats } from "@/hooks/use-candidates";
import { toast } from "sonner";

function DashboardContent() {
  const { user } = useAuth();
  const { data: stats, isLoading, error } = useGetDashboardStats();
  const [displayStats, setDisplayStats] = useState({
    totalCandidates: 0,
    byStatus: {} as Record<string, number>,
    byDomain: {} as Record<string, number>,
    conversionRate: 0,
    pendingFeedback: 0,
  });

  useEffect(() => {
    if (stats) {
      setDisplayStats({
        totalCandidates: stats.total_candidates || 0,
        byStatus: stats.candidates_by_status || {},
        byDomain: stats.candidates_by_domain || {},
        conversionRate: stats.conversion_rate || 0,
        pendingFeedback: stats.pending_feedback || 0,
      });
    }
  }, [stats]);

  useEffect(() => {
    if (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  }, [error]);

  const isAdmin = user?.role === "ADMIN";
  const isHR = user?.role === "HR";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, {user?.name}! Here's your hiring overview.
          </p>
        </div>
        {(isAdmin || isHR) && <CreateEmployeeDialog />}
      </div>

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Candidates"
          value={displayStats.totalCandidates.toString()}
          icon={Users}
          isLoading={isLoading}
          trend={{ value: "Active pipeline", positive: true }}
        />
        <MetricCard
          title="Screening"
          value={(displayStats.byStatus?.screening || 0).toString()}
          icon={FileText}
          isLoading={isLoading}
          trend={{ value: "In progress", positive: true }}
        />
        <MetricCard
          title="Interviews"
          value={(displayStats.byStatus?.interview || 0).toString()}
          icon={Clock}
          isLoading={isLoading}
          trend={{ value: "Scheduled", positive: true }}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${displayStats.conversionRate?.toFixed(1) || 0}%`}
          icon={TrendingUp}
          isLoading={isLoading}
          trend={{ value: "Applied → Hired", positive: displayStats.conversionRate > 50 }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Table */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Employee Directory</h2>
              {!isAdmin && !isHR && (
                <span className="text-sm text-muted-foreground">View only</span>
              )}
            </div>
            <EmployeeTable />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <DashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
