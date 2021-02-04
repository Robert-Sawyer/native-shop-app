import React from 'react'
import {ScrollView, View, Image, Button, Text, StyleSheet} from 'react-native'
import {useSelector} from "react-redux";
import Colors from '../../constants/Colors'

const ProductDetailsScreen = props => {

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId))

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.buttonContainer}>
                <Button color={Colors.headerColor} title='Do koszyka' onPress={() => {}}/>
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
        color: '#888',
        textAlign: 'center',
        marginVertical: 10,
    },
    desc: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
})

export default ProductDetailsScreen
