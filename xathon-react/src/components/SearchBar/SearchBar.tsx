import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input/Input";
import wf from "../../services/contracts/walkathonFactory";
import Dropdown from "../Dropdown/Dropdown";
import WalkathonFactory from "../../services/contracts/walkathonFactory";

interface Props {
  queryItems: string[];
  setQueryItems: React.Dispatch<React.SetStateAction<string[]>>;
}
const SearchBar: React.FC<Props> = ({ queryItems, setQueryItems }) => {
  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [returnedItems, setReturnedItems] = React.useState<string[]>([]);

  useEffect(() => {
    const getWalkathons = async () => {
      const walkathons = await WalkathonFactory.getDeployedWalkathons();
      walkathons && setQueryItems(walkathons);
    };
    getWalkathons();
  }, [WalkathonFactory, setQueryItems]);

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
  return (
    <>
      <label htmlFor="search" className="text-lg font-bold">
        Search for a <span className="accent-text">Xathon</span>
      </label>
      <Input
        name="search"
        type="search"
        showLabel={false}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        dropdownActive={dropdownActive}
        onBlur={handleOnBlur}
        icon={<AiOutlineSearch className="block m-auto hover:text-gray-500" />}
        width="responsive-component-width"
      />
      {dropdownActive && (
        <Dropdown returnedItems={returnedItems} setQuery={setQuery} />
      )}
    </>
  );
};

export default SearchBar;
