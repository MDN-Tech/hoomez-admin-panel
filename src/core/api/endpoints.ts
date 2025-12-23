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
    createCategory: "/product/category/create",
    updateCategory: (categoryId: string) =>
      `/product/categories/${categoryId}/update`,

    getAttributesByCategory: (categoryId: string) =>
      `/product/category/${categoryId}/attributes`,
    createAttribute: "/product/category/attributes",
    updateAttribute: (attributeId: string) =>
      `/product/attributes/${attributeId}/update`,
  },
  services: {
    getCategories: "/service/categories",
    getCategoryTree: "/service/categories/tree",
    createCategory: "/service/category/create",
    updateCategory: (categoryId: string) =>
      `/service/categories/${categoryId}/update`,

    getAttributesByCategory: (categoryId: string) =>
      `/service/category/${categoryId}/attributes`,
    createAttribute: "/service/category/attributes",
    updateAttribute: (attributeId: string) =>
      `/service/attributes/${attributeId}/update`,
  },
};
