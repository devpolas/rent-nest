"use client";

import { memo, useCallback, useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PropertyPaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

type PageItem = number | "ellipsis";

function buildPageItems(
  currentPage: number,
  totalPage: number,
): readonly PageItem[] {
  if (totalPage <= 5) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPage];
  }

  if (currentPage >= totalPage - 2) {
    return [
      1,
      "ellipsis",
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPage,
  ];
}

function PropertyPagination({
  page,
  limit,
  total,
  totalPage,
  onPageChange,
  disabled = false,
  className,
}: PropertyPaginationProps) {
  const currentPage = Math.min(Math.max(1, page), totalPage);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPage;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const pageItems = useMemo(
    () => buildPageItems(currentPage, totalPage),
    [currentPage, totalPage],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (disabled) return;
      if (nextPage < 1 || nextPage > totalPage) return;
      if (nextPage === currentPage) return;

      onPageChange(nextPage);
    },
    [currentPage, disabled, onPageChange, totalPage],
  );

  const handlePrevious = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      handlePageChange(currentPage - 1);
    },
    [currentPage, handlePageChange],
  );

  const handleNext = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      handlePageChange(currentPage + 1);
    },
    [currentPage, handlePageChange],
  );

  if (total <= 0 || totalPage <= 1) {
    return null;
  }

  const navigationDisabled = disabled || !canGoPrevious;
  const nextDisabled = disabled || !canGoNext;

  return (
    <nav
      aria-label='Property pagination'
      className={[
        "flex w-full flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className='text-muted-foreground text-sm sm:text-left text-center'>
        Showing <span className='font-medium text-foreground'>{startItem}</span>{" "}
        to <span className='font-medium text-foreground'>{endItem}</span> of{" "}
        <span className='font-medium text-foreground'>{total}</span> properties
      </p>

      <Pagination className='w-auto'>
        <PaginationContent className='flex-wrap justify-center'>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              aria-disabled={navigationDisabled}
              tabIndex={navigationDisabled ? -1 : undefined}
              className={
                navigationDisabled
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={handlePrevious}
            />
          </PaginationItem>

          {pageItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isCurrent = item === currentPage;

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href='#'
                  isActive={isCurrent}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : undefined}
                  className={
                    disabled ? "pointer-events-none opacity-50" : undefined
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    handlePageChange(item);
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href='#'
              aria-disabled={nextDisabled}
              tabIndex={nextDisabled ? -1 : undefined}
              className={
                nextDisabled ? "pointer-events-none opacity-50" : undefined
              }
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </nav>
  );
}

export default memo(PropertyPagination);
