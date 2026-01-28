import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";
import type { GetRealEstatesParams } from "../../infrastructure/params/real_estate_params";

export const GET_REAL_ESTATES_QUERY_KEY = "realEstates";

export const useGetRealEstates = (params?: GetRealEstatesParams) => {
  const { realEstateRepository } = useRepositories();

  return useQuery({
    queryFn: () => realEstateRepository.getRealEstates(params),
    queryKey: [GET_REAL_ESTATES_QUERY_KEY, params],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
