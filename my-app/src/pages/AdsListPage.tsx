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
import { fetchItems } from "../api/items";
import { buildItemsUrl } from "../utils/buildItemsUrl";

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
  const handleResetFilters = () => {
    setCurrentPage(1);
    setSearchState("");
    setSortBy("newest");
    setIsAutoChecked(false);
    setIsElectronicsChecked(false);
    setIsRealEstateChecked(false);
    setOnlyNeedRevesion(false);
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
          onlyNeedsRevision: onlyNeedsRevesion,
        });

        const data = await fetchItems(url);

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

    loadAds();
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
      <Stack gap="lg" w="100%">
        <Stack style={{ flexShrink: 0 }} align="flex-start" gap={4}>
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
            value={sortBy}
            style={{ flex: 1 }}
            onChange={(value) => setSortBy(value || "newest")}
          />
        </Group>
        <Flex align="flex-start" gap="md" w="100%">
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

            <Button variant="white" color="gray" onClick={handleResetFilters}>
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
                {paginatedAds.map((ad) => (
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
