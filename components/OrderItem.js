import React, {useState} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import Colors from '../constants/Colors'
import CartItem from "./CartItem";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{props.amount.toFixed(2)} zł</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                style={styles.details}
                color={Colors.headerColor}
                title='Szczegóły'
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}/>
            {showDetails && <View>
                {props.items.map(cartItem =>
                    //propsy z cartitem są mapowane z CartScreen, gdzie mam tablicę z elementami
                    //o nazwach sum, producttitle itp
                    <CartItem
                        key={cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                    />)}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        elevation: 9,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888',
    },
    details: {},
})

export default OrderItem
