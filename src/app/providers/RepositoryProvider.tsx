import { repositories, RepositoryContext } from "../contexts/RepositoryContext";

export const RepositoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};
