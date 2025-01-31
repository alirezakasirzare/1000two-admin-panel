import { clsx, type ClassValue } from "clsx";
import { queryString } from "object-query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUrl = (apiPath: string, params: any) => {
  const query = queryString(params);
  let url = apiPath;
  if (query) {
    url += `?${query}`;
  }

  return url;
};
