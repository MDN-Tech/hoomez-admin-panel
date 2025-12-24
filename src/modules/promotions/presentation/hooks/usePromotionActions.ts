import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_PROMOTIONS_QUERY_KEY } from "./useGetPromotions";
import { GET_PROMOTION_BY_ID_QUERY_KEY } from "./useGetPromotionById";
import type { RejectPromotionParams } from "../../infrastructure/params/promotion_params";

export const useApprovePromotion = () => {
  const { promotionRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promotionRepository.approvePromotion(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROMOTIONS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PROMOTION_BY_ID_QUERY_KEY, id],
      });
    },
  });
};

export const useRejectPromotion = () => {
  const { promotionRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: string;
      params: RejectPromotionParams;
    }) => promotionRepository.rejectPromotion(id, params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROMOTIONS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PROMOTION_BY_ID_QUERY_KEY, id],
      });
    },
  });
};

export const useCancelPromotion = () => {
  const { promotionRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promotionRepository.cancelPromotion(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROMOTIONS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_PROMOTION_BY_ID_QUERY_KEY, id],
      });
    },
  });
};

export const useDeletePromotion = () => {
  const { promotionRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promotionRepository.deletePromotion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROMOTIONS_QUERY_KEY] });
    },
  });
};
