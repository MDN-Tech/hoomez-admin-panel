import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY } from "./useGetAttributesByCategory";
import type { UpdateAttributeParams } from "../../infrastructure/params/category_params";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export const useUpdateAttribute = ({
  moduleType,
}: {
  moduleType: CategoryModuleType;
}) => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      params,
    }: {
      id: string;
      params: UpdateAttributeParams;
    }) => {
      if (moduleType === "product") {
        return categoryRepository.updateProductAttribute(id, params);
      }

      if (moduleType === "service") {
        return categoryRepository.updateServiceAttribute(id, params);
      }

      return categoryRepository.updateRealEstateAttribute(id, params);
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY, moduleType],
      }),
  });
};
