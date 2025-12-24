import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_PROMOTIONS_QUERY_KEY } from "./useGetPromotions";
import type { CreatePromotionParams } from "../../infrastructure/params/promotion_params";

export const useCreatePromotion = () => {
  const { promotionRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreatePromotionParams) =>
      promotionRepository.createPromotion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROMOTIONS_QUERY_KEY] });
    },
  });
};
