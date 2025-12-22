import { useRepositories } from "@/app/hooks/repository_hook";

export const useGetCurrentUser = () => {
  const { authRepository } = useRepositories();

  // Direct access to localStorage data (synchronous)
  const user = authRepository.getCurrentUser();

  return { user };
};
