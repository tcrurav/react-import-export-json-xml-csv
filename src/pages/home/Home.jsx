import ExportExamples from "../../components/export-examples/ExportExamples";
import ImportExamples from "../../components/import-examples/ImportExamples";
import "./Home.css";

function Home() {

  return (
    <>
      <div className="home-export-examples">
        <ExportExamples />
      </div>
      <div className="home-import-examples">
        <ImportExamples />
      </div>
    </>
  )
}

export default Home