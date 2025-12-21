import { useRepositories } from "@/app/hooks/repository_hook";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { authRepository } = useRepositories();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!authRepository.isAuthenticated()) {
        throw new Error("Not authenticated");
      }
      // If you have a getCurrentUser method in your repository:
      return authRepository.getCurrentUser();
    },
    enabled: authRepository.isAuthenticated(),
  });
};