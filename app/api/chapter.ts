import { queryString } from "object-query-string";

import { apiRequest } from "~/lib/api-request";
import type {
  BaseApiPagination,
  BaseApiSuccess,
  Chapter,
  PaginationQueryParams,
} from "~/lib/types";

// find all GET
const getChaptersApi = async (paginationParams: PaginationQueryParams) => {
  const query = queryString(paginationParams);
  const {
    data: { data },
  } = await apiRequest.get<BaseApiPagination<Chapter>>(`chapter?${query}`);

  return data;
};

// create POST
const createChapterApi = async (body: {
  name: string;
  description: string;
}) => {
  const {
    data: { data },
  } = await apiRequest.post<BaseApiSuccess<Chapter>>("chapter", body);

  return data;
};

// edit PUT
const editChapterApi = async (
  id: string,
  body: {
    name: string;
    description: string;
  }
) => {
  const {
    data: { data },
  } = await apiRequest.put<BaseApiSuccess<Chapter>>(`chapter/${id}`, body);

  return data;
};

// remove DELETE
const deleteChapterApi = async (id: string) => {
  const {
    data: { data },
  } = await apiRequest.delete<BaseApiSuccess<Chapter>>(`chapter/${id}`);

  return data;
};

// export all
export const chapterApi = {
  findAll: getChaptersApi,
  create: createChapterApi,
  edit: editChapterApi,
  delete: deleteChapterApi,
};
