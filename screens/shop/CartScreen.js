import React from 'react'
import {View, Text, StyleSheet, Button, FlatList} from 'react-native'
import {useSelector} from "react-redux";
import Colors from '../../constants/Colors'

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum,
                }
            )
        }
        return transformedCartItems
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Całkowita kwota:
                    <Text style={styles.amount}> {cartTotalAmount.toFixed(2)}zł</Text>
                </Text>
                <Button title='Zamawiam' color={Colors.mainColor} disabled={cartItems.length === 0}/>
            </View>
            <View>
                <Text>Moje produkty: </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        elevation: 9,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        backgroundColor: '#eae9e9',
        borderRadius: 9,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 17,
    },
    amount: {
        color: Colors.headerColor
    },
})

CartScreen.navigationOptions = {
    headerTitle: 'Koszyk',
}

export default CartScreen
