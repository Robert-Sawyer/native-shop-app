import React from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {Ionicons} from "@expo/vector-icons";

const CartItem = props => {

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.titleAndAmount}>{props.title} </Text>
                <Text style={styles.quantity}>({props.quantity}szt.)</Text>
            </View>
            <View style={styles.itemData}>
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
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
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
