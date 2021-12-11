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
  return (
    <>
      <h2 className="text-3xl">
        <span className="accent-text">Xathon</span> contract {name}
      </h2>
      <p>Sending funds to recipient at address {recipient}</p>
      <p className="text-xl">{description}</p>
      <p>unit: {unit}</p>
      <p>minimumDeposit: {minimumDeposit}</p>
      <p>donationPerUnit: {donationPerUnit}</p>
    </>
  );
};

export default XathonDisplay;
