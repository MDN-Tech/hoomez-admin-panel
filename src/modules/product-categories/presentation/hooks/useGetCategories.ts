import { useRepositories } from "@/app/hooks/repository_hook";
import { useQuery } from "@tanstack/react-query";

export const GET_CATEGORIES_QUERY_KEY = "categories";

export const useGetCategories = () => {
  const { categoryRepository } = useRepositories();

  return useQuery({
    queryFn: () => categoryRepository.getCategoryTree(),
    queryKey: [GET_CATEGORIES_QUERY_KEY],
  });
};
