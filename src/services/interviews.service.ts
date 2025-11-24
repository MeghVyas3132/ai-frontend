import apiClient from '@/lib/api-client';

export type InterviewRoundType = 'SCREENING' | 'TECHNICAL' | 'BEHAVIORAL' | 'FINAL' | 'HR' | 'CUSTOM';
export type InterviewStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export interface InterviewRound {
  id: string;
  candidate_id: string;
  interviewer_id: string;
  round_type: InterviewRoundType;
  status: InterviewStatus;
  scheduled_at: string;
  timezone: string;
  duration_minutes: number;
  notes?: string;
  feedback?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInterviewRoundRequest {
  candidate_id: string;
  interviewer_id: string;
  round_type: InterviewRoundType;
  scheduled_at: string;
  timezone: string;
  duration_minutes?: number;
  notes?: string;
}

export interface BatchScheduleRoundsRequest {
  candidate_id: string;
  interviewer_ids: string[];
  round_types: InterviewRoundType[];
  start_date: string;
  timezone: string;
  days_between_rounds?: number;
  duration_minutes?: number;
}

export interface UpdateInterviewRoundRequest {
  scheduled_at?: string;
  timezone?: string;
  duration_minutes?: number;
  notes?: string;
  status?: InterviewStatus;
}

export interface RescheduleInterviewRequest {
  scheduled_at: string;
  timezone: string;
  reason?: string;
}

export interface CancelInterviewRequest {
  reason?: string;
}

export interface CompleteInterviewRequest {
  notes?: string;
  score?: number;
  feedback?: string;
  recommendation?: 'PASS' | 'FAIL' | 'MAYBE';
}

export interface ListInterviewsResponse {
  interview_rounds: InterviewRound[];
  total: number;
  page: number;
  page_size: number;
}

export interface CandidateRoundProgress {
  candidate_id: string;
  completed_count: number;
  pending_count: number;
  cancelled_count: number;
  rounds: InterviewRound[];
}

export interface InterviewerSchedule {
  interviewer_id: string;
  scheduled_rounds: InterviewRound[];
  available_slots?: Array<{ start_time: string; end_time: string }>;
}

export interface UpcomingRounds {
  upcoming_rounds: InterviewRound[];
  total_count: number;
}

export interface Score {
  id: string;
  interview_id: string;
  score: number;
  feedback: string;
  recommendation: 'PASS' | 'FAIL' | 'MAYBE';
  created_at: string;
  updated_at: string;
}

export interface CreateScoreRequest {
  interview_id: string;
  score: number;
  feedback: string;
  recommendation: 'PASS' | 'FAIL' | 'MAYBE';
}

export const interviewsService = {
  async createInterviewRound(data: CreateInterviewRoundRequest): Promise<InterviewRound> {
    const response = await apiClient.post<InterviewRound>('/interview-rounds', data);
    return response.data;
  },

  async batchScheduleRounds(data: BatchScheduleRoundsRequest): Promise<{ rounds: InterviewRound[]; message: string }> {
    const response = await apiClient.post<{ rounds: InterviewRound[]; message: string }>(
      '/interview-rounds/batch-schedule',
      data
    );
    return response.data;
  },

  async listInterviewRounds(params?: {
    skip?: number;
    limit?: number;
    status?: InterviewStatus;
    candidate_id?: string;
  }): Promise<ListInterviewsResponse> {
    const response = await apiClient.get<ListInterviewsResponse>('/interview-rounds', { params });
    return response.data;
  },

  async getInterviewRound(interviewId: string): Promise<InterviewRound> {
    const response = await apiClient.get<InterviewRound>(`/interview-rounds/${interviewId}`);
    return response.data;
  },

  async updateInterviewRound(interviewId: string, data: UpdateInterviewRoundRequest): Promise<InterviewRound> {
    const response = await apiClient.put<InterviewRound>(`/interview-rounds/${interviewId}`, data);
    return response.data;
  },

  async rescheduleInterview(interviewId: string, data: RescheduleInterviewRequest): Promise<InterviewRound> {
    const response = await apiClient.post<InterviewRound>(`/interview-rounds/${interviewId}/reschedule`, data);
    return response.data;
  },

  async cancelInterview(interviewId: string, data: CancelInterviewRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`/interview-rounds/${interviewId}/cancel`, data);
    return response.data;
  },

  async startInterview(interviewId: string): Promise<InterviewRound> {
    const response = await apiClient.post<InterviewRound>(`/interview-rounds/${interviewId}/start`);
    return response.data;
  },

  async completeInterview(interviewId: string, data: CompleteInterviewRequest): Promise<InterviewRound> {
    const response = await apiClient.post<InterviewRound>(`/interview-rounds/${interviewId}/complete`, data);
    return response.data;
  },

  async getCandidateRoundProgress(candidateId: string): Promise<CandidateRoundProgress> {
    const response = await apiClient.get<CandidateRoundProgress>(
      `/interview-rounds/candidate/${candidateId}/progress`
    );
    return response.data;
  },

  async getInterviewerSchedule(params?: {
    interviewer_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<InterviewerSchedule> {
    const response = await apiClient.get<InterviewerSchedule>('/interview-rounds/interviewer/schedule', { params });
    return response.data;
  },

  async getUpcomingRounds(params?: { days_ahead?: number }): Promise<UpcomingRounds> {
    const response = await apiClient.get<UpcomingRounds>('/interview-rounds/company/upcoming', { params });
    return response.data;
  },

  async createScore(data: CreateScoreRequest): Promise<Score> {
    const response = await apiClient.post<Score>('/scores', data);
    return response.data;
  },

  async getScore(interviewId: string): Promise<Score> {
    const response = await apiClient.get<Score>(`/scores/${interviewId}`);
    return response.data;
  },

  async updateScore(scoreId: string, data: Partial<CreateScoreRequest>): Promise<Score> {
    const response = await apiClient.put<Score>(`/scores/${scoreId}`, data);
    return response.data;
  },
};

export default interviewsService;
