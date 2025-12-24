import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_PROMOTIONS_QUERY_KEY } from "./useGetPromotions";
import { GET_PROMOTION_BY_ID_QUERY_KEY } from "./useGetPromotionById";
import type { UpdatePromotionParams } from "../../infrastructure/params/promotion_params";

export const useUpdatePromotion = () => {
  const { promotionRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: string;
      params: UpdatePromotionParams;
    }) => promotionRepository.updatePromotion(id, params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROMOTIONS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PROMOTION_BY_ID_QUERY_KEY, id],
      });
    },
  });
};
