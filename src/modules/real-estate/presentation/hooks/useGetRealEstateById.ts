import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_REAL_ESTATE_BY_ID_QUERY_KEY = "realEstate-by-id";

export const useGetRealEstateById = (
  id: string,
  options?: { enabled?: boolean },
) => {
  const { realEstateRepository } = useRepositories();

  return useQuery({
    queryFn: () => realEstateRepository.getRealEstateById(id),
    queryKey: [GET_REAL_ESTATE_BY_ID_QUERY_KEY, id],
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
