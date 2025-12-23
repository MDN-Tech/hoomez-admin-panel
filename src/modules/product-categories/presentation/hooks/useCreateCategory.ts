import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCategoryParams } from "../../infrastructure/params/category_params";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";

export const useCreateCategory = () => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCategoryParams) =>
      categoryRepository.createCategory(params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
      }),
  });
};
