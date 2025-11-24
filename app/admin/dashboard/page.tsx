'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Server, Users, Building2, Clock } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useGetDashboardStats } from '@/hooks/use-candidates';
import { useListUsers } from '@/hooks/use-users';

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  isLoading = false,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className: string }>;
  description?: string;
  isLoading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function AdminDashboardContent() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useGetDashboardStats();
  const { data: usersData, isLoading: usersLoading, error: usersError } = useListUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">System overview and health status</p>
      </div>

      {(statsError || usersError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load dashboard data. Please try again.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Candidates"
          value={stats?.total_candidates || 0}
          icon={Users}
          description="Across all companies"
          isLoading={statsLoading}
        />
        <StatCard
          title="Applied"
          value={stats?.candidates_by_status?.applied || 0}
          icon={Clock}
          description="New applications"
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Users"
          value={usersData?.users?.length || 0}
          icon={Users}
          description="System users"
          isLoading={usersLoading}
        />
        <StatCard
          title="System Status"
          value="Healthy"
          icon={Server}
          description="All services running"
          isLoading={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Candidate Status Distribution</CardTitle>
            <CardDescription>Breakdown by recruitment stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats && Object.entries(stats.candidates_by_status || {}).length > 0 ? (
                Object.entries(stats.candidates_by_status || {}).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="capitalize">{status}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${((count as number) / (stats?.total_candidates || 1)) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No candidate data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Common admin actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/companies"
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                → Manage Companies
              </a>
              <a
                href="/admin/logs"
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                → View Audit Logs
              </a>
              <a
                href="/employees"
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                → Manage Users
              </a>
              <a
                href="/candidates"
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                → View Candidates
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminLayout>
        <AdminDashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
