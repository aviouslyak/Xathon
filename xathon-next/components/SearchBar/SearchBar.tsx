import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Router from "next/router";
import { XathonFactoryReader } from "../../services/contracts/XathonFactory";

interface Props {
  queryItems: string[];
}

const SearchBar: React.FC<Props> = ({ queryItems }) => {
  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [returnedItems, setReturnedItems] = React.useState<string[]>([]);
  const [error, setError] = React.useState("");

  useEffect(() => {
    // if address, set as address
    if (query.startsWith("0x")) {
      setReturnedItems([query]);
      // filter items to items that start with query
    } else {
      setReturnedItems(
        queryItems.filter((item) => {
          return item.startsWith(query) && query !== "";
        })
      );
    }
  }, [query, queryItems]);

  useEffect(() => {
    // if only one item in dropdown && that item is the query, don't display dropdown
    if (
      returnedItems.length === 1 &&
      !query.startsWith("0x") &&
      query === returnedItems[0]
    ) {
      setDropdownActive(false);
    } else if (returnedItems.length > 0 || query.startsWith("0x")) {
      setDropdownActive(true);
    } else {
      setDropdownActive(false);
    }

    setError("");
  }, [query, returnedItems]);

  const handleOnBlur = () => {
    setTimeout(() => {
      setDropdownActive(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const xathonFactoryReader = new XathonFactoryReader();
    const match = /^0x[a-fA-F0-9]{40}$/;
    if (match.test(query)) {
      Router.push(`/${query}`);
      return;
    }

    try {
      const address = await xathonFactoryReader.getContractAddress(query);
      address && Router.push(`/${address}`);
    } catch (err: any) {
      setError("Contract not found");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 text-center">
      <label htmlFor="search" className="font-bold text-2xl">
        Search
      </label>
      <Input
        name="search"
        type="search"
        showLabel={false}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        dropdownActive={dropdownActive}
        onBlur={handleOnBlur}
        placeholder="Search for a xathon"
        errorText={error}
        id="search"
        icon={
          <button
            data-testid="submit-button"
            className="block m-auto"
            type="submit"
          >
            <AiOutlineSearch className="transition-transform transform hover:scale-125" />
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
