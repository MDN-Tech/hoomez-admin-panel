import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_USERS_QUERY_KEY } from "./useGetUsers";

export const useActivateUser = () => {
  const { userRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userRepository.activateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
    },
  });
};

export const useDeactivateUser = () => {
  const { userRepository } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userRepository.deactivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
    },
  });
};
