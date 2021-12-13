import { useEffect, useRef, useState } from "react";
import Xathon from "../services/contracts/xathon";

interface xathonObject {
  recipient: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
  donationPerUnit: number;
}
const useXathon = (address: string): xathonObject => {
  const xathon = useRef(new Xathon(address));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [unit, setUnit] = useState("");
  const [minimumDeposit, setMinimumDeposit] = useState(0);
  const [donationPerUnit, setDonationPerUnit] = useState(0);

  const initializeValues = async () => {
    const x = xathon.current;
    setName(await x.getName());
    setDescription(await x.getDescription());
    setRecipient(await x.getRecipient());
    setUnit(await x.getUnit());
    setMinimumDeposit(parseInt(await x.getMinimumDeposit()));
    setDonationPerUnit(parseInt(await x.getDonationPerUnit()));
  };

  // initialize accounts, then initialize state
  useEffect(() => {
    initializeValues();
  }, []);

  return {
    name,
    description,
    recipient,
    unit,
    minimumDeposit,
    donationPerUnit,
  };
};

export default useXathon;
