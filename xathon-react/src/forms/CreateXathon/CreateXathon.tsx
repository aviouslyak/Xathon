import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Textarea from "../../components/TextArea/Textarea";
import WalkathonFactory from "../../services/contracts/xathonFactory";

interface FormValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

const CreateWalkathonFactory: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      address: "",
      name: "",
      description: "",
      minimumDeposit: 0,
    },
  });
  return (
    <form
      className="responsive-component-width p-4 flex flex-col justify-items-start items-start"
      onSubmit={handleSubmit(async (data) => {
        console.log("SUBMITTING");
        const receipt = await WalkathonFactory.deployXathon(data);
        console.log(`DONE SUBMITTING: receipt = \n${receipt}`);
      })}
    >
      <h3 className="font-semibold text-xl self-center">
        Create new <span className="accent-text">Xathon</span> contract
      </h3>
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
        labelText="Enter donation recipient address"
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
        labelText="Enter xathon name"
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
          maxLength: { value: 20, message: "*Must be less than 20 characters" },
        })}
        labelText="Enter unit for xathon"
        placeholder="miles"
        width="w-30"
      />
      <Input
        type="text"
        {...register("minimumDeposit", { valueAsNumber: true })}
        errorText={errors.minimumDeposit && errors.minimumDeposit.message}
        labelText="Enter minimum deposit"
        placeholder="0"
        width="w-20"
      />
      <SubmitButton value="Create" className="self-center" />
    </form>
  );
};

export default CreateWalkathonFactory;
