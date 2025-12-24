import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_PROMOTIONS_QUERY_KEY = "promotions";

export const useGetPromotions = () => {
  const { promotionRepository } = useRepositories();

  return useQuery({
    queryFn: () => promotionRepository.getPromotions(),
    queryKey: [GET_PROMOTIONS_QUERY_KEY],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
