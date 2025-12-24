import { useRepositories } from "@/app/hooks/useRepository";
import { useQuery } from "@tanstack/react-query";
import type { GetUsersParams } from "../../infrastructure/params/user_params";

export const GET_USERS_QUERY_KEY = "users";

export const useGetUsers = (params?: GetUsersParams) => {
  const { userRepository } = useRepositories();

  return useQuery({
    queryFn: () => userRepository.getUsers(params),
    queryKey: [GET_USERS_QUERY_KEY, params],
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
