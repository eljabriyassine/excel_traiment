import React, { useEffect, useState } from "react";

interface RightSideProps {
  cols: string[];
  setIsAllColumnSelected: any;
  setSelectedOptions: any;
  selectedOptions: any;
}

export default function RightSide({
  cols,
  setIsAllColumnSelected,
  setSelectedOptions,
  selectedOptions,
}: RightSideProps) {
  const handleChange = (col: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [col]: value,
    }));
  };

  useEffect(() => {
    setIsAllColumnSelected(Object.keys(selectedOptions).length === cols.length);
    console.log("selectedOptions", selectedOptions);
    console.log("Object" + Object.keys(selectedOptions).length);
    console.log("Cols" + cols.length);
  }, [selectedOptions]);

  const options = ["telephone", "montant", "user_agent", "ip", "date"];

  return (
    <div className="max-w-sm mx-auto">
      {cols.map((col: any, index: any) => {
        return (
          <form>
            <div key={index}>
              <label htmlFor="countries" className=" mb-2 text-sm font-medium ">
                {col}
                <span className="text-red-600 font-black ml-2">*</span>
              </label>
              <select
                id={`col-${index}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => handleChange(col, e.target.value)}
                required
              >
                <option value="" selected disabled hidden>
                  Type Column
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* crreat a button */}
          </form>
        );
      })}
    </div>
  );
}
