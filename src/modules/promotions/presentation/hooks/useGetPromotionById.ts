import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_PROMOTION_BY_ID_QUERY_KEY = "promotion-by-id";

export const useGetPromotionById = (
  id: string,
  options?: { enabled?: boolean },
) => {
  const { promotionRepository } = useRepositories();

  return useQuery({
    queryFn: () => promotionRepository.getPromotionById(id),
    queryKey: [GET_PROMOTION_BY_ID_QUERY_KEY, id],
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
