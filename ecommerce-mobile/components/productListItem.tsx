import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable, View } from 'react-native';
import { Link } from 'expo-router';

interface Props {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
  };
}

export default function ProductListItem({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg  flex-1">
          {/* <Link href={`/product/${product.id}`}>Open Details</Link> */}

          <Image
            source={{
              uri: product.image,
            }}
            alt={`${product.name} image`}
            className="mb-6 h-[240px] w-full rounded-md"
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {product.name}
          </Text>
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
