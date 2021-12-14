import React from "react";

interface Props {
  returnedItems: string[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
const Dropdown: React.FC<Props> = ({ returnedItems, setQuery }) => {
  return (
    <div
      data-testid="dropdown-container"
      className="mt-0 flex flex-col items-start z-500 absolute w-1/2"
    >
      {returnedItems.slice(0, 5).map((item, i) => {
        return (
          <button
            key={i}
            className={`text-left ${
              i === 4 || i === returnedItems.length - 1 ? "rounded-b-lg" : ""
            } p-2 bg-pink-200 hover:bg-orange-400 shadow-lg shadow-pink-900 w-full overflow-ellipsis block whitespace-nowrap overflow-hidden`}
            onClick={() => {
              setQuery(item);
            }}
          >
            {item.startsWith("0x") ? `Contract with address '${item}'` : item}
          </button>
        );
      })}
    </div>
  );
};

export default Dropdown;
