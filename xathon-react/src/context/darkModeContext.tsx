import React, { createContext, useEffect, useState } from "react";
const DarkModeContext = createContext<[boolean, () => void]>([false, () => {}]);

interface Props {
  children: React.ReactNode;
}
const DarkModeProvider: React.FC<Props> = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    let darkModeEnabled: string | null =
      window.localStorage.getItem("darkModeEnabled");
    if (darkModeEnabled === null) {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      //      console.log(`System Preference = ${systemPreference}`);
      darkModeEnabled = systemPreference.toString();
      window.localStorage.setItem("darkModeEnabled", darkModeEnabled);
    }
    setDarkMode(darkModeEnabled === "true" ? true : false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("darkModeEnabled", darkMode.toString());
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={[darkMode, toggleDarkMode]}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;
export { DarkModeProvider };
