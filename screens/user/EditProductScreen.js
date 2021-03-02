import React, {useState, useEffect, useCallback, useReducer} from 'react'
import {ScrollView, View, TextInput, Text, StyleSheet, Platform, Alert} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import * as productActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            //action to elementy z dispatchFormState a state jest zdefinioweany w usereducer
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            //ustawiam najpierw na true bo jeśli po iterowaniu po zaktualizowanych walidacjach którakolwiek
            //byłaby false to updatedformisvalid zostanie ustawiona na false i w takiej wartości trafi do
            //returna
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isFormValid: updatedFormIsValid
        }
    }
    //jeśli nic się  ie zmieni to zwracam niezmieniony poprzedni stan
    return state
}

const EditProductScreen = props => {

    //pobieram produkty i filtruję je na podstawie parametru
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId))
    
    const dispatch = useDispatch()

    //tworzę sobie całkowicie niezależny od reduxa mechanizm zarządzania stanem komponentu w celu sprawnej
    //walidacji. dispatchformState przyjmie jako argument obiekt z typem akcji (na dole), który formreducer
    //przeanalizuje i wykona akcję tak jak reducer w reduxie
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            image: editedProduct ? editedProduct.imageUrl : '',
            price: editedProduct ? editedProduct.price.toString() : '',
            description: editedProduct ? editedProduct.description : ''
        },
        inputValidities: {
            //jeśli edytuję product to nie przejmuję się walidacją
            //!!editedProduct to skrócona wersja od ternary operator: editedProduct ? true : false
            title: !!editedProduct,
            image: !!editedProduct,
            price: !!editedProduct,
            description: !!editedProduct
        },
        isFormValid: !!editedProduct
    })

    //usecallback zapewni, że ta funkcja nie jest odtwarzana za każdym razem, gdy komponent jest renderowany
    const handleSubmit = useCallback(() => {
        if (!formState.isFormValid) {
            Alert.alert('Błąd', 'Sprawdź, czy poprawnie wypełniłeś wszystkie pola', [
                {text: 'Ok'}
            ])
            return;
        }
        if (editedProduct) {
            //dodaję + przed price bo price jest typu number a do inputa wprowadzam stringa
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.image,
                +formState.inputValues.price,
                formState.inputValues.description
            ))
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.image,
                +formState.inputValues.price,
                formState.inputValues.description
            ))
        }
        props.navigation.goBack()
        //musze zdefiniować zależności, żeby funkcja wywoływała się gdy ulegnie zmianie cokolwiek, co jest
        //edytowalne, czyli wszystko. gdyby to była pusta tablica nic by się nie tworzyło, bo usecallback nie
        //zwracałby uwagi na żadne wprowadzone przez usera dane przy tworzeniu i edycji produktu
    }, [dispatch, prodId, formState])

    //tworzę parametr, który odbiorę poza komponentem, w navigationOptions żeby zapisać edytowane zmiany w produkcie
    useEffect(() => {
        props.navigation.setParams({submit: handleSubmit})
    }, [handleSubmit])

    //inputId będzie po prostu string z nazwą inputa - powinny być takie jak pola w usereducer
    const handleTextChange = (inputId, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: 'title' //string musi być taki jak klucz wewnątrz initialState w usereducer
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Tytuł</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={handleTextChange.bind(this, 'title')}
                        returnKeyType='next'
                    />
                    {/*{!formState.inputValidities.title && <Text>Niepoprawny tytuł</Text>}*/}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Zdjęcie</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.image}
                        onChangeText={handleTextChange.bind(this, 'image')}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Cena</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.price}
                        onChangeText={handleTextChange.bind(this, 'price')}
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Opis</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={handleTextChange.bind(this, 'description')}
                    />
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
