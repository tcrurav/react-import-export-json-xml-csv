import { showSaveFilePicker } from "show-open-file-picker";

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