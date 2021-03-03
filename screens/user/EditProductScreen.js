import React, {useEffect, useCallback, useReducer} from 'react'
import {ScrollView, View, StyleSheet, Platform, Alert, KeyboardAvoidingView} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Input from '../../components/UI/Input'
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
    //opakowuję w usecallback żeby funkcja nie wywoływała się niepotrzebnie tylko po interakcji z inputem
    const handleInputChange = useCallback((inputId, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputId
        })
        //handleInputChange a więc props w inpucie onInputChange nigdy się niepotrzebnie nie odpali jeśli dispatch nie
        //ulgenie zmianie
    }, [dispatchFormState])

    return (
        //NA NIEKTÓRYCH MAŁYCH EKRANACH TEN FORMULARZ MOŻE BYC PRZYSŁANIANY PRZEZ KLAWIATURĘ, DLATEGO WARTO TO DODAĆ
        //NA RAZIE ZAKOMENTUJĘ, PONIEWAŻ NA MOIM EKRANIE WYŚWIETLA SIĘ GORZEJ, ALE ZACHOWUJĘ NA PÓŹNIEJ
        // <KeyboardAvoidingView
        //     //flex 1 musi być dodane ponieważ owijam tym komponentem scroll view i keyboard musi zarezerwować cały
        //     //ekran dla siebie
        //     style={{flex: 1}}
        //     behavior='padding'
        //     keyboardVerticalOffset={10}
        // >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Tytuł'
                        errorText='Niepoprawny tytuł'
                        //muszę zrezygnować z bind ponieważ w takim przypadku w momencie wypełniania formularza tworzy się
                        //zbut wiele callbacków - praktycznie nieskoczona pętla i nie da się przejśc z jednego inputa
                        //na drugi, dlatego zamiast tego dodaję prop id i przekazuję go w Input do funkcji w useeffect
                        onInputChange={handleInputChange}
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect
                        autoCapitalize='sentences'
                        //jeśli edytuję produkt to do inputa wstawiam initialValue odpowiadającą tytułowi a jeśli tworzę
                        //nowy to wtedy pole ma byc puste, podobnie z walidacją - patrz form state
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='image'
                        label='Zdjęcie'
                        errorText='Nie dodałeś zdjęcia'
                        onInputChange={handleInputChange}
                        returnKeyType='next'
                        autoCapitalize='sentences'
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='price'
                        label='Cena'
                        errorText='Nie podałeś ceny'
                        onInputChange={handleInputChange}
                        returnKeyType='next'
                        keyboardType='decimal-pad'
                        initialValue={editedProduct ? editedProduct.price.toString() : ''}
                        initiallyValid={!!editedProduct}
                        required
                        min={0.01}
                    />
                    <Input
                        id='description'
                        label='Opis'
                        errorText='Nie możesz dodać produktu bez opisu'
                        onInputChange={handleInputChange}
                        keyboardType='default'
                        autoCorrect
                        autoCapitalize='sentences'
                        multiline
                        numberOfLines={5}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
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
