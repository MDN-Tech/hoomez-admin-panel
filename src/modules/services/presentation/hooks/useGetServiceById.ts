import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_SERVICE_BY_ID_QUERY_KEY = "service-by-id";

export const useGetServiceById = (
  id: string,
  options?: { enabled?: boolean },
) => {
  const { serviceRepository } = useRepositories();

  return useQuery({
    queryFn: () => serviceRepository.getServiceById(id),
    queryKey: [GET_SERVICE_BY_ID_QUERY_KEY, id],
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
