import React from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem";

const ProductsOverviewScreen = props => {

    const availableProducts = useSelector(state => state.products.availableProducts)

    const renderProductItem = itemData => {

        return (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {}}
            />
        )
    }

    return (
        <FlatList
            data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            numColumns={2}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'Wszystkie produkty',
}

export default ProductsOverviewScreen
