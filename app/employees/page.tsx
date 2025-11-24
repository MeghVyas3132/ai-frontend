'use client';

import EmployeeTable from "@/components/employees/EmployeeTable";
import CreateEmployeeDialog from "@/components/employees/CreateEmployeeDialog";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

function EmployeesContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your team members, roles, and permissions
          </p>
        </div>
        <CreateEmployeeDialog />
      </div>

      {/* Employee Table */}
      <div className="rounded-lg border border-border bg-card p-6">
        <EmployeeTable />
      </div>
    </div>
  );
}

export default function Employees() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminLayout>
        <EmployeesContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
