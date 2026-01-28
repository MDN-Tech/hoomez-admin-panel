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
      `/product/categories/${categoryId}/name`,

    getAttributesByCategory: (categoryId: string) =>
      `/product/category/${categoryId}/attributes`,
    createAttribute: "/product/category/attributes",
    updateAttribute: (attributeId: string) =>
      `/product/attributes/${attributeId}/name`,

    getProducts: "/product/filtered",
    getProductById: (productId: string) => `/product/${productId}/single`,
  },
  services: {
    getCategories: "/service/categories",
    getCategoryTree: "/service/categories/tree",

    createCategory: "/service/category/create",
    updateCategory: (categoryId: string) =>
      `/product/categories/${categoryId}/name`,

    getAttributesByCategory: (categoryId: string) =>
      `/service/category/${categoryId}/attributes`,
    createAttribute: "/service/category/attributes",
    updateAttribute: (attributeId: string) =>
      `/product/attributes/${attributeId}/name`,

    getServices: "/service/filtered",
    getServiceById: (productId: string) => `/service/${productId}/single`,
  },
  promotions: {
    getPromotions: "/promotion/all",
    getPromotionById: (promotionId: string) =>
      `/promotion/${promotionId}/single`,

    createPromotion: "/promotion/create",
    updatePromotion: (promotionId: string) =>
      `/promotion/${promotionId}/update`,
    deletePromotion: (promotionId: string) =>
      `/promotion/${promotionId}/delete`,

    approvePromotion: (promotionId: string) =>
      `/promotion/${promotionId}/approve`,
    rejectPromotion: (promotionId: string) =>
      `/promotion/${promotionId}/reject`,
    cancelPromotion: (promotionId: string) =>
      `/promotion/${promotionId}/cancel`,
  },
  users: {
    getUsers: "/user",
    getUserById: (userId: string) => `/user/${userId}/single`,
    activateUser: (userId: string) => `/user/${userId}/activate`,
    deactivateUser: (userId: string) => `/user/${userId}/deactivate`,
  },
  realEstates: {
    getCategoryTree: "/real-estate/categories/tree",
    createCategory: "/real-estate/category/create",
    updateCategory: (categoryId: string) =>
      `/product/categories/${categoryId}/name`, // TODO: change endpoint

    getAttributesByCategory: (categoryId: string) =>
      `/real-estate/category/${categoryId}/attributes`,
    createAttribute: "/real-estate/category/attributes",
    updateAttribute: (attributeId: string) =>
      `/product/attributes/${attributeId}/name`, // TODO: change endpoint

    getRealEstates: "/real-estate/filtered",
    getRealEstateById: (realEstateId: string) =>
      `/real-estate/public/${realEstateId}/single`,
  },
};
