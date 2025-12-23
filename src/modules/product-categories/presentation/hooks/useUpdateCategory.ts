import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";
import type { UpdateCategoryParams } from "../../infrastructure/params/category_params";

export const useUpdateCategory = () => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: string;
      params: UpdateCategoryParams;
    }) => categoryRepository.updateCategory(id, params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
      }),
  });
};
