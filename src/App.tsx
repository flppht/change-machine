import { useState } from "react";
import "./App.css";
import Payment from "./components/Payment";
import MachineInitForm from "./components/MachineInitForm";

const App = () => {
  const [showMachineInit, setShowMachineInit] = useState(true);

  return (
    <div className="App">
      <p className="text-3xl font-bold mt-4">Change Machine Application</p>
      {showMachineInit && (
        <MachineInitForm setShowMachineInit={setShowMachineInit} />
      )}
      {!showMachineInit && <Payment />}
    </div>
  );
};

export default App;
