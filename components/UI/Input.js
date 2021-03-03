import React, {useReducer, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    })

    //używam destrukturyzacji żeby uniknąc nieskończonej pętli w useEffect - pobieram po prostu do zmiennej dwa
    //propsy z wielu, dzięki temu mogę dodać te dwa propsy do tablicy zależności w useEffect
    const {onInputChange, id} = props

    //jeżeli input zostanie dotknięty to wtedy wykorzystaj funkcję z komponentu nadrzędnego i przekaż do niej dane
    //z usereducera a konkretnie dane o wartości i czy jest zwalidowany. uzależnij też useeffect od zmiany wartości
    //w input state oraz od samej funkcji
    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [inputState, onInputChange, id])

    const handleTextChange = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let isValid = true
        if (props.required && text.trim().length === 0) {
            isValid = false
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false
        }
        if (props.min != null && +text < props.min) {
            isValid = false
        }
        if (props.max != null && +text > props.max) {
            isValid = false
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false
        }

        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    }

    const handleLostFocus = () => {
        dispatch({type: INPUT_BLUR})
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                // chcę mieć możliwośc konfiguracji ustaień inputa z zewnątrz i żeby nie ustawiać na sztywno
                //wszystkich propsów textinputa robię to co poniżej
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={handleTextChange}
                onBlur={handleLostFocus}
            />
            {!inputState.isValid && <Text>{props.errorText}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Input