import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationsProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Paginations: React.FC<PaginationsProps> = ({
  totalProducts,
  productsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 1 && currentPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
