import { apiRequest } from "~/lib/api-request";
import type { BaseApiPagination, BaseApiSuccess, Chapter } from "~/lib/types";

// find all GET
const getChaptersApi = async () => {
  const {
    data: { data },
  } = await apiRequest.get<BaseApiPagination<Chapter>>("chapter");

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
  } = await apiRequest.post<BaseApiSuccess<Chapter>>(`chapter/${id}`, body);

  return data;
};

// export all
export const chapterApi = {
  findAll: getChaptersApi,
  create: createChapterApi,
  edit: editChapterApi,
};
