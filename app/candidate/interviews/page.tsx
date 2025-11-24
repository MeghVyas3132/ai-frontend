'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import { useListInterviewRounds } from '@/hooks/use-interviews';

function CandidateInterviewsContent() {
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = useListInterviewRounds({ skip, limit: 10 });
  const interviews = data?.interview_rounds || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Interviews</h1>
        <p className="mt-1 text-muted-foreground">Your interview schedule and status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
          ) : interviews.length > 0 ? (
            <div className="space-y-3">
              {interviews.map((interview: any) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Interview Round {interview.round_number || 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(interview.scheduled_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge>{interview.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No interviews scheduled</p>
            </div>
          )}
        </CardContent>
      </Card>

      {data && data.total > 10 && (
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => setSkip(Math.max(0, skip - 10))} disabled={skip === 0}>
            Previous
          </Button>
          <span className="flex items-center px-4">Page {Math.floor(skip / 10) + 1}</span>
          <Button variant="outline" onClick={() => setSkip(skip + 10)} disabled={skip + 10 >= (data?.total || 0)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default function CandidateInterviews() {
  return (
    <ProtectedRoute allowedRoles={['CANDIDATE']}>
      <AdminLayout>
        <CandidateInterviewsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
