import React from 'react'
import {ScrollView, View, Image, Button, Text, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from "react-redux";
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductDetailsScreen = props => {

    const productId = props.navigation.getParam('productId')
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
            <Text style={styles.price}>{selectedProduct.price}</Text>
            <Text style={styles.desc}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
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
