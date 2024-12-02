export const removeFileExtension = (filename) => {
  return filename.slice(0, filename.lastIndexOf(".")) || filename;
};
