import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export const GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY = "category-attributes";

export const useGetAttributesByCategory = ({
  moduleType,
  categoryId,
}: {
  moduleType: CategoryModuleType;
  categoryId: string;
}) => {
  const { categoryRepository } = useRepositories();

  return useQuery({
    queryFn: () => {
      if (moduleType === "product") {
        return categoryRepository.getProductCategoryAttributes(categoryId);
      }

      if (moduleType === "service") {
        return categoryRepository.getServiceCategoryAttributes(categoryId);
      }

      return categoryRepository.getRealEstateCategoryAttributes(categoryId);
    },
    queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY, moduleType, categoryId],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
