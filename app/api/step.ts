import { apiRequest } from "~/lib/api-request";
import type {
  BaseApiPagination,
  BaseApiSuccess,
  PaginationQueryParams,
  Step,
} from "~/lib/types";
import { generateUrl } from "~/lib/utils";

// find all GET
const findAllByChapter = async (
  params: PaginationQueryParams & { chapterId: string }
) => {
  const { chapterId, ...paginationParams } = params;
  const url = generateUrl(`chapter/${chapterId}/steps`, paginationParams);

  const {
    data: { data },
  } = await apiRequest.get<BaseApiPagination<Step>>(url);

  return data;
};

// create POST
const create = async (body: {
  name: string;
  description: string;
  question: string;
  answer: string;
  chapterId: string;
}) => {
  const {
    data: { data },
  } = await apiRequest.post<BaseApiSuccess<Step>>("step", body);

  return data;
};

// edit PUT
const edit = async (
  id: string,
  body: {
    name: string;
    description: string;
    question: string;
    answer: string;
  }
) => {
  const {
    data: { data },
  } = await apiRequest.put<BaseApiSuccess<Step>>(`step/${id}`, body);

  return data;
};

// remove DELETE
const remove = async (id: string) => {
  const {
    data: { data },
  } = await apiRequest.delete<BaseApiSuccess<Step>>(`step/${id}`);

  return data;
};

// export all
export const stepApi = {
  findAllByChapter,
  create,
  edit,
  delete: remove,
};
