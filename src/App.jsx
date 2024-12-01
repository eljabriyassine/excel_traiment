import { useEffect, useState } from "react";
import reactLogo from "./assets/remove.png";
import viteLogo from "/vite.svg";
import "./App.css";
import ExcelProcessor from "./components/excel-process";
import Example from "./components/pagination.tsx";

function App() {
  const [data, setData] = useState([]);
  const hanldeReq = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/get_all_file_excel`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    hanldeReq();
  }, []);
  return (
    <>
      <div className="">
        <hello />
        {/* <ExcelProcessor /> */}
        <Example data={data} />
      </div>
    </>
  );
}

export default App;
