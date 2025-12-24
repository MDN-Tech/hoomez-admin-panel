import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_PRODUCT_BY_ID_QUERY_KEY = "product-by-id";

export const useGetProductById = (
  id: string,
  options?: { enabled?: boolean },
) => {
  const { productRepository } = useRepositories();

  return useQuery({
    queryFn: () => productRepository.getProductById(id),
    queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, id],
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
