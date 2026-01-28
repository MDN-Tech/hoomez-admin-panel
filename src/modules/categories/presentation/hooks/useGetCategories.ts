import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export const GET_CATEGORIES_QUERY_KEY = "categories";

export const useGetCategories = ({
  moduleType,
}: {
  moduleType: CategoryModuleType;
}) => {
  const { categoryRepository } = useRepositories();

  return useQuery({
    queryFn: () => {
      if (moduleType === "product") {
        return categoryRepository.getProductCategoryTree();
      }

      if (moduleType === "service") {
        return categoryRepository.getServiceCategoryTree();
      }

      return categoryRepository.getRealEstateCategoryTree();
    },
    queryKey: [GET_CATEGORIES_QUERY_KEY, moduleType],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
