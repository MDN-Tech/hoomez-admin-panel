import {
  repositories,
  RepositoryContext,
} from "../contexts/repository.context";

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
