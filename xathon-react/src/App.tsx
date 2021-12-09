import Page from "./components/Page/Page";
import PageHeader from "./components/TitleHeader/TitleHeader";
import { DarkModeProvider } from "./context/darkModeContext";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import Navbar from "./components/Navbar/Navbar";
import { FaWalking } from "react-icons/fa";
import SearchBar from "./components/SearchBar/SearchBar";
import { SiEthereum } from "react-icons/si";
import React, { useState } from "react";
import CreateXathon from "./components/CreateXathon/CreateXathon";
import NoMetaMask from "./components/NoMetaMask/NoMetaMask";

declare let window: any;
const App: React.FC = () => {
  const [queryItems, setQueryItems] = useState<string[]>([]);
  const [isMetaMaskActive] = useState<boolean>(
    window.ethereum ? window.ethereum.isMetaMask : false
  );
  const [contractAddress, setContractAddress] = useState("");

  return (
    <DarkModeProvider>
      <Page>
        <Navbar>
          <div className="flex">
            <PageHeader text="Xathon" />
            <FaWalking className="w-full h-full accent-text" />
          </div>
          <DarkModeToggle />
        </Navbar>

        {isMetaMaskActive ? (
          <div className="w-screen flex justify-items-center items-center flex-col mt-5">
            <div className="md: mt-5  w-full accent-gradient flex flex-col justify-items-center items-center mb-5">
              <h3 className="text-xl py-5">
                <b>Charity</b> powered by{" "}
                <span className="accent-text font-bold">
                  Ether
                  <SiEthereum className="inline text-2xl" />
                </span>
              </h3>
            </div>

            <SearchBar
              queryItems={queryItems}
              setQueryItems={setQueryItems}
              setContractAddress={setContractAddress}
            />
            {contractAddress ? null : <CreateXathon />}
          </div>
        ) : (
          <NoMetaMask />
        )}
      </Page>
    </DarkModeProvider>
  );
};

export default App;
