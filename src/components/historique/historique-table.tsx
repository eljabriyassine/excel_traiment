import React from "react";

export default function HistoriqueTable({ itemsDisplay }) {
  return (
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
            <td className="px-4 py-2 border-b border-gray-200">{item.id}</td>
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
  );
}
