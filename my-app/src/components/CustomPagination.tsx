import { Pagination, type PaginationProps, useMantineTheme } from '@mantine/core';

export const CustomPagination = (props: PaginationProps) => {
  const theme = useMantineTheme();

  return (
    <Pagination
      {...props}
      styles={{
        control: {
          '&[data-active]': {
            backgroundColor: 'transparent',
            border: `1px solid ${theme.colors.blue[3]}`,
            color: theme.colors.blue[3],
          },
        },
      }}
    />
  );
};