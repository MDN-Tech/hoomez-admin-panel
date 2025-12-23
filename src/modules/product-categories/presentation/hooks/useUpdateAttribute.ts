import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductCategoryAttribute } from "../../domain/entities/category_entity";
import { GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY } from "./useGetAttributesByCategory";

export const useUpdateAttribute = () => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      attribute,
    }: {
      id: string;
      attribute: ProductCategoryAttribute;
    }) => categoryRepository.updateAttribute(id, attribute),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY],
      }),
  });
};
