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
} from "@mantine/core";
import { Container } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Pagination } from "@mantine/core";

const mockAds = [
  {
    id: "1",
    title: "Объявление 1",
    category: "Авто",
    price: 100,
    needsRevision: false,
  },
  {
    id: "2",
    title: "Объявление 2",
    category: "Электроника",
    price: 200,
    needsRevision: true,
  },
  {
    id: "3",
    title: "Объявление 3",
    category: "Недвижимость",
    price: 300,
    needsRevision: false,
  },
  {
    id: "4",
    title: "Объявление 4",
    category: "Электроника",
    price: 400,
    needsRevision: true,
  },
  {
    id: "5",
    title: "Объявление 5",
    category: "АВТО",
    price: 500,
    needsRevision: false,
  },
  {
    id: "6",
    title: "Объявление 6",
    category: "Электроника",
    price: 600,
    needsRevision: true,
  },
];

export const AdsListPage = () => {
  const icon = <IconSearch size={16} />;
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(mockAds.length / ITEMS_PER_PAGE);
  const [opened, { toggle }] = useDisclosure(true);
  const [isAutoChecked, setIsAutoChecked] = useState(false);
  const [isElectronicsChecked, setIsElectronicsChecked] = useState(false);
  const [isRealEstateChecked, setIsRealEstateChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filterAds = mockAds.filter((ad) => {
    const noFiltersSelected =
      !isAutoChecked && !isElectronicsChecked && !isRealEstateChecked;

    if (noFiltersSelected) {
      return true;
    }

    if (isAutoChecked && ad.category === "Авто") {
      return true;
    }

    if (isElectronicsChecked && ad.category === "Электроника") {
      return true;
    }

    if (isRealEstateChecked && ad.category === "Недвижимость") {
      return true;
    }

    return false;
  });
  const paginatedAds = filterAds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const [onlyNeedsRevesion, setOnlyNeedRevesion] = useState(false);
  const [searchState, setSearchState] = useState("");
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Stack align="flex-start" gap={4}>
          <Title order={1}>Мои объявления</Title>
          <Text>Всего объявлений: {mockAds.length}</Text>
        </Stack>
        <Group>
          <TextInput
            placeholder="Найти объявление"
            rightSection={icon}
            onChange={(event) => setSearchState(event.currentTarget.value)}
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
          />
        </Group>
        <Group align="flex-start" wrap="nowrap">
            <Stack>
            <Card w={260} withBorder radius="md" p="lg">
                <Stack align="flex-start" gap="md">
                <Title order={4} fz={16}>Фильтры</Title>
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
                        onChange={(event) =>
                            setIsAutoChecked(event.currentTarget.checked)
                        }
                        />
                        <Checkbox
                        label="Электроника"
                        checked={isElectronicsChecked}
                        onChange={(event) =>
                            setIsElectronicsChecked(event.currentTarget.checked)
                        }
                        />

                        <Checkbox
                        label="Недвижимость"
                        checked={isRealEstateChecked}
                        onChange={(event) =>
                            setIsRealEstateChecked(event.currentTarget.checked)
                        }
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

            <Button variant="white" color='gray'
                >Сбросить фильтры</Button>
        </Stack>
          <SimpleGrid cols={3}>
            {paginatedAds.map((ad) => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </SimpleGrid>
        </Group>
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
        />
      </Stack>
    </Container>
  );
};
