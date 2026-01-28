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
import AdminLayout from "./components/AdminLayout";
import ProductCategoriesPage from "@/modules/categories/presentation/pages/ProductCategoriesPage";
import ServiceCategoriesPage from "@/modules/categories/presentation/pages/ServiceCategoriesPage";
import ProductsPage from "@/modules/products/presentation/pages/ProductsPage";
import ServicesPage from "@/modules/services/presentation/pages/ServicesPage";
import PromotionsPage from "@/modules/promotions/presentation/pages/PromotionsPage";
import UsersPage from "@/modules/users/presentation/pages/UsersPage";
import RealEstatesPage from "@/modules/real-estate/presentation/pages/RealEstatesPage";
import RealEstateCategoriesPage from "@/modules/categories/presentation/pages/RealEstateCategoriesPage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />

      <Route path="/admin" element={<CheckAuth allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="promotions" element={<PromotionsPage />} />
          <Route path="real-estates" element={<RealEstatesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route
            path="categories/products"
            element={<ProductCategoriesPage />}
          />
          <Route
            path="categories/services"
            element={<ServiceCategoriesPage />}
          />
          <Route
            path="categories/real-estates"
            element={<RealEstateCategoriesPage />}
          />
        </Route>
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
