export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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

        if(!response.ok) {
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
        dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId})
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

        if(!response.ok) {
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

        console.log(resData)
        dispatch({type: LOGIN, token: resData.idToken, userId: resData.localId})
    }
}
