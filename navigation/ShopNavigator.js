import React from 'react'
import {Platform} from "react-native";
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const defaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.headerColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.headerColor
}
const ProductNavigator = createStackNavigator({
    ProductOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOption
})

const OrderNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
      drawerIcon: drawerConfig => (
          <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.tintColor}
          />
      )
    },
    defaultNavigationOptions: defaultNavOption
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProducts: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOption
})

const ShopNavigator = createDrawerNavigator({
    Products: {
        screen: ProductNavigator,
        navigationOptions: {
            title: 'Produkty'
        }
    },
    Orders: {
        screen: OrderNavigator,
        navigationOptions: {
            title: 'Zamówienia'
        }
    },
    Admin: {
        screen: AdminNavigator,
        navigationOptions: {
            title: 'Panel admina'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.headerColor
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOption
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)
