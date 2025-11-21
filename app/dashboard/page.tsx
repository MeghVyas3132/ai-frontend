'use client';

import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import EmployeeTable from "@/components/employees/EmployeeTable";
import CreateEmployeeDialog from "@/components/employees/CreateEmployeeDialog";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

function DashboardContent() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, {user?.name}! Here's what's happening today.
          </p>
        </div>
        {isAdmin && <CreateEmployeeDialog />}
      </div>

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Employees"
          value="247"
          icon={Users}
          trend={{ value: "12% from last month", positive: true }}
        />
        <MetricCard
          title="Active Users"
          value="198"
          icon={UserCheck}
          trend={{ value: "8% from last month", positive: true }}
        />
        <MetricCard
          title="Pending Requests"
          value="23"
          icon={UserX}
          trend={{ value: "3% from last month", positive: false }}
        />
        <MetricCard
          title="Growth Rate"
          value="32%"
          icon={TrendingUp}
          trend={{ value: "5% from last month", positive: true }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Table */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Employee Directory</h2>
              {!isAdmin && (
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
