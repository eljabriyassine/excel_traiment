import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ExcelProcessor from "./components/ExcelProcessing/excel-process.tsx";
import NavBar from "./components/header/nav-bar.tsx";
import Historique from "./components/historique/historique.tsx";

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
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<ExcelProcessor />} />
          <Route path="/historique" element={<Historique data={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
