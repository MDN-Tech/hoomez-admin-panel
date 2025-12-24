import { useContext } from "react";
import { RepositoryContext } from "../contexts/RepositoryContext";

export const useRepositories = () => useContext(RepositoryContext);
