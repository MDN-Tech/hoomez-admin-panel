import { useContext } from "react";
import { RepositoryContext } from "../contexts/repository_context";

export const useRepositories = () => useContext(RepositoryContext);
