import React from 'react'
import {ScrollView, View, Image, Button, Text, StyleSheet, Platform} from 'react-native'
import {useSelector, useDispatch} from "react-redux";
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductDetailsScreen = props => {

    const productId = props.route.params ? props.route.params.productId : null
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId))

    const dispatch = useDispatch()
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.buttonContainer}>
                <Button color={Colors.headerColor} title='Do koszyka' onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>{selectedProduct.price} zł</Text>
            <Text style={styles.desc}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

export const productDetailsOptions = navData => {
    return {
        headerTitle: navData.route.params ? navData.route.params.productTitle : null,
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

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: '#888',
        textAlign: 'center',
        marginVertical: 10,
    },
    desc: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
})

export default ProductDetailsScreen
