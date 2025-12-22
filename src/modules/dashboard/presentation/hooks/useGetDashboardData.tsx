import { useRepositories } from "@/app/hooks/repository_hook";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEY = "dashboard-data";

export const useGetDashBoardData = () => {
  const { dashboardRepository } = useRepositories();

  return useQuery({
    queryFn: () => dashboardRepository.getDashboardData(),
    queryKey: [QUERY_KEY],
  });
};
