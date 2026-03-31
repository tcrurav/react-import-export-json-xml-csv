import { showSaveFilePicker } from "show-open-file-picker";
import * as XLSX from "xlsx";

export const saveFileInFormat = async (format, data, fileName = "data.json") => {

  let description = "";
  let acceptedType = {};
  let content = "";

  switch (format) {
    case "json":
      description = "JSON";
      acceptedType = {
        "application/json": [".json"],
      };
      content = JSON.stringify(data, null, 2); // JSON data should be passed as JSON object
      break;
    case "xml":
      description = "XML";
      acceptedType = {
        "application/xml": [".xml"],
        "text/xml": [".xml"],
      };
      content = data; // XML data should be passed as a string
      break;
    case "csv":
      description = "CSV";
      acceptedType = {
        "text/csv": [".csv"],
      };
      content = data; // CSV data should be passed as a string
      break;
    case "xlsx":
      description = "Excel";
      acceptedType = {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      };
      const workbook = XLSX.utils.book_new();
      let worksheet;
      if (Array.isArray(data)) {
        worksheet = XLSX.utils.json_to_sheet(data);
      } else {
        worksheet = XLSX.utils.json_to_sheet([data]);
      }
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      content = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      break;
    case "ods":
      description = "OpenDocument Spreadsheet";
      acceptedType = {
        "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
      };
      {
        const wb = XLSX.utils.book_new();
        let ws;
        if (Array.isArray(data)) {
          ws = XLSX.utils.json_to_sheet(data);
        } else {
          ws = XLSX.utils.json_to_sheet([data]);
        }
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const out = XLSX.write(wb, { bookType: "ods", type: "array" });
        content = new Blob([out], { type: "application/vnd.oasis.opendocument.spreadsheet" });
      }
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  const handle = await showSaveFilePicker({
    suggestedName: fileName,
    types: [
      {
        description: description,
        accept: acceptedType
      },
    ],
  });

  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
};