import { FlatList } from 'react-native';
import products from '../assets/products.json';
import ProductListItem from '../components/productListItem';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

export default function HomeScreen() {

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
  });

  return (
    <FlatList
      key={numColumns}
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-m-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      className=""
    />
  );
}
