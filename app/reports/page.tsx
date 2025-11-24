'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useGetFunnelAnalytics, useGetTimeToHireMetrics } from '@/hooks/use-candidates';
import { Skeleton } from '@/components/ui/skeleton';

function ReportsContent() {
  const { data: funnel, isLoading: funnelLoading } = useGetFunnelAnalytics();
  const { data: timeToHire, isLoading: timeLoading } = useGetTimeToHireMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="mt-1 text-muted-foreground">Recruitment funnel and hiring metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnelLoading ? (
              <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            ) : (
            <div className="space-y-3">
                {funnel?.funnel_stages && funnel.funnel_stages.length > 0 ? (
                  funnel.funnel_stages.map((stage: any) => (
                  <div key={stage.stage} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{stage.stage}</span>
                      <span className="font-medium">{stage.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${Math.min(100, stage.percentage)}%` }} />
                    </div>
                  </div>
                ))
                ) : (
                  <p className="text-muted-foreground">No funnel data available</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time to Hire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeLoading ? (
              <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Average Days</span>
                  <span className="font-bold text-lg">{Math.round(timeToHire?.average_days_to_hire || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Median Days</span>
                  <span>{Math.round(timeToHire?.median_days_to_hire || 0)} days</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          {funnelLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Conversion metrics will be displayed here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <ProtectedRoute allowedRoles={['HR', 'ADMIN']}>
      <AdminLayout>
        <ReportsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
