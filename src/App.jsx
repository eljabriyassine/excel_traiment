import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
      <BrowserRouter>
        <nav class=" bg-gray-50 dark:bg-gray-700 ">
          <div className="w-4/5 mx-auto px-4 py-3 flex items-center justify-between">
            <div class="flex items-center">
              <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/historique"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Historique
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route index element={<ExcelProcessor />} />
          <Route path="/historique" element={<Example data={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
