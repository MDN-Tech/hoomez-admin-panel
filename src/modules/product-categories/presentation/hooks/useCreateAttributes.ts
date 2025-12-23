import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateAttributeParams } from "../../infrastructure/params/category_params";
import { GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY } from "./useGetAttributesByCategory";

export const useCreateAttributes = () => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      attributes,
    }: {
      categoryId: string;
      attributes: CreateAttributeParams[];
    }) => categoryRepository.createAttribute(categoryId, attributes),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY],
      }),
  });
};
