import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, ActivityIndicator, FlatList, Platform, StyleSheet, Button} from 'react-native'
import {useDispatch} from "react-redux";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as productActions from '../../store/actions/products'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {

    //wstawiam osobnny stan dla odświeżania, nie tylko ładowania danych - jeśli user pociągnie liste produktów w dół
    //wtedy uruchomi się odświeżenie listy. is loading działa 'nad' loadproducts, a refreshing wewnątrz tej funkcji -
    //patrz useeffect
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const availableProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    //useEffect nie może wzrócic promisa dlatego funkcja jaką przyjmuje useeffect nie może być async, ale można
    //to obejść tak jak poniżej, wykonując asynchroniczną funkcję w środku
    const loadProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productActions.fetchProducts())
        } catch (err) {
            setError(err.message)
        }

        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    //muszę dodać dodatkowy useEffect, ponieważ gdy używam drawer navigation i przełączam zakłądki, wtedy strony nie są
    //ładowane od nowa tylko pobierane z pamięci, dlatego, jeśli ktoś miałby coś edytowac na serwerze to wtedy nie
    //widać by było zmian w apce, bo react navigation nie pobrałby danych tylko odtworzył ekran z pamięci
    //dlatego tutaj ustawiam listenera który obserwuje czy zaszła zmiana i ponownie łąduje produkty po przełączeniu
    //stron, na koniec robię returna który w useeffect jest wykorzystywanydo czyszczenia komponentu przed odmonotowaniem
    //w tym przypadku zwracam usunięcie listenera, który zostanie ponownie stworzony przy wyrenderowaniu komponentu.
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts)

        return () => {
            unsubscribe()
        }
    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadProducts])

    const renderProductItem = itemData => {
        return (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                imgHeight={'75%'}
                detailsHeight={'25%'}
                actionHeight={0}
                onSelect={() => {
                    props.navigation.navigate('ProductDetails', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title,
                    })
                }}
            />
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Coś poszło nie tak!</Text>
                <Button title='Spróbuj ponownie' onPress={loadProducts} color={Colors.headerColor}/>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.headerColor}/>
            </View>
        )
    }

    if (!isLoading && availableProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Nie znaleziono żadnych produktów.</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            numColumns={2}
        />
    )
}

export const productsOverviewOptions = navData => {
    return {
        headerTitle: 'Wszystkie produkty',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ProductsOverviewScreen
