import React from "react";
import { removeFileExtension } from "../../utils/removeFileExtension";

export default function HistoriqueTable({ itemsDisplay }) {
  async function handleButtonClick(id: number, name: string, type: string) {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const formData = new FormData();
      formData.append("type", type);
      const response = await fetch(`${apiUrl}/download_file/${id}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to download");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL;
    } catch (e) {
      console.log(e);
    }
  }

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
              {removeFileExtension(item.file_name)}
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              <button
                type="button"
                onClick={() => {
                  handleButtonClick(item.id, item.name_valid_data, "valid");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                Download
              </button>
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              <button
                type="button"
                onClick={() => {
                  handleButtonClick(item.id, item.name_invalid_data, "invalid");
                }}
                className="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                Download
              </button>
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
