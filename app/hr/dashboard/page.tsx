'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useGetDashboardStats } from '@/hooks/use-candidates';
import { useListCandidates } from '@/hooks/use-candidates';
import { Skeleton } from '@/components/ui/skeleton';

function HRDashboardContent() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: recentCandidates, isLoading: candidatesLoading } = useListCandidates({
    skip: 0,
    limit: 5,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">HR Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Candidate pipeline and recruitment overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.total_candidates || 0}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Screening</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.candidates_by_status?.screening || 0}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.candidates_by_status?.interview || 0}</div>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          {candidatesLoading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <div className="space-y-2">
              {recentCandidates?.candidates?.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{c.first_name} {c.last_name}</p>
                    <p className="text-sm text-muted-foreground">{c.email}</p>
                  </div>
                  <span className="text-sm bg-muted px-2 py-1 rounded">{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function HRDashboard() {
  return (
    <ProtectedRoute allowedRoles={['HR', 'ADMIN']}>
      <AdminLayout>
        <HRDashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
