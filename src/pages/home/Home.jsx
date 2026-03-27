import { useEffect, useState } from "react";
import ExportExamples from "../../components/export-examples/ExportExamples";
import FormExample from "../../components/form-example/FormExample";
import ImportExamples from "../../components/import-examples/ImportExamples";
import "./Home.css";
import { city } from "../../services/data-service/data-service";

function Home() {

  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setCurrentCity((prev) => city);
  }, [])

  const addLocation = (e) => {
    e.preventDefault()

    setCurrentCity((prev) => {
      return {
        ...prev,
        locations: [...prev.locations, {
          name: e.target["location-name"].value,
          surface: Number(e.target["location-surface"].value)
        }]
      }
    })

  }

  return (
    <>
      <div className="home-export-examples">
        <ExportExamples city={currentCity} />
      </div>
      <div className="home-import-examples">
        <ImportExamples />
      </div>
      <div className="home-form-example">
        <FormExample addLocation={addLocation} />
      </div>
    </>
  )
}

export default Home