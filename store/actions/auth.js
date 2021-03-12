export const SIGNUP = 'SIGNUP'


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

        // if(!response.ok) {
        //     throw new Error('Coś poszło nie tak!')
        // }

        const resData = await response.json()

        console.log(resData)
        dispatch({type: SIGNUP})
    }
}
