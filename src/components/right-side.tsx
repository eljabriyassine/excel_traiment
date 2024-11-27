import React, { useEffect, useState } from "react";

interface RightSideProps {
  cols: string[];
}

interface SelectedOptions {
  [key: string]: string;
}

export default function RightSide({ cols }: RightSideProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleChange = (col: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [col]: value,
    }));
  };

  useEffect(() => {
    console.log(selectedOptions);
    alert("Selected Options: " + JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const options = ["telephone", "TIERS", "MONTANT_IMP"];

  return (
    <div>
      {cols.map((col: any, index: any) => {
        return (
          <form className="max-w-sm mx-auto">
            <div key={index}>
              <label htmlFor="countries" className=" mb-2 text-sm font-medium ">
                {col}
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
          </form>
        );
      })}
    </div>
  );
}
