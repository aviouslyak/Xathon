import React, { useContext } from "react";
import DarkModeContext from "../../context/darkModeContext";

interface Props {
  children: React.ReactNode;
}
const Page: React.FC<Props> = (props) => {
  const [darkMode] = useContext(DarkModeContext);

  return (
    <div data-testid="page-wrapper" className={darkMode ? "dark" : ""}>
      <div
        data-testid="page"
        className="dark:bg-gray-800 h-screen w-screen dark:text-gray-300 overflow-y-scroll"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Page;
