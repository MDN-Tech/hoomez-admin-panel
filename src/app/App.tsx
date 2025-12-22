import LoginPage from "../modules/auth/presentation/pages/LoginPage";
import "./App.css";
import { Routes, Route } from "react-router";
import {
  NotAllowed,
  Unauthorized,
  ServerError,
  NotFound,
} from "./components/ErrorPages";
import CheckAuth from "./components/CheckAuth";
import DashboardPage from "@/modules/dashboard/presentation/pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />

      <Route path="/admin" element={<CheckAuth allowedRoles={["admin"]} />}>
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="/not-allowed" element={<NotAllowed />} />
      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Server Error Page */}
      <Route path="/server-error" element={<ServerError />} />
      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
