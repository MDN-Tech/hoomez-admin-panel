import { useRepositories } from "@/app/hooks/useRepository";
import { useMutation } from "@tanstack/react-query";
import type { LoginParams } from "../../domain/params/auth_params";

export const useLogin = () => {
  const { authRepository } = useRepositories();

  return useMutation({
    mutationFn: (params: LoginParams) => authRepository.login(params),
  });
};
