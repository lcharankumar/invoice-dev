import { createContext, useReducer } from "react";
import ArabicReducer from "./arabicReducer";

const INITIAL_STATE = {
  arabic: false,
};

export const ArabicContext = createContext(INITIAL_STATE);

export const ArabicContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ArabicReducer, INITIAL_STATE);

  return (
    <ArabicContext.Provider
      value={{ arabic: state.arabic, dispatch1: dispatch }}
    >
      {children}
    </ArabicContext.Provider>
  );
};
