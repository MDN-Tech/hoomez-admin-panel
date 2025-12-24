import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";
import type { GetServicesParams } from "../../infrastructure/params/service_params";

export const GET_SERVICES_QUERY_KEY = "services";

export const useGetServices = (params?: GetServicesParams) => {
  const { serviceRepository } = useRepositories();

  return useQuery({
    queryFn: () => serviceRepository.getServices(params),
    queryKey: [GET_SERVICES_QUERY_KEY, params],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
