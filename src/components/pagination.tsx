import React, { useEffect, useState } from "react";

export default function Example({ data }) {
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
  }, [itemsPerPage, currentPage]);

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
          <table className="w-full text-sm text-center text-gray-700 border border-gray-200 ">
            <thead className="bg-yellow-600 text-white">
              <tr>
                <th scope="col" className="px-4 py-2">
                  ID
                </th>
                <th scope="col" className="px-4 py-2">
                  File
                </th>
                <th scope="col" className="px-4 py-2">
                  Valid File
                </th>
                <th scope="col" className="px-4 py-2">
                  Invalid File
                </th>
                <th scope="col" className="px-4 py-2">
                  Date Uploaded
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsDisplay?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } h-12 hover:bg-yellow-100`}
                >
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.file_name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.name_valid_data}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.name_invalid_data}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {item.uploaded_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </>
  );
}
