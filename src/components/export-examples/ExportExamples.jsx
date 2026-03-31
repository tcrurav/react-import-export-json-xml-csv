import "./ExportExamples.css";
import { saveFileInFormat } from "../../utils/file-export";

function ExportExamples() {

  const json = {
    name: "Telde",
    year: 2020,
    population: 102647,
    locations: [
      { name: "El Calero", surface: 10.5 },
      { name: "Melenara", surface: 15.5 }]
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
              <person>
                <name>Telde</name>
                <year>2020</year>
                <population>102647</population>
                <locations>
                  <location>
                    <name>El Calero</name>
                    <surface>10.5</surface>
                  </location>
                  <location>
                    <name>Melenara</name>
                    <surface>15.5</surface>
                  </location>
                </locations>
              </person>`;

  const csv = `name,year,population
Telde,2020,102647
San Bartolomé de Tirajana,2020,52025
Santa Lucía de Tirajana,2020,70235`;

  return (
    <>
      <h1>Export Examples</h1>
      <div className="export-buttons">
        <button onClick={() => saveFileInFormat("json", json, "result-file.json")}>Export to JSON</button>
        <button onClick={() => saveFileInFormat("xml", xml, "result-file.xml")}>Export to XML</button>
        <button onClick={() => saveFileInFormat("csv", csv, "result-file.csv")}>Export to CSV</button>
        <button onClick={() => saveFileInFormat("xlsx", [json], "result-file.xlsx")}>Export to XLSX</button>
        <button onClick={() => saveFileInFormat("ods", [json], "result-file.ods")}>Export to ODS</button>
      </div>

    </>
  )
}

export default ExportExamples