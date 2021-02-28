import React, {useState} from 'react'
import {ScrollView, View, TextInput, Text, StyleSheet, Platform} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {useSelector} from "react-redux";

const EditProductScreen = props => {

    //pobieram produkty i filtruję je na podstawie parametru
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    //jeśli produkt istnieje to wstaw w inputa treść do edycji jeśli nie ma produktu to input jest pusty
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [image, setImage] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState(editedProduct ? editedProduct.price.toString() : '')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

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
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edycja produktu' : 'Dodaj produkt',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={() => {
                        navData.navigation.navigate('EditProducts')
                    }}
                />
            </HeaderButtons>,
    }
}

export default EditProductScreen
