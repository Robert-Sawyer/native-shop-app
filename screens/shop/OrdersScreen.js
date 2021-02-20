import React from 'react'
import {FlatList, View, Platform, Text} from "react-native"
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/OrderItem";

const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders)

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

export default OrdersScreen
