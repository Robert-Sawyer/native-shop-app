import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, FlatList, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from "react-redux";
import Colors from '../../constants/Colors'
import CartItem from "../../components/CartItem";
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

    const dispatch = useDispatch()

    const handleSendOrder = async () => {
        setIsLoading(true)
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Całkowita kwota:
                    <Text style={styles.amount}> {cartTotalAmount.toFixed(2)}zł</Text>
                </Text>
                {isLoading
                    ? <ActivityIndicator size='small' color={Colors.headerColor}/>
                    : <Button
                        title='Zamawiam'
                        color={Colors.mainColor}
                        disabled={cartItems.length === 0}
                        onPress={handleSendOrder}
                    />}

            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                    />}
            />
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
