import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_CATEGORIES_QUERY_KEY = "categories";

export const useGetCategories = ({ isService }: { isService: boolean }) => {
  const { categoryRepository } = useRepositories();

  return useQuery({
    queryFn: () => {
      return isService
        ? categoryRepository.getServiceCategoryTree()
        : categoryRepository.getProductCategoryTree();
    },
    queryKey: [GET_CATEGORIES_QUERY_KEY, isService],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
