import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import candidatesService, {
  Candidate,
  CreateCandidateRequest,
  UpdateCandidateRequest,
  BulkImportRequest,
  BulkImportResponse,
  BulkImportJobResponse,
  ListCandidatesResponse,
  DashboardStats,
  FunnelAnalytics,
  TimeToHireMetrics,
  BulkEmailRequest,
  CandidateStatus,
} from '@/services/candidates.service';
import { AxiosError } from 'axios';

const CANDIDATES_QUERY_KEY = ['candidates'];
const CANDIDATE_QUERY_KEY = (id: string) => ['candidates', id];
const DASHBOARD_STATS_KEY = ['dashboard-stats'];
const FUNNEL_ANALYTICS_KEY = ['funnel-analytics'];
const TIME_TO_HIRE_KEY = ['time-to-hire'];

export const useListCandidates = (params?: {
  skip?: number;
  limit?: number;
  status?: CandidateStatus;
  domain?: string;
}) => {
  return useQuery<ListCandidatesResponse, AxiosError>({
    queryKey: [...CANDIDATES_QUERY_KEY, params],
    queryFn: () => candidatesService.listCandidates(params),
  });
};

export const useGetCandidate = (candidateId: string | undefined) => {
  return useQuery<Candidate, AxiosError>({
    queryKey: CANDIDATE_QUERY_KEY(candidateId || ''),
    queryFn: () => candidatesService.getCandidate(candidateId!),
    enabled: !!candidateId,
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation<Candidate, AxiosError, CreateCandidateRequest>({
    mutationFn: (data) => candidatesService.createCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CANDIDATES_QUERY_KEY });
    },
  });
};

export const useUpdateCandidate = (candidateId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Candidate, AxiosError, UpdateCandidateRequest>({
    mutationFn: (data) => candidatesService.updateCandidate(candidateId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(CANDIDATE_QUERY_KEY(candidateId), data);
      queryClient.invalidateQueries({ queryKey: CANDIDATES_QUERY_KEY });
    },
  });
};

export const useDeleteCandidate = (candidateId: string) => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, AxiosError>({
    mutationFn: () => candidatesService.deleteCandidate(candidateId),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: CANDIDATE_QUERY_KEY(candidateId) });
      queryClient.invalidateQueries({ queryKey: CANDIDATES_QUERY_KEY });
    },
  });
};

export const useBulkImportJSON = () => {
  const queryClient = useQueryClient();
  return useMutation<BulkImportResponse, AxiosError, BulkImportRequest>({
    mutationFn: (data) => candidatesService.bulkImportJSON(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CANDIDATES_QUERY_KEY });
    },
  });
};

export const useBulkImportFile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    BulkImportJobResponse,
    AxiosError,
    { file: File; params?: { send_invitations?: boolean; default_domain?: string } }
  >({
    mutationFn: ({ file, params }) => candidatesService.bulkImportFile(file, params),
  });
};

export const useGetImportJobStatus = (jobId: string | undefined) => {
  return useQuery({
    queryKey: ['import-job', jobId],
    queryFn: () => candidatesService.getImportJobStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: 5000, // Poll every 5 seconds
  });
};

export const useBulkSendEmail = () => {
  return useMutation<{ job_id: string; message: string }, AxiosError, BulkEmailRequest>({
    mutationFn: (data) => candidatesService.bulkSendEmail(data),
  });
};

export const useGetDashboardStats = () => {
  return useQuery<DashboardStats, AxiosError>({
    queryKey: DASHBOARD_STATS_KEY,
    queryFn: () => candidatesService.getDashboardStats(),
  });
};

export const useGetFunnelAnalytics = () => {
  return useQuery<FunnelAnalytics, AxiosError>({
    queryKey: FUNNEL_ANALYTICS_KEY,
    queryFn: () => candidatesService.getFunnelAnalytics(),
  });
};

export const useGetTimeToHireMetrics = () => {
  return useQuery<TimeToHireMetrics, AxiosError>({
    queryKey: TIME_TO_HIRE_KEY,
    queryFn: () => candidatesService.getTimeToHireMetrics(),
  });
};
