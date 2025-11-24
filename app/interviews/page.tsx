'use client';

import React, { useState } from 'react';
import { Plus, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useListInterviewRounds, useCreateInterviewRound, useGetUpcomingRounds } from '@/hooks/use-interviews';
import { useListCandidates } from '@/hooks/use-candidates';
import { useListUsers } from '@/hooks/use-users';
import { useAuth } from '@/contexts/AuthContext';
import { InterviewRound, InterviewStatus } from '@/services/interviews.service';

const statusColors: Record<InterviewStatus, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RESCHEDULED: 'bg-purple-100 text-purple-800',
};

function ScheduleInterviewDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidate_id: '',
    interviewer_id: '',
    round_type: 'SCREENING' as const,
    scheduled_at: '',
    timezone: 'UTC',
    duration_minutes: 60,
    notes: '',
  });

  const { data: candidates } = useListCandidates({ limit: 100 });
  const { data: users } = useListUsers({ limit: 100 });
  const { mutate: createInterview, isPending } = useCreateInterviewRound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.candidate_id || !formData.interviewer_id || !formData.scheduled_at) {
      toast.error('Please fill in all required fields');
      return;
    }

    createInterview(formData, {
      onSuccess: () => {
        toast.success('Interview scheduled successfully');
        setFormData({
          candidate_id: '',
          interviewer_id: '',
          round_type: 'SCREENING',
          scheduled_at: '',
          timezone: 'UTC',
          duration_minutes: 60,
          notes: '',
        });
        setOpen(false);
      },
      onError: () => {
        toast.error('Failed to schedule interview');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Interview</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Candidate *</label>
            <select
              required
              value={formData.candidate_id}
              onChange={(e) => setFormData({ ...formData, candidate_id: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select candidate...</option>
              {candidates?.candidates?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.first_name} {c.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Interviewer *</label>
            <select
              required
              value={formData.interviewer_id}
              onChange={(e) => setFormData({ ...formData, interviewer_id: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select interviewer...</option>
              {users?.users?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Round Type *</label>
            <select
              value={formData.round_type}
              onChange={(e) => setFormData({ ...formData, round_type: e.target.value as any })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="SCREENING">Screening</option>
              <option value="TECHNICAL">Technical</option>
              <option value="BEHAVIORAL">Behavioral</option>
              <option value="FINAL">Final</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Scheduled Date & Time *</label>
            <Input
              required
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Timezone</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="UTC">UTC</option>
              <option value="US/Eastern">US/Eastern</option>
              <option value="US/Central">US/Central</option>
              <option value="US/Mountain">US/Mountain</option>
              <option value="US/Pacific">US/Pacific</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="Asia/Shanghai">Asia/Shanghai</option>
              <option value="Asia/Singapore">Asia/Singapore</option>
              <option value="India/Kolkata">India/Kolkata</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Duration (minutes)</label>
            <Input
              type="number"
              min="15"
              max="240"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional interview notes..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Scheduling...' : 'Schedule Interview'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function InterviewsTable() {
  const [skip, setSkip] = useState(0);
  const [statusFilter, setStatusFilter] = useState<InterviewStatus | ''>('');
  const { data, isLoading, error } = useListInterviewRounds({
    skip,
    limit: 20,
    status: statusFilter as InterviewStatus | undefined,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load interviews. Please try again.</AlertDescription>
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

  return (
    <div className="space-y-4">
      <div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as InterviewStatus | '');
            setSkip(0);
          }}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Round Type</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.interview_rounds && data.interview_rounds.length > 0 ? (
              data.interview_rounds.map((interview: InterviewRound) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">{interview.candidate_id}</TableCell>
                  <TableCell>{interview.round_type}</TableCell>
                  <TableCell>
                    {new Date(interview.scheduled_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[interview.status]}>
                      {interview.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{interview.duration_minutes}m</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No interviews scheduled
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
    </div>
  );
}

function InterviewsContent() {
  const { user } = useAuth();
  const { data: upcomingData, isLoading: upcomingLoading } = useGetUpcomingRounds({ days_ahead: 7 });
  const isHR = user?.role === 'HR' || user?.role === 'ADMIN';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Scheduling</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and schedule candidate interviews
          </p>
        </div>
        {isHR && <ScheduleInterviewDialog />}
      </div>

      {/* Upcoming Interviews Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Interviews (Next 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : upcomingData?.upcoming_rounds && upcomingData.upcoming_rounds.length > 0 ? (
            <div className="space-y-2">
              {upcomingData.upcoming_rounds.map((interview: InterviewRound) => (
                <div key={interview.id} className="flex items-center justify-between p-2 border border-border rounded">
                  <div>
                    <p className="font-medium">{interview.round_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(interview.scheduled_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge>{interview.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No upcoming interviews</p>
          )}
        </CardContent>
      </Card>

      {/* All Interviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <InterviewsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Interviews() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <InterviewsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
