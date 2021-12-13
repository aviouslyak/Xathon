import React from "react";
import useXathon from "../../hooks/useXathon";
interface XathonDisplayProps {
  address: string;
}
const XathonDisplay: React.FC<XathonDisplayProps> = ({ address }) => {
  const {
    name,
    description,
    unit,
    recipient,
    minimumDeposit,
    donationPerUnit,
  } = useXathon(address);

  const stripSCharacter = (s: string): string => {
    const regex = /^[0-9]/;
    if (s.endsWith("s") && !regex.test(s)) {
      return s.substring(0, s.length - 1);
    }
    return s;
  };

  return (
    <>
      <div className="border-b-2 p-2 mb-2 dark:border-gray-600 border-gray-300 flex flex-col items-center w-1/3 px-5">
        <h2 className="text-3xl">
          <span className="accent-text">Xathon</span> contract {name}
        </h2>

        <p className="text-lg self-start">{description}</p>
      </div>
      <p>Recipient: {recipient}</p>
      <p>
        Current donation value is {donationPerUnit} per {stripSCharacter(unit)}{" "}
      </p>
      <p>minimumDeposit: {minimumDeposit}</p>
    </>
  );
};

export default XathonDisplay;
