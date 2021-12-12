import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import Textarea from "../TextArea/Textarea";
import XathonFactory from "../../services/contracts/xathonFactory";
import { CgSpinner } from "react-icons/cg";
import ErrorText from "../ErrorText/ErrorText";

interface FormValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

interface CreateXathonProps {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}
const CreateXathon: React.FC<CreateXathonProps> = ({ setAddress }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      address: "",
      name: "",
      unit: "",
      description: "",
      minimumDeposit: 0,
    },
  });

  return (
    <form
      className="responsive-component-width p-4 flex flex-col justify-items-start items-start"
      onSubmit={handleSubmit(async (data) => {
        setIsSubmitting(true);
        try {
          await XathonFactory.deployXathon(data);
          const address = await XathonFactory.getAddress(data.name);
          setAddress(address);
        } catch (err) {
          setError(
            "Some error has occurred. Check that you confirmed the transaction in MetaMask, and that the contract name is unique"
          );
        }
        setIsSubmitting(false);
      })}
      data-testid="form"
      id="create-xathon"
    >
      <h3 className="font-semibold text-xl self-center">
        Create a new <span className="accent-text">Xathon</span> contract
      </h3>
      <ErrorText className="text-md">{error}</ErrorText>
      <Input
        type="text"
        {...register("address", {
          required: "*Address is required",
          pattern: {
            value: /0x[a-fA-F0-9]{40}/,
            message: "*Must by an ethereum address",
          },
        })}
        errorText={errors.address && errors.address.message}
        labelText="Donation recipient address"
        placeholder="Enter address"
        width="w-2/3"
      />
      <Input
        type="text"
        {...register("name", {
          required: "*Name is required",
          maxLength: {
            value: 50,
            message: "*Must be less than 50 characters in length",
          },
        })}
        errorText={errors.name && errors.name.message}
        labelText="Xathon name"
        placeholder="Enter name"
        width="w-2/3"
      />
      <Textarea
        placeholder="Enter description"
        className="block w-2/3"
        {...register("description")}
      />
      <Input
        type="text"
        {...register("unit", {
          maxLength: {
            value: 20,
            message: "*Must be less than 20 characters in length",
          },
        })}
        labelText="Unit for xathon"
        errorText={errors.unit && errors.unit.message}
        placeholder="miles"
        width="w-30"
      />
      <Input
        type="text"
        {...register("minimumDeposit", { valueAsNumber: true })}
        errorText={errors.minimumDeposit && errors.minimumDeposit.message}
        labelText="Minimum deposit"
        placeholder="0"
        width="w-20"
      />
      <SubmitButton form="create-xathon" className="self-center">
        {isSubmitting ? (
          <span>
            <CgSpinner className="h-5 w-5 mr-1 inline animate-spin" />
            Submitting
          </span>
        ) : (
          "Create"
        )}
      </SubmitButton>
      <p className="text-sm self-center mt-1">
        Your request could take a while to complete
      </p>
    </form>
  );
};

export default CreateXathon;
