import { apiRequest } from "~/lib/api-request";
import { generateUrl } from "~/lib/utils";

import type {
  BaseApiPagination,
  BaseApiSuccess,
  Chapter,
  PaginationQueryParams,
} from "~/lib/types";

// find all GET
const findAll = async (paginationParams: PaginationQueryParams) => {
  const url = generateUrl("chapter", paginationParams);

  const {
    data: { data },
  } = await apiRequest.get<BaseApiPagination<Chapter>>(url);

  return data;
};

// create POST
const create = async (body: { name: string; description: string }) => {
  const {
    data: { data },
  } = await apiRequest.post<BaseApiSuccess<Chapter>>("chapter", body);

  return data;
};

// edit PUT
const edit = async (
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
const remove = async (id: string) => {
  const {
    data: { data },
  } = await apiRequest.delete<BaseApiSuccess<Chapter>>(`chapter/${id}`);

  return data;
};

// export all
export const chapterApi = {
  findAll,
  create,
  edit,
  delete: remove,
};
