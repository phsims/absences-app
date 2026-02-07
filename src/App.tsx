import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAbsences } from "./hooks/useAbsences";
import { useConflict } from "./hooks/useConflict";



function App() {
  const { data: absences ,fetchAbsences} = useAbsences();
  const { data: conflict, fetchConflict} = useConflict();

  useEffect(() => {
    fetchAbsences();
    fetchConflict(18);
  }, []);

  console.log('Absences:', absences);
  console.log('Conflicts:', conflict);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

    </>
  );
}

export default App;
