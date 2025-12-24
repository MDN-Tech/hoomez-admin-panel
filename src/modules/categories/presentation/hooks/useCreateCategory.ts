import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCategoryParams } from "../../infrastructure/params/category_params";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";

export const useCreateCategory = ({ isService }: { isService: boolean }) => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCategoryParams) => {
      return isService
        ? categoryRepository.createServiceCategory(params)
        : categoryRepository.createProductCategory(params);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
      }),
  });
};
