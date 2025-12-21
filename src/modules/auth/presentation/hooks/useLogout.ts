import { useRepositories } from "@/app/hooks/repository_hook";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  const { authRepository } = useRepositories();

  return useMutation({
    mutationFn: () => authRepository.logout(),
  });
};
