import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import { RepositoryProvider } from "./app/providers/RepositoryProvider";
import { QueryProvider } from "./app/providers/QueryProvider";
import { Toaster } from "sonner";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <QueryProvider>
    <RepositoryProvider>
      <BrowserRouter>
        <App />
        <Toaster richColors closeButton expand />
      </BrowserRouter>
    </RepositoryProvider>
  </QueryProvider>
);
