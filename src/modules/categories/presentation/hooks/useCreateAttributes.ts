import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateAttributeParams } from "../../infrastructure/params/category_params";
import { GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY } from "./useGetAttributesByCategory";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export const useCreateAttributes = ({
  moduleType,
}: {
  moduleType: CategoryModuleType;
}) => {
  const { categoryRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      attributes,
    }: {
      categoryId: string;
      attributes: CreateAttributeParams[];
    }) => {
      if (moduleType === "product") {
        return categoryRepository.createProductAttribute(
          categoryId,
          attributes,
        );
      }

      if (moduleType === "service") {
        return categoryRepository.createServiceAttribute(
          categoryId,
          attributes,
        );
      }

      return categoryRepository.createRealEstateAttribute(
        categoryId,
        attributes,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_ATTRIBUTES_BY_CATEGORY_QUERY_KEY, moduleType],
      }),
  });
};
