import React from 'react'
import {FlatList, Platform} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = props => {

    const availableProducts = useSelector(state => state.products.availableProducts)

    const renderProductItem = itemData => {

        return (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    props.navigation.navigate('ProductDetails', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title,
                    })
                }}
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

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Wszystkie produkty',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
    }
}

export default ProductsOverviewScreen
