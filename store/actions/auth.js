import {AsyncStorage} from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (token, userId, expTime) => {
    return dispatch => {
        //wysyłam dwie akcje jedna po drugiej, najpierw ustawiam timer a potem wysyłam akcję do reducera
        dispatch(setLogoutTimer(expTime))
        dispatch({type: AUTHENTICATE, token: token, userId: userId})
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjy2rgIBMpnyHUdq_73xruCPFNMQ9dsi8', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    //info o tych niezbędnych do autoryzacji danych jest w docs firebase - rest api firebase
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Coś poszło nie tak!'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Istnieje już użytkownik o takim adresie e-mail'
            }
            throw new Error(message)
        }

        const resData = await response.json()

        console.log(resData)
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjy2rgIBMpnyHUdq_73xruCPFNMQ9dsi8', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    //info o tych niezbędnych do autoryzacji danych jest w docs firebase - rest api firebase
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Coś poszło nie tak!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Nie znaleziono takiego adresu e-mail'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Nieprawidłowe hasło'
            } else if (errorId === 'USER_DISABLED') {
                message = 'Zostałeś zbanowany :('
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData.idToken)
        console.log(resData.localId)
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        //zawojam date w date żeby przekształcić liczbę milisekund z powrotem w datę
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const logout = () => {
    //zanim wyślę akcję z wologowaniem muszę wyzerować timery odliczające czas do automatycznego wylogowania
    //i usunąc dane z async storage
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {type: LOGOUT}
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        //tworzę let timer żeby wyczyścić wszystkie zbędne timery, a robię to w funkcji clear i muszę
        //mieć dostęp do tej zmennej, dlatego tworzę ją globalnie i nie przypisuję wartości
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expDate: expirationDate.toISOString()
    }))
}
