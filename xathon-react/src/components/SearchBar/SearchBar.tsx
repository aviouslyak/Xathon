import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import XathonFactory from "../../services/contracts/xathonFactory";
import ErrorText from "../ErrorText/ErrorText";

interface Props {
  queryItems: string[];
  setQueryItems: React.Dispatch<React.SetStateAction<string[]>>;
  setContractAddress: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: React.FC<Props> = ({
  queryItems,
  setQueryItems,
  setContractAddress,
}) => {
  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [returnedItems, setReturnedItems] = React.useState<string[]>([]);
  const [error, setError] = React.useState("");

  useEffect(() => {
    const getXathons = async () => {
      const xathons = await XathonFactory.getDeployedXathons();
      xathons && setQueryItems(xathons);
    };
    getXathons();
  }, [setQueryItems]);

  useEffect(() => {
    if (query.startsWith("0x")) {
      setReturnedItems([query]);
    } else {
      setReturnedItems(
        queryItems.filter((item) => {
          return item.startsWith(query) && query !== "";
        })
      );
    }
  }, [query, queryItems]);

  useEffect(() => {
    if (returnedItems.includes(query) && !query.startsWith("0x")) {
      setDropdownActive(false);
    } else if (returnedItems.length > 0) {
      setDropdownActive(true);
    } else {
      setDropdownActive(false);
    }
  }, [query, returnedItems]);

  const handleOnBlur = () => {
    setTimeout(() => {
      setDropdownActive(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const address = await XathonFactory.getAddress(query);
      setContractAddress(address);
    } catch (err: any) {
      setError("Contract not found");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="responsive-component-width text-center"
    >
      <label htmlFor="search" className="text-lg font-bold">
        Search for a <span className="accent-text">Xathon</span>
      </label>
      <ErrorText>{error}</ErrorText>
      <Input
        name="search"
        type="search"
        showLabel={false}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        dropdownActive={dropdownActive}
        onBlur={handleOnBlur}
        id="search"
        icon={
          <button
            data-testid="submit-button"
            className="block m-auto"
            type="submit"
          >
            <AiOutlineSearch className="transition-transform hover:text-gray-500 transform hover:scale-110" />
          </button>
        }
        width=""
      />
      {dropdownActive && (
        <Dropdown returnedItems={returnedItems} setQuery={setQuery} />
      )}
    </form>
  );
};

export default SearchBar;
