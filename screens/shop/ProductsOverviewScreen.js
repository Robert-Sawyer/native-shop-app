import React from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem";

const ProductsOverviewScreen = props => {

    const availableProducts = useSelector(state => state.products.availableProducts)

    const renderProductItem = prodItem => {

        return (
            <ProductItem
                title={prodItem.item.title}
                price={prodItem.item.price}
                image={prodItem.item.imageUrl}
                onSelect={() => {}}
            />
        )
    }

    return (
        <FlatList
            data={availableProducts}
            renderItem={renderProductItem}
            keyExtractor={(item, index) => item.id}
            numColumns={2}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'Wszystkie produkty',
}

export default ProductsOverviewScreen
