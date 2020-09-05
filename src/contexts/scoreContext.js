import React, { createContext, useReducer, useContext } from "react";

const ScoreStateContext = createContext();
const ScoreDispatchContext = createContext();

function scoreCountReducer(state, action) {
  switch (action.type) {
    case "increment_left":
      if (action.effect === "save") {
        localStorage.setItem("sw_scoreLeft", state.scoreLeftCount + 1);
      }
      return { ...state, scoreLeftCount: state.scoreLeftCount + 1 };
    case "increment_right":
      if (action.effect === "save") {
        localStorage.setItem("sw_scoreRight", state.scoreRightCount + 1);
      }
      return { ...state, scoreRightCount: state.scoreRightCount + 1 };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function ScoreCountProvider({ children }) {
  const initialState = {
    scoreLeftCount: Number(localStorage.getItem("sw_scoreLeft")) || 0,
    scoreRightCount: Number(localStorage.getItem("sw_scoreRight")) || 0,
  };

  const [state, dispatch] = useReducer(scoreCountReducer, initialState);

  return (
    <ScoreStateContext.Provider value={state}>
      <ScoreDispatchContext.Provider value={dispatch}>
        {children}
      </ScoreDispatchContext.Provider>
    </ScoreStateContext.Provider>
  );
}

function useScoreCountState() {
  const context = useContext(ScoreStateContext);
  if (context === undefined) {
    throw new Error(
      "useScoreCountState must be used within a ScoreCountProvider"
    );
  }
  return context;
}

function useScoreCountDispatch() {
  const context = useContext(ScoreDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useScoreCountDispatch must be used within a ScoreCountProvider"
    );
  }
  return context;
}

export { ScoreCountProvider, useScoreCountState, useScoreCountDispatch };
