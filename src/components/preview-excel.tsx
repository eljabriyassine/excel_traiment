import React from "react";

import removeIcon from "../assets/remove.png";

export default function PreviewExcel({ preview, setPreview, setFile }) {
  return (
    <div>
      <div className="mb-6  bg-red-500">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {preview.length > 0 && (
                <div>
                  <div>
                    <h3 className="font-semibold mb-2">File Preview:</h3>

                    <img
                      src={removeIcon}
                      onClick={() => {
                        setPreview([]);
                        setFile(null);
                      }}
                      className="w-10 h-10 absolute right-2 top-2 cursor-pointer "
                    ></img>
                  </div>
                  <div className="overflow-x-auto  h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {preview[0].map((header: any, index: any) => (
                            <th
                              key={index}
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {preview.slice(1).map((row: any, rowIndex: any) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
