import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { addAxiosDateTransformer } from "axios-date-transformer";
import type { BaseApiError } from "./types";

const basicApiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiRequest = addAxiosDateTransformer(basicApiRequest);

// global error manage
apiRequest.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<BaseApiError>) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.message;

    // auth error
    if (statusCode === 401) {
      toast.error("لطفا ابتدا وارد شوید");
    }

    // network error
    if (errorMessage === "Network Error") {
      toast.error("خطای اینترنت");
    }
    // server error
    else if (statusCode === 500) {
      toast.error("ارور سمت سرور");
    }
    // access error
    else if (statusCode === 403) {
      toast.error("شما به این عملیات دسترسی ندارید");
    }
    // not found error
    // else if (statusCode === 404) {
    //   toast.error("This item not found");
    // }
    // form error
    else if (statusCode === 422 || statusCode === 400) {
      const apiErrorMessage =
        error.response?.data?.detail?.[0].message ??
        "خطا در عملیات، لطفا مجدد امتحان کنید";

      toast.error(apiErrorMessage);
    }
    return Promise.reject(error.response?.data);
  }
);
