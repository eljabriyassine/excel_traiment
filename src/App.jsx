import { useState } from "react";
import reactLogo from "./assets/remove.png";
import viteLogo from "/vite.svg";
import "./App.css";
import ExcelProcessor from "./components/excel-process";

function App() {
  return (
    <>
      <div className="text-center">
        <ExcelProcessor />
      </div>
    </>
  );
}

export default App;
