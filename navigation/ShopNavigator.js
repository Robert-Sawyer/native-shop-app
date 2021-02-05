import {Platform} from "react-native";
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

const ShopNavigator = createStackNavigator({
    ProductOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
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
})

export default createAppContainer(ShopNavigator)
