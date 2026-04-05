import { ActionIcon, TextInput, NumberInput } from "@mantine/core";
import type { TextInputProps, NumberInputProps } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";

export const ClearableTextInput = (props: TextInputProps) => {
    const { value, onChange, ...rest } = props;
  
    const handleClear = () => {
      if (typeof onChange === 'function') {
        // Используем двойное приведение: сначала к unknown, потом к нужному нам типу
        const mantineFormHandler = onChange as unknown as (value: string) => void;
        mantineFormHandler("");
      }
    };
  
    return (
      <TextInput
        {...rest}
        value={value}
        onChange={onChange}
        rightSection={
          value && (
            <ActionIcon
              variant="transparent"
              onClick={handleClear}
              aria-label="Очистить"
            >
              <IconCircleX size={20} color="gray" />
            </ActionIcon>
          )
        }
      />
    );
  };

export const ClearableNumberInput = (props: NumberInputProps) => {
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
            // У NumberInput в Mantine onChange и так принимает (string | number)
            onClick={() => onChange?.("")}
            aria-label="Очистить"
          >
            <IconCircleX size={16} />
          </ActionIcon>
        )
      }
    />
  );
};