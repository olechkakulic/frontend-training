import { ClearableTextInput, ClearableNumberInput } from "./ClearableField";
import type { UseFormReturnType } from "@mantine/form";
import { PARAM_LABELS, VALUE_LABELS } from "../../constants/labels";
import { Select } from "@mantine/core";

const warningStyle = (isEmpty: boolean) => ({
  input: isEmpty ? { borderColor: "orange" } : undefined,
});

export const AutoFields = ({ form }: { form: UseFormReturnType<any> }) => (
  <>
    <ClearableTextInput
      label={PARAM_LABELS.brand}
      {...form.getInputProps("params.brand")}
      styles={warningStyle(!form.values.params.brand)}
    />
    <ClearableTextInput
      label={PARAM_LABELS.model}
      {...form.getInputProps("params.model")}
      styles={warningStyle(!form.values.params.model)}
    />
    <ClearableNumberInput
      label={PARAM_LABELS.yearOfManufacture}
      {...form.getInputProps("params.yearOfManufacture")}
      min={1800}
      styles={warningStyle(!form.values.params.yearOfManufacture)}
    />
    <Select
      label={PARAM_LABELS.transmission}
      data={[
        { value: "automatic", label: VALUE_LABELS.automatic },
        { value: "manual", label: VALUE_LABELS.manual },
      ]}
      {...form.getInputProps("params.transmission")}
      styles={warningStyle(!form.values.params.transmission)}
    />
    <ClearableNumberInput
      label={PARAM_LABELS.mileage}
      {...form.getInputProps("params.mileage")}
      min={0}
      styles={warningStyle(form.values.params.mileage === undefined || form.values.params.mileage === null || form.values.params.mileage === "")}
    />
    <ClearableNumberInput
      label={PARAM_LABELS.enginePower}
      {...form.getInputProps("params.enginePower")}
      min={0}
      styles={warningStyle(form.values.params.enginePower === undefined || form.values.params.enginePower === null || form.values.params.enginePower === "")}
    />
  </>
);

export const RealEstateFields = ({
  form,
}: {
  form: UseFormReturnType<any>;
}) => (
  <>
    <Select
      label={PARAM_LABELS.type}
      data={[
        { value: "flat", label: VALUE_LABELS.flat },
        { value: "house", label: VALUE_LABELS.house },
        { value: "room", label: VALUE_LABELS.room },
      ]}
      {...form.getInputProps("params.type")}
      styles={warningStyle(!form.values.params.type)}
    />
    <ClearableTextInput
      label={PARAM_LABELS.address}
      {...form.getInputProps("params.address")}
      styles={warningStyle(!form.values.params.address)}
    />
    <ClearableNumberInput
      label={PARAM_LABELS.area}
      {...form.getInputProps("params.area")}
      styles={warningStyle(form.values.params.area === undefined || form.values.params.area === null || form.values.params.area === "")}
    />
    <ClearableNumberInput
      label={PARAM_LABELS.floor}
      {...form.getInputProps("params.floor")}
      styles={warningStyle(form.values.params.floor === undefined || form.values.params.floor === null || form.values.params.floor === "")}
    />
  </>
);

export const ElectronicsFields = ({
  form,
}: {
  form: UseFormReturnType<any>;
}) => (
  <>
    <Select
      label={PARAM_LABELS.type}
      data={[
        { value: "phone", label: VALUE_LABELS.phone },
        { value: "laptop", label: VALUE_LABELS.laptop },
        { value: "misc", label: VALUE_LABELS.misc },
      ]}
      {...form.getInputProps("params.type")}
      styles={warningStyle(!form.values.params.type)}
    />
    <ClearableTextInput
      label={PARAM_LABELS.brand}
      {...form.getInputProps("params.brand")}
      styles={warningStyle(!form.values.params.brand)}
    />
    <ClearableTextInput
      label={PARAM_LABELS.model}
      {...form.getInputProps("params.model")}
      styles={warningStyle(!form.values.params.model)}
    />
    <ClearableTextInput
      label={PARAM_LABELS.color}
      {...form.getInputProps("params.color")}
      styles={warningStyle(!form.values.params.color)}
    />
    <Select
      label={PARAM_LABELS.condition}
      data={[
        { value: "new", label: VALUE_LABELS.new },
        { value: "used", label: VALUE_LABELS.used },
      ]}
      {...form.getInputProps("params.condition")}
      styles={warningStyle(!form.values.params.condition)}
    />
  </>
);