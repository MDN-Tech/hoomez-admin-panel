export interface CreateCategoryParams {
  name: string;
  parentCategoryId?: string;
}

export interface CreateAttributeParams {
  name: string;
  dataType: string;
}
