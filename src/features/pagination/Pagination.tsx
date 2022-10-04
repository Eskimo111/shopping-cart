import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Pagination } from "./paginationSlice";

const ProductPagination = (props: {
  pagination: Pagination;
  onPageChange: Function;
}) => {
  const { pagination, onPageChange } = props;
  const { total, count, per_page, current_page, total_pages } = pagination;

  function handlePageChange(newPage: number) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div className="flex justify-center gap-4 w-full self-center">
      <button
        className="p-2 border border-black enabled:hover:bg-black enabled:hover:text-white disabled:border-gray-500 "
        disabled={current_page <= 1}
        onClick={() => handlePageChange(current_page - 1)}
      >
        <BiChevronLeft />
      </button>
      <button
        className="p-2 border border-black enabled:hover:bg-black enabled:hover:text-white  disabled:border-gray-500 "
        disabled={current_page >= total_pages}
        onClick={() => handlePageChange(current_page + 1)}
      >
        <BiChevronRight />
      </button>
    </div>
  );
};

export default ProductPagination;
