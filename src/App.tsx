import { useState } from "react";
import "./App.css";
import Payment from "./components/Payment";
import MachineInitForm from "./components/MachineInitForm";

const App = () => {
  const [showMachineInit, setShowMachineInit] = useState(true);

  return (
    <div className="h-full flex flex-col items-center ">
      <p className="text-3xl font-bold mt-4">Change Machine Application</p>
      {showMachineInit && (
        <MachineInitForm onMachineInit={() => setShowMachineInit(false)} />
      )}
      {!showMachineInit && <Payment />}
    </div>
  );
};

export default App;
