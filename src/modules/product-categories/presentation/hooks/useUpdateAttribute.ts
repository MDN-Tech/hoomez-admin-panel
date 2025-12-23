import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY } from "./useGetAttributesByCategory";
import type { UpdateAttributeParams } from "../../infrastructure/params/category_params";

export const useUpdateAttribute = () => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: string;
      params: UpdateAttributeParams;
    }) => categoryRepository.updateAttribute(id, params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY],
      }),
  });
};
