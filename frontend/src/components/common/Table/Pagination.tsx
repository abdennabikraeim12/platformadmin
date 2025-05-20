import { Table } from '@tanstack/react-table';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="btn"
        >
          Précédent
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="btn ml-3"
        >
          Suivant
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Affichage de <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> à{' '}
            <span className="font-medium">
              {table.getPageCount()}
            </span> sur{' '}
            <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> résultats
          </p>
        </div>
        <div className="flex space-x-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="select"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Afficher {size}
              </option>
            ))}
          </select>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="btn"
          >
            Précédent
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="btn"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}