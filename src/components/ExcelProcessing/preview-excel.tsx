import React from "react";

import removeIcon from "../../assets/remove.png";
import ExcelTablePreview from "./excel-table-preview";

export default function PreviewExcel({ preview, removeIconClicked }) {
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
                        removeIconClicked();
                      }}
                      className="w-10 h-10 absolute right-2 top-2 cursor-pointer "
                    ></img>
                  </div>
                  <ExcelTablePreview preview={preview} />
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
