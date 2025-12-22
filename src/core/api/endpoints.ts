export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
  },
  dashboard: {
    getFullData: "/dashboard",
  },
  products: {
    categories: "/products/categories",
    categoryTree: "/products/categories/tree",
    attributes: (categoryId: string) => `/products/attributes/${categoryId}`,
  },
};
