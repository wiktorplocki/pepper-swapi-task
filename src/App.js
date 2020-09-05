import React from "react";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import { ScoreBoard } from "./components/ScoreBoard/ScoreBoard";
import { ResourceSelect } from "./components/ResourceSelect/ResourceSelect";
import { ScoreCountProvider } from "./contexts/scoreContext";

function App() {
  return (
    <ScopedCssBaseline>
      <ScoreCountProvider>
        <ScoreBoard />
        <ResourceSelect />
      </ScoreCountProvider>
    </ScopedCssBaseline>
  );
}

export default App;
