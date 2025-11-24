'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  useGetInterviewRound,
  useStartInterview,
  useCompleteInterview,
  useCreateScore,
  useGetScore,
} from '@/hooks/use-interviews';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function InterviewDetailContent() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.id as string;

  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [scoreData, setScoreData] = useState({
    communication: 50,
    technical: 50,
    behaviour: 50,
    evaluator_notes: '',
  });

  const { data: interview, isLoading: interviewLoading, error: interviewError } = useGetInterviewRound(interviewId);
  const { data: score, isLoading: scoreLoading } = useGetScore(isStarted ? interviewId : undefined);
  const { mutate: startInterview, isPending: startPending } = useStartInterview(interviewId);
  const { mutate: completeInterview, isPending: completePending } = useCompleteInterview(interviewId);
  const { mutate: createScore, isPending: scorePending } = useCreateScore();

  // Timer effect
  React.useEffect(() => {
    if (!isStarted || !interview) return;

    const durationMs = (interview.duration_minutes || 60) * 60 * 1000;
    const startTime = new Date().getTime();

    const interval = setInterval(() => {
      const elapsed = new Date().getTime() - startTime;
      const remaining = Math.max(0, durationMs - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, interview]);

  const handleStart = () => {
    startInterview(undefined, {
      onSuccess: () => {
        setIsStarted(true);
        toast.success('Interview started!');
      },
      onError: () => {
        toast.error('Failed to start interview');
      },
    });
  };

  const handleEnd = () => {
    completeInterview(undefined, {
      onSuccess: () => {
        setShowScoreForm(true);
        toast.success('Interview completed. Please submit scores.');
      },
      onError: () => {
        toast.error('Failed to complete interview');
      },
    });
  };

  const handleSubmitScore = () => {
    if (!interviewId) return;

    createScore(
      {
        interview_id: interviewId,
        communication: scoreData.communication,
        technical: scoreData.technical,
        behaviour: scoreData.behaviour,
        evaluator_notes: scoreData.evaluator_notes,
      },
      {
        onSuccess: () => {
          toast.success('Score submitted successfully!');
          setTimeout(() => router.push('/employee/interviews'), 1500);
        },
        onError: () => {
          toast.error('Failed to submit score');
        },
      }
    );
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (interviewLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (interviewError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load interview details. Please try again.</AlertDescription>
      </Alert>
    );
  }

  if (!interview) {
    return (
      <Alert>
        <AlertDescription>Interview not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Details</h1>
          <p className="mt-1 text-muted-foreground">{interview.round_type} Round</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Scheduled</div>
          <div className="text-lg font-semibold">
            {new Date(interview.scheduled_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interview Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Round Type</Label>
                  <p className="font-medium">{interview.round_type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium">{interview.status}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Duration</Label>
                  <p className="font-medium">{interview.duration_minutes} minutes</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Timezone</Label>
                  <p className="font-medium">{interview.timezone}</p>
                </div>
              </div>
              {interview.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="text-sm">{interview.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interview Controls */}
          {!isStarted && interview.status === 'SCHEDULED' && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleStart}
                  disabled={startPending}
                  className="w-full"
                  size="lg"
                >
                  {startPending ? 'Starting...' : 'Start Interview'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Interview in Progress */}
          {isStarted && interview.status === 'IN_PROGRESS' && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-900">Interview in Progress</CardTitle>
                  <div className="flex items-center gap-2 text-yellow-900">
                    <Clock className="h-5 w-5" />
                    <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add interview notes here..."
                  className="min-h-24"
                />
                <Button
                  onClick={handleEnd}
                  disabled={completePending}
                  className="w-full"
                  size="lg"
                  variant="destructive"
                >
                  {completePending ? 'Completing...' : 'End Interview'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Score Form */}
          {showScoreForm && !scoreLoading && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Candidate Evaluation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Communication Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Communication (0-100)</Label>
                    <span className="font-semibold">{scoreData.communication}</span>
                  </div>
                  <Slider
                    value={[scoreData.communication]}
                    onValueChange={(val) =>
                      setScoreData({ ...scoreData, communication: val[0] })
                    }
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Technical Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Technical Skills (0-100)</Label>
                    <span className="font-semibold">{scoreData.technical}</span>
                  </div>
                  <Slider
                    value={[scoreData.technical]}
                    onValueChange={(val) =>
                      setScoreData({ ...scoreData, technical: val[0] })
                    }
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Behaviour Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Behaviour/Culture Fit (0-100)</Label>
                    <span className="font-semibold">{scoreData.behaviour}</span>
                  </div>
                  <Slider
                    value={[scoreData.behaviour]}
                    onValueChange={(val) =>
                      setScoreData({ ...scoreData, behaviour: val[0] })
                    }
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Evaluator Notes */}
                <div>
                  <Label htmlFor="notes">Evaluator Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional comments about the candidate..."
                    value={scoreData.evaluator_notes}
                    onChange={(e) =>
                      setScoreData({ ...scoreData, evaluator_notes: e.target.value })
                    }
                    className="min-h-24"
                  />
                </div>

                <Button
                  onClick={handleSubmitScore}
                  disabled={scorePending}
                  className="w-full"
                  size="lg"
                >
                  {scorePending ? 'Submitting...' : 'Submit Evaluation'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Current Status</Label>
                <p className="font-medium capitalize">{interview.status.toLowerCase().replace('_', ' ')}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Duration</Label>
                <p className="font-medium">{interview.duration_minutes} minutes</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p className="font-medium text-sm">
                  {new Date(interview.created_at).toLocaleDateString()}
                </p>
              </div>
              {score && (
                <div className="pt-4 border-t">
                  <Label className="text-muted-foreground">Evaluation Score</Label>
                  <p className="font-bold text-lg">
                    {Math.round((scoreData.communication + scoreData.technical + scoreData.behaviour) / 3)}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function InterviewDetail() {
  return (
    <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN', 'HR']}>
      <AdminLayout>
        <InterviewDetailContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
