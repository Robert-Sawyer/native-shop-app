import React from 'react'
import {Platform, Button, View, SafeAreaView} from "react-native";
import {useDispatch} from "react-redux";
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import ProductsOverviewScreen, {productsOverviewOptions} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen, {productDetailsOptions} from "../screens/shop/ProductDetailsScreen";
import CartScreen, {cartOptions} from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen, {ordersOptions} from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import UserProductsScreen, {userProductsOptions} from "../screens/user/UserProductsScreen";
import EditProductScreen, {editProductsOptions} from "../screens/user/EditProductScreen";
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
            <ProductStackNavigator.Screen name='ProductOverview' component={ProductsOverviewScreen}
                                          options={productsOverviewOptions}/>
            <ProductStackNavigator.Screen name='ProductDetails' component={ProductDetailsScreen}
                                          options={productDetailsOptions}/>
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

const OrderStackNavigator = createStackNavigator()

export const OrdersNavigator = () => {

    return (
        <OrderStackNavigator.Navigator screenOptions={defaultNavOption}>
            <OrderStackNavigator.Screen name='Orders' component={OrdersScreen} options={ordersOptions}/>
        </OrderStackNavigator.Navigator>
    )
}

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

const AdminStackNavigator = createStackNavigator()

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOption}>
            <AdminStackNavigator.Screen name='UserProducts' component={UserProductsScreen}
                                        options={userProductsOptions}/>
            <AdminStackNavigator.Screen name='EditProducts' component={EditProductScreen}
                                        options={editProductsOptions}/>
        </AdminStackNavigator.Navigator>
    )
}


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

const ShopDrawerNavigator = createDrawerNavigator()

export const ShopNavigator = () => {
    //mogę użyć dispatcha, ponieważ dodaję do navigatora po prostu kolejny komponent i mogę robić to samo
    const dispatch = useDispatch()
    return (
        //te dwa propsy to odpowiedniki contentComponent i contentOptions ze starej wersji r-nav
        <ShopDrawerNavigator.Navigator
            drawerContent={
                props => {
                    return (
                        //ten komponent musi mieć forceinset żeby ustawić jego początkowe położenie, DrawerItems musi
                        //kopiowac pierwotne propsy, których wymaga, bo potrzebuje ich do działania
                        <View style={{flex: 1, paddingTop: 30}}>
                            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                                <DrawerItemList {...props}/>
                                <Button title='Wyloguj' color={Colors.headerColor} onPress={() => {
                                    dispatch(authActions.logout())
                                }}/>
                            </SafeAreaView>
                        </View>
                    )
                }
            }
            drawerContentOptions={{activeTintColor: Colors.headerColor}}
        >
            <ShopDrawerNavigator.Shop name='Products' component={ProductsNavigator} options={{
                title: 'Produkty',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        size={23}
                        color={props.color}
                    />
                )
            }}/>
            <ShopDrawerNavigator.Shop name='Orders' component={OrdersNavigator} options={{
                title: 'Zamówienia',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                        size={23}
                        color={props.color}
                    />
                )
            }}/>
            <ShopDrawerNavigator.Shop name='Admin' component={AdminNavigator} options={{
                title: 'Panel admina',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={props.color}
                    />
                )
            }}/>
        </ShopDrawerNavigator.Navigator>
    )
}


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
