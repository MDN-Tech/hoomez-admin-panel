import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY = "category-attributes";

export const useGetAttributesByCategory = ({
  isService,
  categoryId,
}: {
  isService: boolean;
  categoryId: string;
}) => {
  const { categoryRepository } = useRepositories();

  return useQuery({
    queryFn: () => {
      return isService
        ? categoryRepository.getServiceCategoryAttributes(categoryId)
        : categoryRepository.getProductCategoryAttributes(categoryId);
    },
    queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY, categoryId],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
