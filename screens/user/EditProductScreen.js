import React, {useState, useEffect, useCallback} from 'react'
import {ScrollView, View, TextInput, Text, StyleSheet, Platform} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import * as productActions from '../../store/actions/products'

const EditProductScreen = props => {

    //pobieram produkty i filtruję je na podstawie parametru
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId))

    //jeśli produkt istnieje to wstaw w inputa treść do edycji jeśli nie ma produktu to input jest pusty
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [image, setImage] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState(editedProduct ? editedProduct.price.toString() : '')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    const dispatch = useDispatch()
    //usecallback zapewni, że ta funkcja nie jest odtwarzana za każdym razem, gdy komponent jest renderowany
    const handleSubmit = useCallback(() => {
        if (editedProduct) {
            //dodaję + przed price bo price jest typu number a do inputa wprowadzam stringa
            dispatch(productActions.updateProduct(prodId, title, image, +price, description))
        }
        else {
            dispatch(productActions.createProduct(title, image, +price, description))
        }
        //musze zdefiniować zależności, żeby funkcja wywoływała się gdy ulegnie zmianie cokolwiek, co jest
        //edytowalne, czyli wszystko. gdyby to była pusta tablica nic by się nie tworzyło, bo usecallback nie
        //zwracałby uwagi na żadne wprowadzone przez usera dane przy tworzeniu i edycji produktu
    }, [dispatch, prodId, title, image, price, description])

  //tworzę parametr, który odbiorę poza komponentem, w navigationOptions żeby zapisać edytowane zmiany w produkcie
    useEffect(() => {
        props.navigation.setParams({submit: handleSubmit})
    }, [handleSubmit])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Tytuł</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Zdjęcie</Text>
                    <TextInput style={styles.input} value={image} onChangeText={text => setImage(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Cena</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Opis</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})

EditProductScreen.navigationOptions = navData => {
    const submit = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edycja produktu' : 'Dodaj produkt',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submit}
                />
            </HeaderButtons>,
    }
}

export default EditProductScreen
