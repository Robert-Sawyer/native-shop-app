import React from 'react'
import {ScrollView, View, Image, Button, Text, StyleSheet} from 'react-native'
import {useSelector} from "react-redux";

const ProductDetailsScreen = props => {

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId))

    return (
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({

})

export default ProductDetailsScreen
