import React from 'react'
import {Button, FlatList, View, Text, Platform, StyleSheet, Alert} from 'react-native'
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = props => {
//TODO zaimplementować spinner w momencie ładowania produktów - usestate, loadproducts, activityinticator
    const userProducts = useSelector(state => state.products.userProducts)

    const dispatch = useDispatch()

    const handleEditProduct = (id) => {
        props.navigation.navigate('EditProducts', {productId: id})
    }

    //funkcja potrzebuje id usuwanego produktu więc użyję bind() w JSX na dole
    const handleDeleteProduct = (id) => {
        Alert.alert('Potwierdzenie', 'Czy na pewno chcesz usunąć produkt?', [
            {
                text: 'Nie', style: 'default'
            },
            {
                text: 'Tak',
                style: 'destructive',
                onPress: () => {
                    dispatch(productActions.deleteProduct(id))
                }
            }
        ])
    }

    if (userProducts.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Nie znaleziono żadnych produktów. Może jakiś dodasz? ;)</Text>
            </View>
        )
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
                            <Button
                                title='Usuń'
                                color={Colors.headerColor}
                                //przekazuję id do handlera za pomocą bind
                                onPress={handleDeleteProduct.bind(this, itemData.item.id)}/>
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

export const userProductsOptions = navData => {
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
