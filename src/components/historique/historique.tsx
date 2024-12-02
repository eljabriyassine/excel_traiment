import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import HistoriqueTable from "./historique-table";

export default function Historique({ data }) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [numberOfPage, setnumberOfPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [itemsDisplay, setItemsDisplay] = useState<any[]>();

  const handlePageChange = (e: any) => {
    const val = e.target.textContent;
    setCurrentPage(Number(val));
  };

  useEffect(() => {
    setnumberOfPage(Math.ceil(data.length / itemsPerPage));
    setItemsDisplay(
      data.slice(
        itemsPerPage * Number(currentPage) - itemsPerPage,
        itemsPerPage * Number(currentPage)
      )
    );
  }, [itemsPerPage, currentPage, data]);

  const handleOptionChange = (e: any) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePrevChange = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextChange = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numberOfPage));
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col gap-4">
        <div className="w-3/5 rounded-md shadow-md overflow-hidden">
          <div className="my-4">
            <select
              value={itemsPerPage}
              onChange={handleOptionChange}
              className="w-60 m-auto mr-1 rounded-lg   block  p-2.5"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <HistoriqueTable itemsDisplay={itemsDisplay} />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        numberOfPage={numberOfPage}
        handleNextChange={handleNextChange}
        handlePageChange={handlePageChange}
        handlePrevChange={handlePrevChange}
      />
    </>
  );
}
