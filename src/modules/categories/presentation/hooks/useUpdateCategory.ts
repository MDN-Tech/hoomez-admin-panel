import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";
import type { UpdateCategoryParams } from "../../infrastructure/params/category_params";

export const useUpdateCategory = ({ isService }: { isService: boolean }) => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: string;
      params: UpdateCategoryParams;
    }) => {
      return isService
        ? categoryRepository.updateServiceCategory(id, params)
        : categoryRepository.updateProductCategory(id, params);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
      }),
  });
};
