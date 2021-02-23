import React from 'react'
import {Button, FlatList, View, Platform, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)

    const dispatch = useDispatch()

    const handleEditProduct = (id) => {
        props.navigation.navigate('EditProducts', {productId: id})
    }

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
                    detailsHeight={'17%'}
                    actionHeight={'20%'}
                    onSelect={() => {
                        handleEditProduct(itemData.item.id)
                    }}
                >
                    <View style={styles.container}>

                        <View style={styles.button}>
                            <Button title='Edytuj' color={Colors.headerColor} onPress={() => {
                                handleEditProduct(itemData.item.id)
                            }}/>
                        </View>

                        <View style={styles.button}>
                            <Button title='Usuń' color={Colors.headerColor} onPress={() => {
                                dispatch(productActions.deleteProduct(itemData.item.id))
                            }}/>
                        </View>

                    </View>
                </ProductItem>}
            numColumns={2}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        borderRadius: 5,
        overflow: 'hidden',
        width: '39%'
    },
})

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
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'add-sharp' : 'ios-add-sharp'}
                    onPress={() => {
                        navData.navigation.navigate('EditProducts')
                    }}
                />
            </HeaderButtons>,
    }
}

export default UserProductsScreen
