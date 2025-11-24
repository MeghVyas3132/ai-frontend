import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import interviewsService, {
  InterviewRound,
  CreateInterviewRoundRequest,
  BatchScheduleRoundsRequest,
  UpdateInterviewRoundRequest,
  RescheduleInterviewRequest,
  CancelInterviewRequest,
  CompleteInterviewRequest,
  ListInterviewsResponse,
  CandidateRoundProgress,
  InterviewerSchedule,
  UpcomingRounds,
  Score,
  CreateScoreRequest,
  InterviewStatus,
} from '@/services/interviews.service';
import { AxiosError } from 'axios';

const INTERVIEWS_QUERY_KEY = ['interviews'];
const INTERVIEW_QUERY_KEY = (id: string) => ['interviews', id];
const CANDIDATE_PROGRESS_KEY = (id: string) => ['candidate-progress', id];
const INTERVIEWER_SCHEDULE_KEY = (id: string) => ['interviewer-schedule', id];
const UPCOMING_ROUNDS_KEY = ['upcoming-rounds'];
const SCORES_KEY = ['scores'];
const SCORE_QUERY_KEY = (id: string) => ['scores', id];

export const useListInterviewRounds = (params?: {
  skip?: number;
  limit?: number;
  status?: InterviewStatus;
  candidate_id?: string;
}) => {
  return useQuery<ListInterviewsResponse, AxiosError>({
    queryKey: [...INTERVIEWS_QUERY_KEY, params],
    queryFn: () => interviewsService.listInterviewRounds(params),
  });
};

export const useGetInterviewRound = (interviewId: string | undefined) => {
  return useQuery<InterviewRound, AxiosError>({
    queryKey: INTERVIEW_QUERY_KEY(interviewId || ''),
    queryFn: () => interviewsService.getInterviewRound(interviewId!),
    enabled: !!interviewId,
  });
};

export const useCreateInterviewRound = () => {
  const queryClient = useQueryClient();
  return useMutation<InterviewRound, AxiosError, CreateInterviewRoundRequest>({
    mutationFn: (data) => interviewsService.createInterviewRound(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UPCOMING_ROUNDS_KEY });
    },
  });
};

export const useBatchScheduleRounds = () => {
  const queryClient = useQueryClient();
  return useMutation<{ rounds: InterviewRound[]; message: string }, AxiosError, BatchScheduleRoundsRequest>({
    mutationFn: (data) => interviewsService.batchScheduleRounds(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UPCOMING_ROUNDS_KEY });
    },
  });
};

export const useUpdateInterviewRound = (interviewId: string) => {
  const queryClient = useQueryClient();
  return useMutation<InterviewRound, AxiosError, UpdateInterviewRoundRequest>({
    mutationFn: (data) => interviewsService.updateInterviewRound(interviewId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(INTERVIEW_QUERY_KEY(interviewId), data);
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
    },
  });
};

export const useRescheduleInterview = (interviewId: string) => {
  const queryClient = useQueryClient();
  return useMutation<InterviewRound, AxiosError, RescheduleInterviewRequest>({
    mutationFn: (data) => interviewsService.rescheduleInterview(interviewId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(INTERVIEW_QUERY_KEY(interviewId), data);
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UPCOMING_ROUNDS_KEY });
    },
  });
};

export const useCancelInterview = (interviewId: string) => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, AxiosError, CancelInterviewRequest>({
    mutationFn: (data) => interviewsService.cancelInterview(interviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTERVIEW_QUERY_KEY(interviewId) });
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UPCOMING_ROUNDS_KEY });
    },
  });
};

export const useStartInterview = (interviewId: string) => {
  const queryClient = useQueryClient();
  return useMutation<InterviewRound, AxiosError>({
    mutationFn: () => interviewsService.startInterview(interviewId),
    onSuccess: (data) => {
      queryClient.setQueryData(INTERVIEW_QUERY_KEY(interviewId), data);
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
    },
  });
};

export const useCompleteInterview = (interviewId: string) => {
  const queryClient = useQueryClient();
  return useMutation<InterviewRound, AxiosError, CompleteInterviewRequest>({
    mutationFn: (data) => interviewsService.completeInterview(interviewId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(INTERVIEW_QUERY_KEY(interviewId), data);
      queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UPCOMING_ROUNDS_KEY });
    },
  });
};

export const useGetCandidateRoundProgress = (candidateId: string | undefined) => {
  return useQuery<CandidateRoundProgress, AxiosError>({
    queryKey: CANDIDATE_PROGRESS_KEY(candidateId || ''),
    queryFn: () => interviewsService.getCandidateRoundProgress(candidateId!),
    enabled: !!candidateId,
  });
};

export const useGetInterviewerSchedule = (params?: {
  interviewer_id?: string;
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery<InterviewerSchedule, AxiosError>({
    queryKey: [...INTERVIEWER_SCHEDULE_KEY(params?.interviewer_id || ''), params],
    queryFn: () => interviewsService.getInterviewerSchedule(params),
    enabled: !!params?.interviewer_id,
  });
};

export const useGetUpcomingRounds = (params?: { days_ahead?: number }) => {
  return useQuery<UpcomingRounds, AxiosError>({
    queryKey: [...UPCOMING_ROUNDS_KEY, params],
    queryFn: () => interviewsService.getUpcomingRounds(params),
  });
};

export const useCreateScore = () => {
  const queryClient = useQueryClient();
  return useMutation<Score, AxiosError, CreateScoreRequest>({
    mutationFn: (data) => interviewsService.createScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCORES_KEY });
    },
  });
};

export const useGetScore = (interviewId: string | undefined) => {
  return useQuery<Score, AxiosError>({
    queryKey: SCORE_QUERY_KEY(interviewId || ''),
    queryFn: () => interviewsService.getScore(interviewId!),
    enabled: !!interviewId,
  });
};

export const useUpdateScore = (scoreId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Score, AxiosError, Partial<CreateScoreRequest>>({
    mutationFn: (data) => interviewsService.updateScore(scoreId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(SCORE_QUERY_KEY(data.interview_id), data);
      queryClient.invalidateQueries({ queryKey: SCORES_KEY });
    },
  });
};
