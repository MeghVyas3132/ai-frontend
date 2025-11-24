import apiClient from '@/lib/api-client';

export interface Company {
  id: string;
  name: string;
  email_domain?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyRequest {
  name: string;
  email_domain?: string;
  description?: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  email_domain?: string;
  description?: string;
}

export const companyService = {
  async createCompany(data: CreateCompanyRequest): Promise<Company> {
    const response = await apiClient.post<Company>('/company', data);
    return response.data;
  },

  async getCompany(companyId: string): Promise<Company> {
    const response = await apiClient.get<Company>(`/company/${companyId}`);
    return response.data;
  },

  async updateCompany(companyId: string, data: UpdateCompanyRequest): Promise<Company> {
    const response = await apiClient.put<Company>(`/company/${companyId}`, data);
    return response.data;
  },
};

export default companyService;
