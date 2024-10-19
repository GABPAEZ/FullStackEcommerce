import { FlatList } from 'react-native';
import products from '../assets/products.json';
import ProductListItem from '../components/productListItem';

export default function HomeScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
    />
  );
}
