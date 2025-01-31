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

export type PaginationQueryParams = {
  page: number;
};

export type Chapter = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Step = {
  id: string;
  name: string;
  description: string;
  question: string;
  answer: string;
  chapterId: string;
  createdAt: Date;
  updatedAt: Date;
};
