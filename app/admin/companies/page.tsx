'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useCreateCompany } from '@/hooks/use-company';

interface CompanyFormData {
  name: string;
  domain: string;
  website?: string;
  industry?: string;
}

function CreateCompanyDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    domain: '',
    website: '',
    industry: '',
  });

  const { mutate: createCompany, isPending } = useCreateCompany();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCompany(formData, {
      onSuccess: () => {
        toast.success('Company created successfully');
        setFormData({ name: '', domain: '', website: '', industry: '' });
        setOpen(false);
      },
      onError: () => {
        toast.error('Failed to create company');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Company
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Company</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Company Name *</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Acme Corporation"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Domain *</label>
            <Input
              required
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="acme.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Website</label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://acme.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Industry</label>
            <Input
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Technology"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Company
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CompaniesTable() {
  const [search, setSearch] = useState('');
  // Note: Backend should provide /companies endpoint for listing
  // For now, show placeholder
  const companies: any[] = [];
  const isLoading = false;
  const error = null;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load companies. Please try again.</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const filteredCompanies = companies.filter(
    (c: any) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Search</label>
        <Input
          placeholder="Search by company name or domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company: any) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.domain}</TableCell>
                  <TableCell>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{company.industry || '-'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(company.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CompaniesContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Companies</h1>
          <p className="mt-1 text-muted-foreground">Manage all companies in the system</p>
        </div>
        <CreateCompanyDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Companies List</CardTitle>
        </CardHeader>
        <CardContent>
          <CompaniesTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminLayout>
        <CompaniesContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
