import { useContext } from "react";
import { RepositoryContext } from "../contexts/repository.context";

export const useRepositories = () => useContext(RepositoryContext);
