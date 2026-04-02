import { Badge, Card, Image, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

type AdCardProps = {
    id: string;
    title: string;
    category: string;
    price: number | null;
    needsRevision: boolean;
}

export const AdCard = ({ id, title, category, price, needsRevision }: AdCardProps) => {

    return (
        <Card withBorder shadow="sm" radius="md" p="lg"
        component={Link} to={`/ads/${id}`}
       >
              <Card.Section>
        <Image
          src="https://placehold.co/600x400?text=No+image"
          height={150}
          alt={title}
        />
      </Card.Section>
      <Stack
      align="flex-start"
      justify="flex-start"
      gap="md"
    >
        <Badge variant='outline' color='gray'>{category}</Badge>
        <Text>{title}</Text>
        <Text>{price}</Text>
        {needsRevision && <Badge variant="dot" color="orange" bg="orange.1">Требуется доработка</Badge>}
    </Stack>
        </Card>
       
    )
}
