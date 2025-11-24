'use client';

import React, { useState } from 'react';
import { Plus, Upload, Mail, Loader2, AlertCircle, Edit, Trash2, Eye } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  useListCandidates,
  useBulkImportFile,
  useCreateCandidate,
  useUpdateCandidate,
  useDeleteCandidate,
  useGetCandidate,
} from '@/hooks/use-candidates';
import { useAuth } from '@/contexts/AuthContext';
import { Candidate, CandidateStatus } from '@/services/candidates.service';


const statusColors: Record<CandidateStatus, string> = {
  applied: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-yellow-100 text-yellow-800',
  interviewed: 'bg-cyan-100 text-cyan-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-emerald-100 text-emerald-800',
};

interface EditCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
}

function EditCandidateDialog({ open, onOpenChange, candidateId }: EditCandidateDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    domain: '',
  });

  const { data: candidate, isLoading: isLoadingCandidate } = useGetCandidate(open ? candidateId : undefined);
  const { mutate: updateCandidate, isPending } = useUpdateCandidate(candidateId);

  React.useEffect(() => {
    if (candidate) {
      setFormData({
        email: candidate.email,
        first_name: candidate.first_name,
        last_name: candidate.last_name,
        phone: candidate.phone || '',
        domain: candidate.domain || '',
      });
    }
  }, [candidate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidate(formData, {
      onSuccess: () => {
        toast.success('Candidate updated successfully');
        onOpenChange(false);
      },
      onError: () => {
        toast.error('Failed to update candidate');
      },
    });
  };

  if (isLoadingCandidate) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">First Name *</label>
            <Input
              required
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              placeholder="John"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name *</label>
            <Input
              required
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              placeholder="Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email *</label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Domain</label>
            <Input
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="Backend / Frontend / DevOps"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Candidate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  candidateName: string;
}

function DeleteCandidateDialog({
  open,
  onOpenChange,
  candidateId,
  candidateName,
}: DeleteCandidateDialogProps) {
  const { mutate: deleteCandidate, isPending } = useDeleteCandidate(candidateId);

  const handleDelete = () => {
    deleteCandidate(undefined, {
      onSuccess: () => {
        toast.success('Candidate deleted successfully');
        onOpenChange(false);
      },
      onError: () => {
        toast.error('Failed to delete candidate');
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Candidate</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {candidateName}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CreateCandidateDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    domain: '',
  });

  const { mutate: createCandidate, isPending } = useCreateCandidate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCandidate(formData, {
      onSuccess: () => {
        toast.success('Candidate created successfully');
        setFormData({ email: '', first_name: '', last_name: '', phone: '', domain: '' });
        setOpen(false);
      },
      onError: () => {
        toast.error('Failed to create candidate');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">First Name *</label>
            <Input
              required
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              placeholder="John"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name *</label>
            <Input
              required
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              placeholder="Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email *</label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Domain</label>
            <Input
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="Backend / Frontend / DevOps"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Candidate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BulkImportDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: bulkImport, isPending } = useBulkImportFile();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(file.type)) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    bulkImport({ file, params: { send_invitations: true } }, {
      onSuccess: (data) => {
        toast.success(`Bulk import started. Job ID: ${data.job_id}`);
        setOpen(false);
      },
      onError: () => {
        toast.error('Failed to upload file');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Import Candidates</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-border p-6">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              disabled={isPending}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="flex flex-col items-center gap-2 cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Click to select or drag and drop</p>
              <p className="text-xs text-muted-foreground">CSV, Excel (.xlsx, .xls) • Max 10MB</p>
            </label>
          </div>
          {isPending && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CandidatesTable() {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | ''>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<{ id: string; name: string } | null>(null);
  const { data, isLoading, error } = useListCandidates({
    skip,
    limit: 20,
    status: statusFilter as CandidateStatus | undefined,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load candidates. Please try again.</AlertDescription>
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

  const candidates = data?.candidates || [];
  const filteredCandidates = candidates.filter(
    (c: Candidate) =>
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as CandidateStatus | '');
            setSkip(0);
          }}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interviewed">Interviewed</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates && filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate: Candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">
                    {candidate.first_name} {candidate.last_name}
                  </TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.domain || '-'}</TableCell>
                  <TableCell>
                    <Badge>{candidate.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(candidate.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(candidate.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setDeletingId({
                            id: candidate.id,
                            name: `${candidate.first_name} ${candidate.last_name}`,
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No candidates found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data && data.total > 20 && (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => setSkip(Math.max(0, skip - 20))}
            disabled={skip === 0}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {Math.floor(skip / 20) + 1} of {Math.ceil(data.total / 20)}
          </span>
          <Button
            variant="outline"
            onClick={() => setSkip(skip + 20)}
            disabled={skip + 20 >= data.total}
          >
            Next
          </Button>
        </div>
      )}

      {editingId && (
        <EditCandidateDialog
          open={!!editingId}
          onOpenChange={(open) => {
            if (!open) setEditingId(null);
          }}
          candidateId={editingId}
        />
      )}

      {deletingId && (
        <DeleteCandidateDialog
          open={!!deletingId}
          onOpenChange={(open) => {
            if (!open) setDeletingId(null);
          }}
          candidateId={deletingId.id}
          candidateName={deletingId.name}
        />
      )}
    </div>
  );
}

function CandidatesContent() {
  const { user } = useAuth();
  const isHR = user?.role === 'HR' || user?.role === 'ADMIN';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
          <p className="mt-1 text-muted-foreground">
            Browse and manage candidate applications
          </p>
        </div>
        {isHR && (
          <div className="flex gap-2">
            <BulkImportDialog />
            <CreateCandidateDialog />
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidates Database</CardTitle>
        </CardHeader>
        <CardContent>
          <CandidatesTable />
        </CardContent>
      </Card>
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