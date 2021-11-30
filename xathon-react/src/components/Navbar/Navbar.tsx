import React from "react";

interface Props {
  children: React.ReactNode;
}
const Navbar: React.FC<Props> = (props) => {
  return (
    <nav className="shadow-md flex md:justify-between lg:justify-between justify-center  p-5 top-0 w-screen">
      {props.children}
    </nav>
  );
};

export default Navbar;
