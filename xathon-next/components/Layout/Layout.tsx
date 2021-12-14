import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div
      className="w-screen h-screen bg-rose-400 text-slate-800"
      data-testid="page-wrapper"
    >
      <div className="flex w-full justify-center">
        <h1 className="text-6xl font-header border-2 border-rose-900 p-2 my-4 rounded-md shadow-md shadow-pink-900">
          Xathon
        </h1>
      </div>
      {children}
    </div>
  );
};
export default Layout;
