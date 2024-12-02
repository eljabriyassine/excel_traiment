import React from "react";

export default function Pagination({
  currentPage,
  numberOfPage,
  handlePrevChange,
  handlePageChange,
  handleNextChange,
}) {
  return (
    <div className="bg-white p-4 flex items-center flex-wrap justify-center">
      <nav aria-label="Page navigation">
        <ul className="inline-flex">
          <li>
            <button
              className="px-4 py-2 text-yellow-600 transition-colors duration-150 bg-white border border-r-0 border-yellow-600 rounded-l-lg focus:shadow-outline hover:bg-yellow-100 disabled:cursor-not-allowed disabled:bg-gray-200"
              onClick={handlePrevChange}
              disabled={Number(currentPage) === 1}
            >
              Prev
            </button>
          </li>

          {Array.from({ length: numberOfPage }, (_, i) => (
            <li key={i}>
              <button
                className={` ${
                  currentPage === i + 1 ? "bg-yellow-500" : ""
                }  px-4 py-2 text-yellow-600 transition-colors duration-150 bg-white border border-yellow-600 focus:shadow-outline hover:bg-yellow-100`}
                onClick={handlePageChange}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              className="px-4 py-2 text-yellow-600 transition-colors duration-150 bg-white border border-yellow-600 rounded-r-lg focus:shadow-outline hover:bg-yellow-100 disabled:cursor-not-allowed disabled:bg-gray-200"
              onClick={handleNextChange}
              disabled={Number(currentPage) === Number(numberOfPage)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
