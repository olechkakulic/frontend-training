import { Select } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { PARAM_LABELS, VALUE_LABELS } from "../../constants/labels";
import { ClearableNumberInput, ClearableTextInput } from "./ClearableField";
import type { 
  AdFormValues, 
  AutoParams, 
  RealEstateParams, 
  ElectronicsParams 
} from "../../types/types";

const warningStyle = (isEmpty: boolean) => ({
  input: isEmpty ? { borderColor: "orange" } : undefined,
});

export const AutoFields = ({ form }: { form: UseFormReturnType<AdFormValues> }) => {
  const params = form.values.params as AutoParams;

  return (
    <>
      <ClearableTextInput
        label={PARAM_LABELS.brand}
        {...form.getInputProps("params.brand")}
        styles={warningStyle(!params.brand)}
      />
      <ClearableTextInput
        label={PARAM_LABELS.model}
        {...form.getInputProps("params.model")}
        styles={warningStyle(!params.model)}
      />
      <ClearableNumberInput
        label={PARAM_LABELS.yearOfManufacture}
        {...form.getInputProps("params.yearOfManufacture")}
        min={1800}
        max={new Date().getFullYear()}
        styles={warningStyle(!params.yearOfManufacture)}
      />
      <Select
        label={PARAM_LABELS.transmission}
        data={[
          { value: "automatic", label: VALUE_LABELS.automatic },
          { value: "manual", label: VALUE_LABELS.manual },
        ]}
        {...form.getInputProps("params.transmission")}
        styles={warningStyle(!params.transmission)}
      />
      <ClearableNumberInput
        label={PARAM_LABELS.mileage}
        {...form.getInputProps("params.mileage")}
        min={0}
        styles={warningStyle(
          params.mileage === undefined || 
          params.mileage === null || 
          (params.mileage as unknown as string) === ""
        )}
      />
      <ClearableNumberInput
        label={PARAM_LABELS.enginePower}
        {...form.getInputProps("params.enginePower")}
        min={0}
        styles={warningStyle(
          params.enginePower === undefined || 
          params.enginePower === null || 
          (params.enginePower as unknown as string) === ""
        )}
      />
    </>
  );
};

export const RealEstateFields = ({ form }: { form: UseFormReturnType<AdFormValues> }) => {
  const params = form.values.params as RealEstateParams;

  return (
    <>
      <Select
        label={PARAM_LABELS.type}
        data={[
          { value: "flat", label: VALUE_LABELS.flat },
          { value: "house", label: VALUE_LABELS.house },
          { value: "room", label: VALUE_LABELS.room },
        ]}
        {...form.getInputProps("params.type")}
        styles={warningStyle(!params.type)}
      />
      <ClearableTextInput
        label={PARAM_LABELS.address}
        {...form.getInputProps("params.address")}
        styles={warningStyle(!params.address)}
      />
      <ClearableNumberInput
        label={PARAM_LABELS.area}
        {...form.getInputProps("params.area")}
        min={0}
        styles={warningStyle(
          params.area === undefined || 
          params.area === null || 
          (params.area as unknown as string) === ""
        )}
      />
      <ClearableNumberInput
        label={PARAM_LABELS.floor}
        {...form.getInputProps("params.floor")}
        styles={warningStyle(
          params.floor === undefined || 
          params.floor === null || 
          (params.floor as unknown as string) === ""
        )}
      />
    </>
  );
};

export const ElectronicsFields = ({ form }: { form: UseFormReturnType<AdFormValues> }) => {
  const params = form.values.params as ElectronicsParams;

  return (
    <>
      <Select
        label={PARAM_LABELS.type}
        data={[
          { value: "phone", label: VALUE_LABELS.phone },
          { value: "laptop", label: VALUE_LABELS.laptop },
          { value: "misc", label: VALUE_LABELS.misc },
        ]}
        {...form.getInputProps("params.type")}
        styles={warningStyle(!params.type)}
      />
      <ClearableTextInput
        label={PARAM_LABELS.brand}
        {...form.getInputProps("params.brand")}
        styles={warningStyle(!params.brand)}
      />
      <ClearableTextInput
        label={PARAM_LABELS.model}
        {...form.getInputProps("params.model")}
        styles={warningStyle(!params.model)}
      />
      <ClearableTextInput
        label={PARAM_LABELS.color}
        {...form.getInputProps("params.color")}
        styles={warningStyle(!params.color)}
      />
      <Select
        label={PARAM_LABELS.condition}
        data={[
          { value: "new", label: VALUE_LABELS.new },
          { value: "used", label: VALUE_LABELS.used },
        ]}
        {...form.getInputProps("params.condition")}
        styles={warningStyle(!params.condition)}
      />
    </>
  );
};