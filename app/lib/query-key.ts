import type { PaginationQueryParams } from "./types";

export const chapterKeys = {
  all: ["chapter"],
  pagination: (data: PaginationQueryParams) => ["chapter", { page: data.page }],
};
