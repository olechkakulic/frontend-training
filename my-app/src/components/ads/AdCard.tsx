import { Badge, Card,Image, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

type AdCardProps = {
  id: string;
  title: string;
  category: string;
  price: number | null;
  needsRevision: boolean;
};
const getCategoryLabel = (category: string) => {
  if (category === "auto") return "Авто";
  if (category === "real_estate") return "Недвижимость";
  if (category === "electronics") return "Электроника";

  return category;
};

export const AdCard = ({
  id,
  title,
  category,
  price,
  needsRevision,
}: AdCardProps) => {
  return (


    <Card
      withBorder
      shadow="sm"
      radius="md"
      p="lg"
      component={Link}
      to={`/ads/${id}`}
      h="auto"
    >
      <Card.Section>
        <Image
          src="/images/Главная.png"
          h={180}
          alt={title}
        />
      </Card.Section>
      <Stack align="flex-start" justify="flex-start" gap="md">
        <Badge variant="outline" color="gray">
          {getCategoryLabel(category)}
        </Badge>
        <Text lineClamp={2} style={{ minHeight: "3.1em" }}>
          {title}
        </Text>
        <Text>{price}</Text>
        {needsRevision && (
          <Badge variant="dot" color="orange" bg="orange.1" mt="auto" c='orange'>
            Требует доработок
          </Badge>
        )}
      </Stack>
    </Card>

  );
};
