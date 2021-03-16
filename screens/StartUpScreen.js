import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'


const StartUpScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {

        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                props.navigation.navigate('Auth')
                return;
            }
            const transformedData = JSON.parse(userData)
            const {token, userId, expDate} = transformedData
            const expirationDate = new Date(expDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return;
            }
            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(token, userId))
        }

        tryLogin()
    }, [dispatch])

    return (
        <View>
            <ActivityIndicator size='large' color={Colors.headerColor}/>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default StartUpScreen
