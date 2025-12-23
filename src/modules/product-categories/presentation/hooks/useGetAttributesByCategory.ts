import { useRepositories } from "@/app/hooks/repository_hook";
import { useQuery } from "@tanstack/react-query";

export const GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY = "category-attributes";

export const useGetAttributesByCategory = (categoryId: string) => {
  const { categoryRepository } = useRepositories();

  return useQuery({
    queryFn: () => categoryRepository.getCategoryAttributes(categoryId),
    queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY, categoryId],
  });
};
