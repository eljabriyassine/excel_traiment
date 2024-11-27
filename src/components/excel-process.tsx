"use client";

import React, { useState } from "react";
import { Upload, FileCheck, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewExcel from "./preview-excel";
import RightSide from "./right-side";

export default function ExcelProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadFile, setDownloadFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      generatePreview(selectedFile);
    }
  };

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;

      // Parse the Excel file using the XLSX library
      const workbook = XLSX.read(content, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setPreview(data as string[][]);
    };
    reader.readAsBinaryString(file);
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/process_excel`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const blob = await response.blob();

      setDownloadFile(blob);

      setIsProcessed(true);
      setIsProcessing(false);
      setFile(null);
    } catch (error) {
      console.log(
        "An error occurred while processing the file." + error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedFile = () => {
    if (!downloadFile) return;

    const url = URL.createObjectURL(downloadFile);

    const a = document.createElement("a");
    a.href = url;
    a.download = "processed_file.xlsx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const convertNextOne = async () => {
    setFile(null);
    setPreview([]);
    setDownloadFile(null);
    setIsProcessed(false);
    setIsProcessed(false);
  };

  const notify = () => {
    toast.error("This is a toast error !");
    // toast.warning("This is a toast warning !");
    // toast.loading("This is a toast loading !");
    // toast.dark("This is a toast dark !");
    // toast.play();
    // toast.pause();
    // toast.dismiss();
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div
        className={`${
          preview.length > 0 ? "flex-[3]" : "flex-[1] justify-center"
        } w-full text-center min-h-screen bg-gray-100  px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Excel File Processor
          </h1>
          <div>
            <Button onClick={notify}>Notify !</Button>
            <ToastContainer position="top-left" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 relative">
            {!downloadFile && (
              <div>
                {!file ? (
                  <div className="mb-6">
                    <label
                      htmlFor="file-upload"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Upload Excel File
                    </label>
                    <div className="mt-1 cursor-pointer flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Choose a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".xlsx,.xls,.csv,.pdf"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs  text-gray-500 text-center">
                          Excel or CSV files
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <PreviewExcel
                    preview={preview}
                    setPreview={setPreview}
                    setFile={setFile}
                  />
                )}
                <div className="mt-4">
                  <button
                    onClick={processFile}
                    disabled={!file || isProcessing || isProcessed}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Processing...
                      </>
                    ) : (
                      "Process File"
                    )}
                  </button>
                </div>
              </div>
            )}

            {isProcessed && (
              <div className="mt-6">
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex justify-center items-center flex-col">
                    <div className="flex-shrink-0">
                      <FileCheck
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Processing complete
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Your file has been successfully processed.</p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={downloadProcessedFile}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Download Processed File
                        </button>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={convertNextOne}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Convert Next One
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {preview.length > 0 && (
        <div className="flex-[2] ">
          <RightSide cols={preview[0]} />
        </div>
      )}
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children + "Button"}</button>;
}
