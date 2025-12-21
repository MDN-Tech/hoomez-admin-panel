import { createContext } from "react";

export const repositories = {
  // Auth Repository
};

type Repositories = typeof repositories;

export const RepositoryContext = createContext<Repositories>(repositories);
