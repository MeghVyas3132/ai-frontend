'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';

function EmployeeDashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Your interviews and upcoming tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">To submit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <p>No upcoming interviews at the moment</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/employee/interviews" className="block px-3 py-2 rounded hover:bg-muted">
              → My Interviews
            </a>
            <a href="/account/change-password" className="block px-3 py-2 rounded hover:bg-muted">
              → Change Password
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EmployeeDashboard() {
  return (
    <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN', 'HR']}>
      <AdminLayout>
        <EmployeeDashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
