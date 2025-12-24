export interface CreateCategoryParams {
  name: string;
  parentCategoryId?: string;
}

export interface CreateAttributeParams {
  name: string;
  dataType: string;
}

export interface UpdateCategoryParams {
  name?: string;
}

export interface UpdateAttributeParams {
  name?: string;
}
