import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductCategory } from "../../domain/entities/category_entity";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";

export const useUpdateCategory = () => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: ProductCategory }) =>
      categoryRepository.updateCategory(id, category),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
      }),
  });
};
