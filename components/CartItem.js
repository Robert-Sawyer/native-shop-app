import React from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {Ionicons} from "@expo/vector-icons";

const CartItem = props => {

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemDataTop}>
                <Text style={styles.titleAndAmount} numberOfLines={2}>{props.title}
                    <Text style={styles.quantity}>  ({props.quantity}szt.)</Text>
                </Text>
            </View>
            <View style={styles.itemDataBottom}>
                <Text style={styles.titleAndAmount}>{props.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '95%',
    },
    itemDataTop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '65%',
    },
    itemDataBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '35%'
    },

    quantity: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    titleAndAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 10,
    },
})

export default CartItem
