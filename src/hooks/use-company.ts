import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import companyService, { Company, CreateCompanyRequest, UpdateCompanyRequest } from '@/services/company.service';
import { AxiosError } from 'axios';

const COMPANY_QUERY_KEY = (id: string) => ['company', id];

export const useGetCompany = (companyId: string | undefined) => {
  return useQuery<Company, AxiosError>({
    queryKey: COMPANY_QUERY_KEY(companyId || ''),
    queryFn: () => companyService.getCompany(companyId!),
    enabled: !!companyId,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation<Company, AxiosError, CreateCompanyRequest>({
    mutationFn: (data) => companyService.createCompany(data),
    onSuccess: (data) => {
      queryClient.setQueryData(COMPANY_QUERY_KEY(data.id), data);
    },
  });
};

export const useUpdateCompany = (companyId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Company, AxiosError, UpdateCompanyRequest>({
    mutationFn: (data) => companyService.updateCompany(companyId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(COMPANY_QUERY_KEY(companyId), data);
    },
  });
};
