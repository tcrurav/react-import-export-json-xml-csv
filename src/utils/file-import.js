import { showOpenFilePicker } from "show-open-file-picker";
import Papa from "papaparse";
import * as XLSX from "xlsx";

function xmlNodeToObject(node) {
  const children = Array.from(node.children);

  if (children.length === 0) {
    return node.textContent?.trim() ?? "";
  }

  const result = {};

  for (const child of children) {
    const value = xmlNodeToObject(child);

    if (result[child.nodeName] !== undefined) {
      if (!Array.isArray(result[child.nodeName])) {
        result[child.nodeName] = [result[child.nodeName]];
      }
      result[child.nodeName].push(value);
    } else {
      result[child.nodeName] = value;
    }
  }

  return result;
}

function xmlToJson(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "application/xml");

  const errorNode = xmlDoc.querySelector("parsererror");
  if (errorNode) {
    throw new Error("XML invalid");
  }

  const root = xmlDoc.documentElement;

  return {
    [root.nodeName]: xmlNodeToObject(root),
  };
}

function csvToJson(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length) {
    throw new Error("CSV invalid");
  }

  return result.data;
}

function getExtension(fileName) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function parseFileContent(extension, text) {
  switch (extension) {
    case "json":
      return JSON.parse(text);

    case "xml":
      return xmlToJson(text);

    case "csv":
      return csvToJson(text);

    case "xlsx":
    case "xls":
    case "ods": {
      // `text` is expected to be an ArrayBuffer for Excel files
      const arrayBuffer = text;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const result = {};
      for (const sheetName of workbook.SheetNames) {
        result[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
      }

      return workbook.SheetNames.length === 1 ? result[workbook.SheetNames[0]] : result;
    }

    default:
      throw new Error(`Unsupported format: ${extension}`);
  }
}

export async function importFileToInternalJson() {
  const [fileHandle] = await showOpenFilePicker({
    multiple: false,
    types: [
      {
        description: "compatible files",
        accept: {
          "application/json": [".json"],
          "application/xml": [".xml"],
          "text/xml": [".xml"],
          "text/csv": [".csv"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          "application/vnd.ms-excel": [".xls"],
          "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
        },
      },
    ],
  });

  const file = await fileHandle.getFile();
  const extension = getExtension(file.name);

  let content;
  if (extension === "xlsx" || extension === "xls" || extension === "ods") {
    content = await file.arrayBuffer();
  } else {
    content = await file.text();
  }

  const data = parseFileContent(extension, content);

  return {
    fileName: file.name,
    format: extension,
    data,
  };
}