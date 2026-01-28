import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCategoryParams } from "../../infrastructure/params/category_params";
import { GET_CATEGORIES_QUERY_KEY } from "./useGetCategories";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export const useCreateCategory = ({
  moduleType,
}: {
  moduleType: CategoryModuleType;
}) => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCategoryParams) => {
      if (moduleType === "product") {
        return categoryRepository.createProductCategory(params);
      }

      if (moduleType === "service") {
        return categoryRepository.createServiceCategory(params);
      }

      return categoryRepository.createRealEstateCategory(params);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORIES_QUERY_KEY, moduleType],
      }),
  });
};
