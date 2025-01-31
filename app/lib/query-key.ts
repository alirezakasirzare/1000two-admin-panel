import type { PaginationQueryParams } from "./types";

export const chapterKeys = {
  all: ["chapter"],
  pagination: (data: PaginationQueryParams) => ["chapter", { page: data.page }],
};

export const stepKeys = {
  all: ["step"],
  pagination: (data: PaginationQueryParams) => ["step", { page: data.page }],
  byChapterPagination: (
    data: PaginationQueryParams & { chapterId: string }
  ) => ["step", { page: data.page, chapterId: data.chapterId }],
};
