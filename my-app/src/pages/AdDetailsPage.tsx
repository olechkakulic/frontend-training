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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Ad = {
  id: number;
  title: string;
  description?: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  needsRevision: boolean;
  category: "auto" | "real_estate" | "electronics";
  params: {
    type?: string;
    brand?: string;
    model?: string;
    address?: string;
    area?: number;
    floor?: number;
    yearOfManufacture?: number;
    transmission?: string;
    mileage?: number;
    enginePower?: number;
    condition?: string;
    color?: string;
  };
};

export const AdDetailsPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAd() {
      if (!id) {
        setError("Объявление не найдено");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`http://localhost:8080/items/${id}`);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        setAd(data);
      } catch (err) {
        setError("Не удалось загрузить объявление");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAd();
  }, [id]);

  if (isLoading) {
    return (
      <Container size="xl" w="100%" px="md" py="xl">
        <Text>Загрузка...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" w="100%" px="md" py="xl">
        <Text c="red">{error}</Text>
      </Container>
    );
  }

  if (!ad) {
    return (
      <Container size="xl" w="100%" px="md" py="xl">
        <Text>Объявление не найдено</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" w="100%" px="md" py="xl">
      <Group justify="space-between" align="flex-start" w="100%">
        <Stack>
          <Title fz={30}>{ad.title}</Title>
          <Button variant="filled" rightSection={<IconEdit size={16} />}>
            Редактировать
          </Button>
        </Stack>
        <Stack>
          <Title fz={30}>{ad.price} Р</Title>
          <Stack align="flex-end" gap={2}>
            <Text fz={16}>Опубликовано: {ad.createdAt}</Text>
            <Text fz={16}>Отредактировано: {ad.updatedAt}</Text>
          </Stack>
        </Stack>
      </Group>
      <Divider />
      <Grid gutter="xl">
        <Grid.Col span={5}>
          <Card w="100%" h={360} withBorder radius="md">
            <Text>тут будет картинка</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack gap="md">
            <Title order={2}>Характеристики</Title>

            <Group justify="space-between" w="100%">
              <Text fw={500}>Тип</Text>
              <Text c="dimmed">{ad.params.type ?? "—"}</Text>
            </Group>

            <Group justify="space-between" w="100%">
              <Text fw={500}>Бренд</Text>
              <Text c="dimmed">{ad.params.brand ?? "—"}</Text>
            </Group>

            <Group justify="space-between" w="100%">
              <Text fw={500}>Модель</Text>
              <Text c="dimmed">{ad.params.model ?? "—"}</Text>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={3} />
      </Grid>

      <Stack mt={40} gap="xs" align="flex-start">
        <Title order={3}>Описание</Title>
        <Text ta="justify" maw={600} px={0}>
          {ad.description || "Описание отсутствует"}
        </Text>
      </Stack>
    </Container>
  );
};