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
    getCategories: "/product/categories",
    getCategoryTree: "/product/categories/tree",
    createCategory: "/product/categories",
    updateCategory: (categoryId: string) =>
      `/product/categories/${categoryId}/update`,

    getAttributesByCategory: (categoryId: string) =>
      `/product/category/${categoryId}/attributes`,
    createAttribute: "/product/category/attributes",
    updateAttribute: (attributeId: string) =>
      `/product/attributes/${attributeId}/update`,
  },
};
