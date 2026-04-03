import { AdCard } from "../components/ads/AdCard";
import {
  Card,
  Button,
  Select,
  SimpleGrid,
  TextInput,
  Title,
  UnstyledButton,
  Collapse,
  Checkbox,
  Divider,
  Group,
  Text,
  Switch,
  Stack,
  Flex,
} from "@mantine/core";
import { Container } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";

export const AdsListPage = () => {
  const icon = <IconSearch size={16} />;
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const [ads, setAds] = useState([]);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const [opened, { toggle }] = useDisclosure(true);
  const [isAutoChecked, setIsAutoChecked] = useState(false);
  const [isElectronicsChecked, setIsElectronicsChecked] = useState(false);
  const [isRealEstateChecked, setIsRealEstateChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchState, setSearchState] = useState("");
  const paginatedAds = ads;
  const [onlyNeedsRevesion, setOnlyNeedRevesion] = useState(false);

  const buildUrl = () => {
    const params = new URLSearchParams();
    params.append("limit", String(ITEMS_PER_PAGE));
    params.append("skip", String((currentPage - 1) * ITEMS_PER_PAGE));
    if (sortBy === "newest") {
      params.append("sortColumn", "createdAt");
      params.append("sortDirection", "desc");
    } else if (sortBy === "oldest") {
      params.append("sortColumn", "createdAt");
      params.append("sortDirection", "asc");
    } else if (sortBy === "price-upp") {
      params.append("sortColumn", "price");
      params.append("sortDirection", "desc");
    } else if (sortBy === "price-down") {
      params.append("sortColumn", "price");
      params.append("sortDirection", "asc");
    } else if (sortBy === "name-first") {
      params.append("sortColumn", "title");
      params.append("sortDirection", "asc");
    } else if (sortBy === "name-down") {
      params.append("sortColumn", "title");
      params.append("sortDirection", "desc");
    }
    if (searchState.trim()) {
      params.append("q", searchState.trim());
    }
    const categories = [];
    if (isAutoChecked) categories.push("auto");
    if (isElectronicsChecked) categories.push("electronics");
    if (isRealEstateChecked) categories.push("real_estate");

    if (categories.length > 0) {
      params.append("categories", categories.join(","));
    }

    // Только доработки
    if (onlyNeedsRevesion) {
      params.append("needsRevision", "true");
    }
    return `http://localhost:8080/items?${params.toString()}`;
  };
  useEffect(() => {
    async function fetchAds() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(buildUrl());
        const data = await response.json();

        console.log(data);
        setAds(data.items);
        setTotalItems(data.total);
      } catch (err) {
        setError("Не удалось загрузить объявление");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAds();
  }, [
    currentPage,
    sortBy,
    searchState,
    isAutoChecked,
    isElectronicsChecked,
    isRealEstateChecked,
    onlyNeedsRevesion,
  ]);
  return (
    <Container size="xl" w="100%" px="md" py="xl">
      <Stack gap="lg" w='100%'>
        <Stack style={{ flexShrink: 0 }} align="flex-start" gap={4}>
          <Title order={1}>Мои объявления</Title>
          <Text>Всего объявлений: {totalItems}</Text>
        </Stack>
        <Group>
          <TextInput
            placeholder="Найти объявление"
            rightSection={icon}
            onChange={(event) => {
              setCurrentPage(1);
              setSearchState(event.currentTarget.value);
            }}
            style={{ flex: 3 }}
          />
          <Select
            data={[
              { value: "newest", label: "По новизне (сначала новые)" },
              { value: "oldest", label: "По новизне (сначала cтарые)" },
              { value: "price-upp", label: "По цене (сначала дороже)" },
              { value: "price-down", label: "По цене (сначала дешевле)" },
              { value: "name-first", label: "По названию (от А до Я)" },
              { value: "name-down", label: "По названию (от Я до А)" },
            ]}
            defaultValue="newest"
            style={{ flex: 1 }}
            onChange={(value) => setSortBy(value)}
          />
        </Group>
        <Flex align="flex-start" gap="md" w='100%'>
          <Stack>
            <Card w={200} withBorder radius="md" p="md">
              <Stack align="flex-start" gap="md">
                <Title order={4} fz={16}>
                  Фильтры
                </Title>
                <Group justify="space-between" align="center">
                  <Text>Категория</Text>
                  <UnstyledButton onClick={toggle}>
                    {" "}
                    {}
                    <Text>
                      {opened ? "⌃" : "⌄"} {}
                    </Text>
                  </UnstyledButton>
                </Group>

                <Collapse expanded={opened}>
                  {" "}
                  {
                    <Stack gap="md">
                      <Checkbox
                        label="Авто"
                        checked={isAutoChecked}
                        onChange={(event) => {
                          setCurrentPage(1);
                          setIsAutoChecked(event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="Электроника"
                        checked={isElectronicsChecked}
                        onChange={(event) => {
                          setCurrentPage(1);
                          setIsElectronicsChecked(event.currentTarget.checked);
                        }}
                      />

                      <Checkbox
                        label="Недвижимость"
                        checked={isRealEstateChecked}
                        onChange={(event) => {
                          setCurrentPage(1);

                          setIsRealEstateChecked(event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  }
                </Collapse>
                <Divider my="sm" />
                <Switch
                  checked={onlyNeedsRevesion}
                  onChange={(event) =>
                    setOnlyNeedRevesion(event.currentTarget.checked)
                  }
                  withThumbIndicator={false}
                  color="gray"
                  labelPosition="left"
                  label="Только требующие доработок"
                  size="md"
                  radius="lg"
                  fz={14}
                />
              </Stack>
            </Card>

            <Button variant="white" color="gray">
              Сбросить фильтры
            </Button>
          </Stack>
          <Stack
            style={{
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              minHeight: 520,
            }}
          >
            {paginatedAds.length > 0 ? (
              <SimpleGrid
                cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
                spacing="md"
              >
                {paginatedAds.map((ad, index) => (
                  <AdCard
                    key={ad.id}
                    id={ad.id}
                    title={ad.title}
                    category={ad.category}
                    price={ad.price}
                    needsRevision={ad.needsRevision}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Flex
                align="center"
                justify="center"
                style={{
                  flex: 1,
                  minHeight: 420,
                  width: "100%",
                }}
              >
                <Text c="dimmed">Ничего не найдено</Text>
              </Flex>
            )}

            <Pagination
              value={Math.min(currentPage, Math.max(totalPages, 1))}
              onChange={setCurrentPage}
              total={Math.max(totalPages, 1)}
            />
          </Stack>
        </Flex>
      </Stack>
    </Container>
  );
};
