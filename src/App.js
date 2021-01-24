import Bit from "./components/Bit";
import { useState, useEffect } from "react";

function App() {
  const [removeFocus, setRemovefocus] = useState([]);

  const moveFocus = () => {
    removeFocus.forEach((e) => e());
    //setRemovefocus([]);
  };

  return <Bit moveFocus={moveFocus} setRemovefocus={setRemovefocus} />;
}

export default App;
