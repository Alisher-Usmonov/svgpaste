export function fileToText(file: File | Blob) {
  const reader = new FileReader();

  reader.readAsText(file);

  return reader.onload = () => reader.result;
}