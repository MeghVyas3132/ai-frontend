import apiClient from '@/lib/api-client';

export type CandidateStatus = 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';

export interface Candidate {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  status: CandidateStatus;
  source?: string;
  domain?: string;
  position?: string;
  experience_years?: number;
  qualifications?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCandidateRequest {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  status?: CandidateStatus;
  source?: string;
  domain?: string;
  position?: string;
  experience_years?: number;
  qualifications?: string;
}

export interface UpdateCandidateRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  status?: CandidateStatus;
  domain?: string;
  position?: string;
  experience_years?: number;
  qualifications?: string;
}

export interface BulkImportRequest {
  candidates: CreateCandidateRequest[];
  domain?: string;
  send_invitations?: boolean;
}

export interface BulkImportResponse {
  total: number;
  imported: number;
  errors: number;
  message: string;
}

export interface BulkImportJobResponse {
  job_id: string;
  status: string;
  total_records: number;
  created_count: number;
  failed_count: number;
  success_rate?: number;
  processing_start?: string;
  processing_end?: string;
  processing_duration_seconds?: number;
  celery_task_id?: string;
}

export interface ListCandidatesResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  page_size: number;
}

export interface DashboardStats {
  total_candidates: number;
  candidates_by_status: Record<CandidateStatus, number>;
  candidates_by_domain?: Record<string, number>;
  average_days_to_hire?: number;
  active_interviews?: number;
  pending_feedback?: number;
  conversion_rate?: number;
}

export interface FunnelAnalytics {
  funnel_stages: Array<{
    stage: CandidateStatus;
    count: number;
    percentage: number;
    drop_off_rate?: number;
  }>;
  overall_acceptance_rate?: number;
}

export interface TimeToHireMetrics {
  average_days_to_hire: number;
  median_days_to_hire: number;
  by_department?: Record<string, { average: number; median: number }>;
  message?: string;
}

export interface BulkEmailRequest {
  candidate_ids: string[];
  subject: string;
  body: string;
}

export const candidatesService = {
  async createCandidate(data: CreateCandidateRequest): Promise<Candidate> {
    const response = await apiClient.post<Candidate>('/candidates', data);
    return response.data;
  },

  async listCandidates(params?: {
    skip?: number;
    limit?: number;
    status?: CandidateStatus;
    domain?: string;
  }): Promise<ListCandidatesResponse> {
    const response = await apiClient.get<ListCandidatesResponse>('/candidates', { params });
    return response.data;
  },

  async getCandidate(candidateId: string): Promise<Candidate> {
    const response = await apiClient.get<Candidate>(`/candidates/${candidateId}`);
    return response.data;
  },

  async updateCandidate(candidateId: string, data: UpdateCandidateRequest): Promise<Candidate> {
    const response = await apiClient.patch<Candidate>(`/candidates/${candidateId}`, data);
    return response.data;
  },

  async deleteCandidate(candidateId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/candidates/${candidateId}`);
    return response.data;
  },

  async bulkImportJSON(data: BulkImportRequest): Promise<BulkImportResponse> {
    const response = await apiClient.post<BulkImportResponse>('/candidates/bulk/import', data);
    return response.data;
  },

  async bulkImportFile(file: File, params?: {
    send_invitations?: boolean;
    default_domain?: string;
  }): Promise<BulkImportJobResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (params?.send_invitations !== undefined) {
      formData.append('send_invitations', String(params.send_invitations));
    }
    if (params?.default_domain) {
      formData.append('default_domain', params.default_domain);
    }

    const response = await apiClient.post<BulkImportJobResponse>(
      '/candidates/bulk/import/file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async getImportJobStatus(jobId: string): Promise<any> {
    const response = await apiClient.get(`/candidates/import-jobs/${jobId}`);
    return response.data;
  },

  async bulkSendEmail(data: BulkEmailRequest): Promise<{ job_id: string; message: string }> {
    const response = await apiClient.post<{ job_id: string; message: string }>(
      '/candidates/bulk/send-email',
      data
    );
    return response.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/candidates/dashboard/stats');
    return response.data;
  },

  async getFunnelAnalytics(): Promise<FunnelAnalytics> {
    const response = await apiClient.get<FunnelAnalytics>('/candidates/analytics/funnel');
    return response.data;
  },

  async getTimeToHireMetrics(): Promise<TimeToHireMetrics> {
    const response = await apiClient.get<TimeToHireMetrics>('/candidates/analytics/time-to-hire');
    return response.data;
  },
};

export default candidatesService;
