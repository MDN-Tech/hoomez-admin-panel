import { useRepositories } from "@/app/hooks/repository_hook";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEY = "user";

export const useCurrentUser = () => {
  const { authRepository } = useRepositories();

  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => authRepository.getCurrentUser(),
    enabled: authRepository.isAuthenticated(),
  });
};
