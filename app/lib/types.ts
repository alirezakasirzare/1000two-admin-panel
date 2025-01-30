export type BaseApiError = {
  success: false;
  error: "Invalid Data";
  detail?: { message: string }[];
};

export type BaseApiSuccess<T> = {
  success: true;
  data: T;
};

export type MetaPagination = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: null | number;
  nextPage: null | number;
  pageCount: number;
  totalCount: number;
};

export type BaseApiPagination<T> = {
  success: true;
  data: {
    items: T[];
    meta: MetaPagination;
  };
};

export type Chapter = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginationQueryParams = {
  page: number;
};
