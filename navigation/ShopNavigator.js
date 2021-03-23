import React from 'react'
import {Platform, Button, View, SafeAreaView} from "react-native";
import {useDispatch} from "react-redux";
import {createStackNavigator} from '@react-navigation/stack'
import {} from '@react-navigation/drawer'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import ProductsOverviewScreen, {productsOverviewOptions} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen, {productDetailsOptions} from "../screens/shop/ProductDetailsScreen";
import CartScreen, {cartOptions} from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
import * as authActions from '../store/actions/auth'

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

//w 5 wersji react navigation createstacknavigator nie potrzebuje żadnych obiektów, jest komponentem, który
//przechowuje info o nawigacji a NavigationContainer to odpowiednik createAppContainer z ShopNavigator
const ProductStackNavigator = createStackNavigator()

//ProductStackNavigator jest obiektem z włąściwością navigator która przechowuje komponent tworzony w tagu MyStack, czyli
//ekran, bo chcę, żeby wewnątrz nawigatora znajdowały się ekrany do wyrenderowania a nastepnie
//będe chciał skonfigurowac te ekrany - dać im tytuł, style i inne właściwości - użyję do tego propsów:
//name i component analogicznie do tego, co było robione w poprzednich wersjach w createstacknavigator
export const ProductsNavigator = () => {
    return (
        //screenOptions to opcje wspolne dla wszystkich ekranów wewnątrz stacknavigatora i zostaną scalone z options
        //specyfucznymi dla każdego z ekranów (options)
        <ProductStackNavigator.Navigator screenOptions={defaultNavOption}>
            <ProductStackNavigator.Screen name='ProductOverview' component={ProductsOverviewScreen} options={productsOverviewOptions}/>
            <ProductStackNavigator.Screen name='ProductDetails' component={ProductDetailsScreen} options={productDetailsOptions}/>
            <ProductStackNavigator.Screen name='Cart' component={CartScreen} options={cartOptions}/>
        </ProductStackNavigator.Navigator>
    )
}


// const ProductNavigator = createStackNavigator({
//     ProductOverview: ProductsOverviewScreen,
//     ProductDetails: ProductDetailsScreen,
//     Cart: CartScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => (
//             <Ionicons
//                 name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//                 size={23}
//                 color={drawerConfig.tintColor}
//             />
//         )
//     },
//     defaultNavigationOptions: defaultNavOption
// })
//
// const OrderNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//           <Ionicons
//               name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//               size={23}
//               color={drawerConfig.tintColor}
//           />
//       )
//     },
//     defaultNavigationOptions: defaultNavOption
// })
//
// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProducts: EditProductScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => (
//             <Ionicons
//                 name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//                 size={23}
//                 color={drawerConfig.tintColor}
//             />
//         )
//     },
//     defaultNavigationOptions: defaultNavOption
// })
//
// const ShopNavigator = createDrawerNavigator({
//     Products: {
//         screen: ProductNavigator,
//         navigationOptions: {
//             title: 'Produkty'
//         }
//     },
//     Orders: {
//         screen: OrderNavigator,
//         navigationOptions: {
//             title: 'Zamówienia'
//         }
//     },
//     Admin: {
//         screen: AdminNavigator,
//         navigationOptions: {
//             title: 'Panel admina'
//         }
//     }
// }, {
//     contentOptions: {
//         activeTintColor: Colors.headerColor
//     },
//     //dodaję teraz nowy komponent w szufladzie, dlatego dopisuję props
//     contentComponent: props => {
//         //mogę użyć dispatcha, ponieważ dodaję do navigatora po prostu kolejny komponent i mogę robić to samo
//         const dispatch = useDispatch()
//         return (
//             //ten komponent musi mieć forceinset żeby ustawić jego początkowe położenie, DrawerItems musi
//             //kopiowac pierwotne propsy, których wymaga, bo potrzebuje ich do działania
//             <View style={{flex: 1, paddingTop: 30}}>
//                 <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//                     <DrawerItems {...props}/>
//                     <Button title='Wyloguj' color={Colors.headerColor} onPress={() => {
//                         dispatch(authActions.logout())
//                     }}/>
//                 </SafeAreaView>
//             </View>
//         )
//     }
//
// })
//
// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOption
// })
//
// const MainNavigator = createSwitchNavigator({
//     Start: StartUpScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// })
//
// export default createAppContainer(MainNavigator)
