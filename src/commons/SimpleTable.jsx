import React, { useState } from "react";
import "../styles/simpletable.css";
import { Link } from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function SimpleTable({ data }) {
  const columns = [
    { header: "id", accessorKey: "id" },
    { header: "name", accessorKey: "name" },
    { header: "lastName", accessorKey: "lastName" },
    { header: "email", accessorKey: "email" },
  ];

  const [filtering, setFiltering] = useState("");

  const handleFilter = (e) => {
    setFiltering(e.target.value);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="tabla">
      <input
        type="text"
        value={filtering}
        onChange={handleFilter}
        className="tablainput"
        placeholder="search"
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td>
                  <Link to={`/perfil/${row.original.id}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="botones">
        <button
          className="btn btn-primary"
          onClick={() => table.setPageIndex(0)}
        >
          Primera pagina
        </button>
        <button
          className="btn btn-primary"
          onClick={() => table.previousPage()}
        >
          Pagina anterior
        </button>
        <button className="btn btn-primary" onClick={() => table.nextPage()}>
          Siguiente pagina
        </button>
        <button
          className="btn btn-primary"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima pagina
        </button>
      </div>
    </div>
  );
}

export default SimpleTable;
