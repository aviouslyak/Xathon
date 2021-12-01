import React from "react";

const NoMetaMask: React.FC = () => {
  return (
    <div
      data-testid="no-meta-mask wrapper"
      className="w-screen flex flex-col items-center mt-5"
    >
      <h3 className="text-2xl">
        MetaMask is not installed. It is required for this application to
        function correctly.
      </h3>
      <h5 className="text-xl">
        Get it&nbsp;
        <a
          target="_blank"
          className="text-blue-500 underline"
          rel="noopener noreferrer"
          href="https://metamask.io"
        >
          here
        </a>
        &nbsp;and refresh the page.
      </h5>
    </div>
  );
};

export default NoMetaMask;
