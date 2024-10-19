import { View, Text } from 'react-native';
import React from 'react';

interface Props {
    product: {
        id: number;
        name: string;
        description: string;
        image: string;
        price: number;
    }
}

const ProductListItem = ({ product }: Props) => {
  return <Text style={{ fontSize: 30 }}>{product.name}</Text>;
};

export default ProductListItem;
