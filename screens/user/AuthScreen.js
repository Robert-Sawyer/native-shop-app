import React from 'react'
import {ScrollView, View, Button, KeyboardAvoidingView, StyleSheet} from 'react-native'
import {LinearGradient} from "expo-linear-gradient"
import Input from "../../components/UI/Input"
import Colors from '../../constants/Colors'

const AuthScreen = props => {

    return (
        <View style={styles.screen}>
            <LinearGradient colors={['#3ea8c7', '#3874ce']} style={styles.gradient}>
                <View style={styles.cardItem}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorMessage='Wprowadź poprawny e-mail'
                            onInputChange={() => {
                            }}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Hasło'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorMessage='Wprowadź poprawne hasło'
                            onInputChange={() => {
                            }}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.headerColor} title='Zaloguj' onPress={() => {
                            }}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.mainColor} title='Nie mam jeszcze konta' onPress={() => {
                            }}/>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardItem: {
        width: '85%',
        maxWidth: 400,
        maxHeight: 400,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        elevation: 9,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
    },
})

AuthScreen.navigationOptions = {
    headerTitle: 'Autoryzacja',
}

export default AuthScreen
