interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
  isFetching: boolean;
}

export default function Pagination({ currentPage, onPageChange, hasMore, isFetching }: PaginationProps) {
  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="join bg-white shadow-sm border border-gray-200">
        <button 
          className="join-item btn btn-sm btn-ghost" 
          disabled={currentPage === 1 || isFetching}
          onClick={() => onPageChange(currentPage - 1)}
        >
          « Назад
        </button>
        <button className="join-item btn btn-sm btn-ghost pointer-events-none font-normal">
           Сторінка {currentPage}
        </button>
        <button 
          className="join-item btn btn-sm btn-ghost" 
          disabled={!hasMore || isFetching}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Далі »
        </button>
      </div>
    </div>
  );
}