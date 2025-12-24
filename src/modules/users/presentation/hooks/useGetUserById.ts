import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";

export const GET_USER_BY_ID_QUERY_KEY = "user-detail";

export const useGetUserById = (userId: string) => {
  const { userRepository } = useRepositories();

  return useQuery({
    queryFn: () => userRepository.getUserById(userId),
    queryKey: [GET_USER_BY_ID_QUERY_KEY, userId],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
