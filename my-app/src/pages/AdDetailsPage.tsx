import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
import { useParams } from "react-router-dom";
const mockAd = {
  id: "1",
  title: "MacBook Pro 16”",
  price: 64000,
  createdAt: "10 марта 22:39",
  updatedAt: "10 марта 23:12",
  description:
    "Продаю свой MacBook Pro 16 2021 на чипе M1 Pro. Состояние отличное, работал бережно. Мощности хватает на всё: от сложного монтажа до кода, при этом ноутбук почти не греется.",
  params: {
    type: "Ноутбук",
    brand: "Apple",
    model: "M1 Pro",
  },
};
export const AdDetailsPage = () => {
  return (
    <>
      <Group justify="space-between" align="flex-start" w="100%">
        <Stack>
          <Title fz={30}>{mockAd.title}</Title>
          <Button variant="filled" rightSection={<IconEdit size={16} />}>
            Редактировать
          </Button>
        </Stack>
        <Stack>
          <Title fz={30}>{mockAd.price} Р</Title>
          <Stack align="flex-end" gap={2}>
            <Text fz={16}>Опубликовано: {mockAd.createdAt}</Text>
            <Text fz={16}>Отредактировано: {mockAd.createdAt}</Text>
          </Stack>
        </Stack>
      </Group>
      <Divider />
      <Grid gutter="xl">
        {}
        <Grid.Col span={5}>
          <Card w="100%" h={360} withBorder radius="md">
            <Text>Тут будет изображение</Text>
          </Card>
        </Grid.Col>

        {}
        <Grid.Col span={4}>
          {" "}
          {}
          <Stack gap="md">
            <Title order={2}>Характеристики</Title>

            <Group justify="space-between" w="100%">
              <Text fw={500}>Тип</Text>
              <Text c="dimmed">{mockAd.params.type}</Text>
            </Group>

            <Group justify="space-between" w="100%">
              <Text fw={500}>Бренд</Text>
              <Text c="dimmed">{mockAd.params.brand}</Text>
            </Group>

            <Group justify="space-between" w="100%">
              <Text fw={500}>Модель</Text>
              <Text c="dimmed">{mockAd.params.model}</Text>
            </Group>
          </Stack>
        </Grid.Col>

        {}
        <Grid.Col span={3} />
      </Grid>
      {}
      <Stack mt={40} gap="xs" align="flex-start">
        <Title order={3}>Описание</Title>
        <Text>{mockAd.description}</Text>
      </Stack>
    </>
  );
};
