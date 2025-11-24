'use client';

import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useChangePassword, useGetCurrentUser } from '@/hooks/use-users';
import { useAuth } from '@/contexts/AuthContext';

function ChangePasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { user } = useAuth();
  const userId = user?.id;
  const { mutate: changePassword } = useChangePassword(userId || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    changePassword(
      {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
      },
      {
        onSuccess: () => {
          toast.success('Password changed successfully');
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        },
        onError: (err: any) => {
          const errorMessage =
            err.response?.data?.message || err.message || 'Failed to change password';
          setError(errorMessage);
          toast.error(errorMessage);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and security</p>
      </div>

      <div className="max-w-md">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm font-medium text-foreground">
                  Current Password
                </label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium text-foreground">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ChangePasswordContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
