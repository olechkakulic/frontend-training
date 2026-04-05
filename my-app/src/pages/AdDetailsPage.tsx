import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  Alert,
  Box,
  Image,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CATEGORY_FIELDS,
  PARAM_LABELS,
  VALUE_LABELS,
} from "../constants/labels";
import { formatDate } from "../utils/utils";
import { IconAlertCircle } from "@tabler/icons-react";
import type { Ad } from "../types/types";
import { fetchItemById } from "../api/items";

export const AdDetailsPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAd() {
      if (!id) {
        setError("Объявление не найдено");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await fetchItemById(id);
        setAd(data);
      } catch (err) {
        setError("Не удалось загрузить объявление");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAd();
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

  const emptyFields = CATEGORY_FIELDS[ad.category].filter((key) => {
    const value = ad.params[key as keyof typeof ad.params];
    return value === undefined || value === null || value === "";
  });

  if (!ad.description || ad.description.trim() === "") {
    emptyFields.push("Описание");
  }

  return (
    <Container size="xl" w="100%" px="md" py="xl">
      <Group justify="space-between" align="flex-start" w="100%">
        <Stack>
          <Title fz={30}>{ad.title}</Title>
          <Button
            component={Link}
            to={`/ads/${ad.id}/edit`}
            variant="filled"
            rightSection={<IconEdit size={16} />}
          >
            Редактировать
          </Button>
        </Stack>

        <Stack align="flex-end">
          <Title fz={30}>{ad.price} Р</Title>
          <Stack align="flex-end" gap={2}>
            <Text fz={16} c="#848388">
              Опубликовано: {formatDate(ad.createdAt)}
            </Text>
            {ad.updatedAt && ad.updatedAt !== ad.createdAt && (
              <Text fz={16} c="#848388">
                Отредактировано: {formatDate(ad.updatedAt)}
              </Text>
            )}
          </Stack>
        </Stack>
      </Group>

      <Divider mt={36} />

      <Grid mt="md">
        <Grid.Col span={5}>
          <Image src="/images/Главная.png" h={360} alt={ad.title} />
        </Grid.Col>

        <Grid.Col span={5}>
          <Stack gap="md">
            {ad.needsRevision && emptyFields.length > 0 && (
              <Alert
                variant="light"
                color="orange"
                title="Требуются доработки"
                icon={<IconAlertCircle color="orange" />}
                styles={{
                  root: {
                    backgroundColor: "#f9f1e6",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    boxShadow:
                      "0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12)",
                  },
                  title: {
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: 600,
                  },
                }}
              >
                <Text size="sm" mb="xs" c="black">
                  У объявления не заполнены поля:
                </Text>
                <Box component="ul" m={0} pl={30}>
                  {emptyFields.map((field) => (
                    <li key={field}>
                      <Text size="sm" c="black">
                        {PARAM_LABELS[field as keyof typeof PARAM_LABELS] ||
                          field}
                      </Text>
                    </li>
                  ))}
                </Box>
              </Alert>
            )}

            <Title order={2}>Характеристики</Title>

            {Object.entries(ad.params).map(([key, value]) => {
              if (value === undefined || value === null || value === "")
                return null;

              return (
                <Group justify="space-between" w="100%" key={key}>
                  <Text fw={500}>{PARAM_LABELS[key] || key}</Text>
                  <Text c="dimmed">
                    {VALUE_LABELS[value as string] || value.toString()}
                  </Text>
                </Group>
              );
            })}
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
