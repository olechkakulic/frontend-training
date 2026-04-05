import { ActionIcon, TextInput, NumberInput, Textarea } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";

export const ClearableTextInput = (props: any) => {
  const { value, onChange, ...rest } = props;
  return (
    <TextInput
      {...rest}
      value={value}
      onChange={onChange}
      rightSection={
        value && (
          <ActionIcon
            variant="transparent"
            onClick={() => onChange("")}
            aria-label="Очистить"
          >
            <IconCircleX size={20} color="gray" />
          </ActionIcon>
        )
      }
    />
  );
};

export const ClearableNumberInput = (props: any) => {
  const { value, onChange, ...rest } = props;
  return (
    <NumberInput
      {...rest}
      value={value}
      onChange={onChange}
      rightSection={
        value !== undefined && value !== "" && (
          <ActionIcon
            variant="transparent"
            onClick={() => onChange("")}
            aria-label="Очистить"
          >
            <IconCircleX size={16} />
          </ActionIcon>
        )
      }
    />
  );
};
