import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const date = new Date()
        const response = await fetch(`https://native-shop-app-d7b20-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cartItems, totalAmount, date: date.toISOString()})
        })
        if (!response.ok) {
            throw new Error('Coś poszło nie tak!')
        }
        const resData = await response.json()

        dispatch({
            type: ADD_ORDER,
            orderData: {id: resData.name, items: cartItems, amount: totalAmount, date: date}
        })

        //przechodze tutaj po elementach w koszyku i pobieram pushtoken z KAŻDEGO produktu z koszyka, tak, żeby KAŻDY
        //WŁAŚCICIEL PRODUCTU OTRZYMAŁ SWOJE POWIADOMIENIE
        for (const cartItem of cartItems) {
            const pushToken = cartItem.productPushToken

            console.log(cartItem)

            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: pushToken,
                    title: 'Złożono zamówienie',
                    body: cartItem.productTitle
                })

            })
        }
    }
}

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(`https://native-shop-app-d7b20-default-rtdb.firebaseio.com/orders/${userId}.json`)

            if (!response.ok) {
                throw new Error('Coś poszło nie tak!')
            }

            const resData = await response.json()
            const loadedOrders = []

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    ))
            }
            dispatch({type: SET_ORDERS, orders: loadedOrders})
        } catch (e) {
            throw e
        }
    }
}
