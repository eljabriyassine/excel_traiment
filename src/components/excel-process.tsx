"use client";

import React, { useEffect, useState } from "react";
import { Upload, FileCheck, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { ToastContainer, collapseToast, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewExcel from "./preview-excel";
import RightSide from "./right-side";
import JSZip from "jszip";

interface SelectedOptions {
  [key: string]: string;
}

export default function ExcelProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadFile, setDownloadFile] = useState<Blob | null>(null);
  const [downloadInvalidFile, setDownloadInvalidFile] = useState<Blob | null>(
    null
  );
  const [fileNames, setFileNames] = useState<string[]>([]);

  const [preview, setPreview] = useState<string[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isAllColumnSelected, setIsAllColumnSelected] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

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

  //   useEffect(() => {
  //     alert("Selected Options" + JSON.stringify(selectedOptions));
  //     setIsAllColumnSelected(
  //       Object.keys(selectedOptions).length === collapseToast.length
  //     );
  // 	console.log(Object.keys(selectedOptions).length) ;
  // 	console.log(preview[0].length) ;
  //   }, [selectedOptions]);

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedOptions", JSON.stringify(selectedOptions));

      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/process_excel`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      console.log(response);

      const blob = await response.blob();
      const zip = await JSZip.loadAsync(blob);
      // Get all files in the ZIP as an array

      const fileNames = Object.keys(zip.files);
      console.log("Files in ZIP:", fileNames); // Log the file names
      setFileNames(fileNames);

      const fileArray = Object.values(zip.files);

      const validFile = fileArray[0];
      const invalidFile = fileArray[1];

      if (validFile) {
        const validBlob = new Blob([await validFile.async("blob")], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        alert("Valid File");
        setDownloadFile(validBlob);
      }

      if (invalidFile) {
        const invalidBlob = new Blob([await invalidFile.async("blob")], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        setDownloadInvalidFile(invalidBlob);
      }

      //   setDownloadFile(blob);

      setIsProcessed(true);
      setIsProcessing(false);
      setFile(null);
      setPreview([]);
    } catch (error) {
      console.log(
        "An error occurred while processing the file." + error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedFile = (file: Blob, fileName: string) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
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

  const removeIconClicked = () => {
    setFile(null);
    setPreview([]);
    setDownloadFile(null);
    setDownloadInvalidFile(null);
    setIsProcessed(false);
    setIsProcessed(false);
    setSelectedOptions({});
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
            <Button onClick={notify}>Notify</Button>
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
                    removeIconClicked={removeIconClicked}
                  />
                )}
                <div className="mt-4">
                  <button
                    onClick={processFile}
                    disabled={
                      !file ||
                      isProcessing ||
                      isProcessed ||
                      !isAllColumnSelected
                      //   !isAllColumnSelected
                    }
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
                        {downloadFile && (
                          <button
                            type="button"
                            onClick={() => {
                              downloadProcessedFile(downloadFile, fileNames[0]);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Download Processed File
                          </button>
                        )}
                        {downloadInvalidFile && (
                          <button
                            type="button"
                            onClick={() => {
                              downloadProcessedFile(
                                downloadInvalidFile,
                                fileNames[1]
                              );
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Download Processed File
                          </button>
                        )}
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
          <RightSide
            cols={preview[0]}
            setIsAllColumnSelected={setIsAllColumnSelected}
            setSelectedOptions={setSelectedOptions}
            selectedOptions={selectedOptions}
          />
        </div>
      )}
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children + "Button"}</button>;
}
