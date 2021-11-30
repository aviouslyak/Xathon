import React, { useContext } from "react";
import { BiMoon } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import DarkModeContext from "../../context/darkModeContext";

const DarkModeToggle: React.FC = () => {
  const [darkMode, toggleDarkMode] = useContext(DarkModeContext);

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      className="p-3 border-2 rounded-full ml-2 hover:text-gray-500 dark:border-white border-gray-700"
    >
      {darkMode ? (
        <FiSun data-testid="darkModeIcon-sun" />
      ) : (
        <BiMoon data-testid="darkModeIcon-moon" />
      )}
    </button>
  );
};

export default DarkModeToggle;
