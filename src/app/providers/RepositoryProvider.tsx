import {
  repositories,
  RepositoryContext,
} from "../contexts/repository_context";

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
