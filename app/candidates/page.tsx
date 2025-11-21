'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

function CandidatesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
        <p className="mt-1 text-muted-foreground">
          Browse and manage candidate applications
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-card">
        <div className="text-center">
          <h3 className="text-lg font-medium">Candidates Section</h3>
          <p className="mt-2 text-muted-foreground">
            This section is under development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Candidates() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CandidatesContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}