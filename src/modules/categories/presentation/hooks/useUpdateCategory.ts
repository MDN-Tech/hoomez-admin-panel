import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";
import type { UpdateCategoryParams } from "../../infrastructure/params/category_params";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export const useUpdateCategory = ({
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
      params: UpdateCategoryParams;
    }) => {
      if (moduleType === "product") {
        return categoryRepository.updateProductCategory(id, params);
      }

      if (moduleType === "service") {
        return categoryRepository.updateServiceCategory(id, params);
      }

      return categoryRepository.updateRealEstateCategory(id, params);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY, moduleType],
      }),
  });
};
