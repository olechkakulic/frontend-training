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
  Loader,
} from "@mantine/core";
import classes from "./AdsListPage.module.css"; // импорт CSS-модуля
import { Container } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";
import { fetchItems } from "../api/items";
import { buildItemsUrl } from "../utils/buildItemsUrl";
import { useAdsListStore } from "../store/useAdsListStore";
import type { Ad } from "../types/types";

export const AdsListPage = () => {
  const icon = <IconSearch size={16} />;
  const ITEMS_PER_PAGE = 10;

  const [totalItems, setTotalItems] = useState(0);
  const [ads, setAds] = useState<Ad[]>([]);
  const [opened, { toggle }] = useDisclosure(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    currentPage,
    sortBy,
    searchState,
    isAutoChecked,
    isElectronicsChecked,
    isRealEstateChecked,
    onlyNeedsRevision,
    setCurrentPage,
    setSortBy,
    setSearchState,
    setIsAutoChecked,
    setIsElectronicsChecked,
    setIsRealEstateChecked,
    setOnlyNeedsRevision,
    resetFilters,
  } = useAdsListStore();

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedAds = ads;

  const handleResetFilters = () => {
    resetFilters();
  };

  useEffect(() => {
    async function loadAds() {
      try {
        setIsLoading(true);
        setError("");

        const url = buildItemsUrl({
          currentPage,
          itemsPerPage: ITEMS_PER_PAGE,
          sortBy,
          searchState,
          isAutoChecked,
          isElectronicsChecked,
          isRealEstateChecked,
          onlyNeedsRevision,
        });

        const data = await fetchItems(url);
        setAds(data.items);
        setTotalItems(data.total);
      } catch (err) {
        setError("Не удалось загрузить объявление");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAds();
  }, [
    currentPage,
    sortBy,
    searchState,
    isAutoChecked,
    isElectronicsChecked,
    isRealEstateChecked,
    onlyNeedsRevision,
  ]);

  return (
    <Container size="xl" px="md" py="xl">
      <Stack gap="lg">
        <Stack align="flex-start" gap={4}>
          <Title order={1}>Мои объявления</Title>
          <Text>Всего объявлений: {totalItems}</Text>
        </Stack>

        <Group>
          <TextInput
            placeholder="Найти объявление"
            rightSection={icon}
            value={searchState}
            onChange={(event) => {
              setCurrentPage(1);
              setSearchState(event.currentTarget.value);
            }}
            className={classes.searchInput}
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
            value={sortBy}
            className={classes.sortSelect}
            onChange={(value) =>
              setSortBy((value as typeof sortBy) || "newest")
            }
          />
        </Group>

        <Flex align="flex-start" gap="md">
          <Stack>
            <Card w={200} withBorder radius="md" p="md">
              <Stack align="flex-start" gap="md">
                <Title order={4} fz={16}>
                  Фильтры
                </Title>
                <Group justify="space-between" align="center">
                  <Text>Категория</Text>
                  <UnstyledButton onClick={toggle}>
                    <Text>{opened ? "⌃" : "⌄"}</Text>
                  </UnstyledButton>
                </Group>
                <Collapse expanded={opened}>
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
                </Collapse>
                <Divider my="sm" />
                <Switch
                  checked={onlyNeedsRevision}
                  onChange={(event) =>
                    setOnlyNeedsRevision(event.currentTarget.checked)
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
            <Button variant="white" color="gray" onClick={handleResetFilters}>
              Сбросить фильтры
            </Button>
          </Stack>

          <Stack className={classes.resultsStack}>
            {isLoading ? (
              <Flex className={classes.statusContainer}>
                <Loader size="lg" />
              </Flex>
            ) : error ? (
              <Flex className={classes.statusContainer}>
                <Text c="red">{error}</Text>
              </Flex>
            ) : paginatedAds.length > 0 ? (
              <SimpleGrid
                cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
                spacing="md"
              >
                {paginatedAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    id={String(ad.id)}
                    title={ad.title}
                    category={ad.category}
                    price={ad.price}
                    needsRevision={ad.needsRevision}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Flex className={classes.statusContainer}>
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
