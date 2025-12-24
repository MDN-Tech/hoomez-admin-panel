import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";
import type { GetProductsParams } from "../../infrastructure/params/product_params";

export const GET_PRODUCTS_QUERY_KEY = "products";

export const useGetProducts = (params?: GetProductsParams) => {
  const { productRepository } = useRepositories();

  return useQuery({
    queryFn: () => productRepository.getProducts(params),
    queryKey: [GET_PRODUCTS_QUERY_KEY, params],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
