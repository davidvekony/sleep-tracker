import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../../config/firebase.config";

const SleepDataContext = createContext();

export const useSleepData = () => useContext(SleepDataContext);

export const SleepDataContextProvider = ({ children }) => {
  const [sleepData, setSleepData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <SleepDataContext.Provider value={{}}>
      {loading ? null : children}
    </SleepDataContext.Provider>
  );
};
