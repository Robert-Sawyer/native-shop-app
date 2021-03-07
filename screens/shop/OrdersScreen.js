import React, {useEffect, useState, useCallback} from 'react'
import {FlatList, View, Platform, Text, ActivityIndicator, StyleSheet} from "react-native"
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/OrderItem";
import * as ordersActions from '../../store/actions/orders'
import Colors from "../../constants/Colors";

const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false)

    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setIsLoading(true)
        await dispatch(ordersActions.fetchOrders())
        setIsLoading(false)
    }, [dispatch, setIsLoading])

    useEffect(() => {
        loadOrders()
    }, [dispatch, loadOrders])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.headerColor}/>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <OrderItem
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        // dodaję tego propsa bo chcę wyrenderować items dostępne w modelu
                        // Orderitem
                        items={itemData.item.items}
                    />
                )}
            />
        </View>
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Zamówienia',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default OrdersScreen
