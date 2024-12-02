import * as XLSX from "xlsx";

export const generateExcelPreview = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content === "string") {
          const workbook = XLSX.read(content, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          resolve(data as string[][]);
        } else {
          reject(new Error("Failed to read file content."));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Error reading file."));
    reader.readAsBinaryString(file);
  });
};
