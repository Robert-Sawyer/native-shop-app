import React, {useReducer, useCallback} from 'react'
import {ScrollView, View, Button, StyleSheet} from 'react-native'
import {useDispatch} from "react-redux";
import {LinearGradient} from "expo-linear-gradient"
import Input from "../../components/UI/Input"
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isFormValid: updatedFormIsValid
        }
    }
    return state
}

const AuthScreen = props => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        isFormValid: false
    })

    const dispatch = useDispatch()

    const handleSignup = () => {
        dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
    }

    const handleInputChange = useCallback((inputId, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputId
        })
    }, [dispatchFormState])

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
                            errorText='Wprowadź poprawny e-mail'
                            onInputChange={handleInputChange}
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
                            errorText='Wprowadź poprawne hasło'
                            onInputChange={handleInputChange}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.headerColor} title='Zarejestruj' onPress={handleSignup}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.mainColor} title='Przejdź do logowania' onPress={() => {
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
