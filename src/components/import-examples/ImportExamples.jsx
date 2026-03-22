import React, { useState } from "react";
import { importFileToInternalJson } from "../../utils/file-import";
import "./ImportExamples.css";

export default function ImportExamples() {
  const [internalJson, setInternalJson] = useState(null);
  const [error, setError] = useState("");

  const handleImport = async () => {
    try {
      setError("");
      const result = await importFileToInternalJson();
      setInternalJson(result);
    } catch (err) {
      if (err?.name === "AbortError") {
        return;
      }
      setError(err.message || "File import failed");
    }
  };

  return (
    <>
      <h1>Import Examples</h1>
      <div className="import-buttons">
        <div>
          <button onClick={handleImport}>Import File</button>
        </div>

        <div className="import-area">
          {error ?
            <p>{error}</p>
            :
            <pre>
              {internalJson
                ? JSON.stringify(internalJson, null, 2)
                : "No imported file yet"}
            </pre>
          }


        </div>

      </div>
    </>
  );
}