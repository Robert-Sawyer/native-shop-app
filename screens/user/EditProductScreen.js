import React from 'react'
import {ScrollView, View, TextInput, Text, StyleSheet} from 'react-native'

const EditProductScreen = props => {

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Tytuł</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Zdjęcie</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Cena</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Opis</Text>
                    <TextInput style={styles.input}/>
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


EditProductScreen.navigationOptions = {
    headerTitle: 'Edycja produktu'
}

export default EditProductScreen
