import React from 'react'
import {Button, FlatList, Platform} from 'react-native'
import {useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    title={itemData.item.title}
                    image={itemData.item.imageUrl}
                    price={itemData.item.price}
                    imgHeight={'59%'}
                    detailsHeight={'18%'}
                    actionHeight={'23%'}
                    onSelect={() => {
                        props.navigation.navigate('ProductDetails', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,
                        })
                    }}
                >
                    <Button title='Edytuj' color={Colors.headerColor} onPress={() => {
                    }}/>
                    <Button title='Usuń' color={Colors.headerColor} onPress={() => {
                    }}/>
                </ProductItem>}
            numColumns={2}
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Moje produkty',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,
    }
}

export default UserProductsScreen
