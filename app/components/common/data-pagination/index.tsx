import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";

import { Button } from "~/components/ui/button";
import type { MetaPagination } from "~/lib/types";

export const useCurrentPage = (
  strategy: "queryParams"
): [number, (newPage: number) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") ?? 1);

  const setCurrentPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  return [currentPage, setCurrentPage];
};

export const DataPagination = ({
  meta,
  strategy,
}: {
  meta: MetaPagination;
  strategy: "queryParams";
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // next btn
  const onClickNext = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(meta.nextPage));
    setSearchParams(params);
  };

  // prev btn
  const onClickPrev = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(meta.previousPage));
    setSearchParams(params);
  };

  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onClickPrev}
        disabled={meta.isFirstPage}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <span className="text-sm font-medium">
        صفحه {meta.currentPage} از {meta.pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onClickNext}
        disabled={meta.isLastPage}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
    </div>
  );
};
