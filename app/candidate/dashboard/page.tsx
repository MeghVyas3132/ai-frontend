'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';

function CandidateDashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Your interview status and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="/candidate/interviews" className="block px-3 py-2 rounded hover:bg-muted">
            → My Interviews
          </a>
          <a href="/account/change-password" className="block px-3 py-2 rounded hover:bg-muted">
            → Change Password
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CandidateDashboard() {
  return (
    <ProtectedRoute allowedRoles={['CANDIDATE']}>
      <AdminLayout>
        <CandidateDashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
