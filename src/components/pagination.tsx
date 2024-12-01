import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

export default function Example({ data }) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const items = Array.from({ length: 40 }, (_, i) => i + 1);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [itemsDisplay, setItemsDisplay] = useState<number[]>();

  const handlePageChange = (e: any) => {
    const val = e.target.textContent;
    setCurrentPage(Number(val));
  };

  useEffect(() => {
    setNumPages(Math.ceil(items.length / itemsPerPage));
    setItemsDisplay(
      items.slice(
        itemsPerPage * Number(currentPage) - itemsPerPage,
        itemsPerPage * Number(currentPage)
      )
    );
  }, [itemsPerPage, currentPage]);

  const handleOptionChange = (e: any) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePrevChange = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextChange = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <>
      <div>
        <select onChange={handleOptionChange}>
          <option value={3}>3</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <button onClick={(e) => setItemsPerPage(10)}> click</button>
      <div className="w-full  flex justify-center items-center flex-col gap-2">
        {itemsDisplay?.map((item, index) => {
          return (
            <button
              key={index}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="bg-white p-4 flex items-center flex-wrap justify-center">
        <nav aria-label="Page navigation">
          <ul className="inline-flex">
            <li>
              <button
                className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 rounded-l-lg focus:shadow-outline hover:bg-green-100 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={handlePrevChange}
                disabled={Number(currentPage) === 1}
              >
                Prev
              </button>
            </li>

            {Array.from({ length: numPages }, (_, i) => (
              <li key={i}>
                <button
                  className={` ${
                    currentPage === i + 1 ? "bg-green-500" : ""
                  }  px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-green-600 focus:shadow-outline hover:bg-green-100`}
                  onClick={handlePageChange}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-green-600 rounded-r-lg focus:shadow-outline hover:bg-green-100 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={handleNextChange}
                disabled={Number(currentPage) === Number(numPages)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
