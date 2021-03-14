import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const createProduct = (title, imageUrl, price, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        //redux thunk pozwala na zwrócenie funkcji przez kreator akcji i podstawienie jej w miejsce pierwszego
        //argumentu funkcji dispatch w komponencie który tę akcje dispatchuje
        //mogę teraz zamieścic w tym miejscu dowolny kod asynchroniczny np żadanie HTTP np zapytanie do API
        //wysyłam zapytanie do firebase i dodaję samodzielnie endpoint products a firebase sam utworzy folder w bazie
        //w przypadku firebase trzeba jednak dodać na końcu .json
        //fetch domyślnie wysyła zapytanie metodą get, ale do zapisania danych potrzeba metody post i dlatego wymagany
        //jest drugi argument metody fetch
        //używam nowoczesnej skłądni async await która zastępuje wykorzystanie .then(response => ...). Oznacza to, że
        //funkcja zwracana przez createProduct jest asynchroniczna i program ma zaczekać na odpowiedź, która przychodzi
        // z serwera po wysłaniu zapytania fetch i zapisać ją w stałej response.
        //Trzeba też pamiętać, że funkcja async await zwraca Promise więc cała funkcja createProduct też zwraca promise
        const response = await fetch(`https://native-shop-app-d7b20-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            //obiektem wysyłanym do bazy będzie obiekt json, ametoda stringify przekształca tablicę, lub obiekt JS
            //właśnie w obiekt JSON. Produkt jest obiektem JS więc potrzeba przekształcić go w jsona
            body: JSON.stringify({
                title,
                imageUrl,
                price,
                description,
                ownerId: userId
            })
        })

        //zapisuję sobie dane zwrócone przez firebase bo wysłaniu zapytania. Jest top też zadanie asynchroniczne więc
        //dodaje await
        const resData = await response.json()

        //diapatch poniżej wykona się dopiero gdy wszystkie akcje oznaczone await sie wykonają.
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                imageUrl,
                price,
                description,
                ownerId: userId
            }
        })
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            //pobieram produkty domyślną metoda get bez headersów i body więc nie potrzebuję configa
            const response = await fetch(
                `https://native-shop-app-d7b20-default-rtdb.firebaseio.com/products.json`)

            if (!response.ok) {
                throw new Error('Coś poszło nie tak!')
            }

            const resData = await response.json()
            const loadedProducts = []

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    ))
            }

            console.log(getState())
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })
        } catch (e) {
            throw e
        }
    }
}

export const updateProduct = (id, title, imageUrl, price, description) => {
    //redux thnk daje możliwość przyjęcia drugiego argumentu i ppbrania stanu z reduxa a tutaj potrzebuję tego, żeby
    //uzyskac token autoryzacyjny zalogowanego usera żeby móc edytowac produkty
    return async (dispatch, getState) => {
        console.log(getState())
        const token = getState().auth.token
        const response = await fetch(
            `https://native-shop-app-d7b20-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: 'patch',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, imageUrl, price, description})
            })
        if (!response.ok) {
            throw new Error('Coś poszło nie tak!')
        }
        dispatch({
            type: UPDATE_PRODUCT,
            prodId: id,
            productData: {
                title,
                imageUrl,
                price,
                description
            }
        })
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(
            `https://native-shop-app-d7b20-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: 'delete',
            })
        if (!response.ok) {
            throw new Error('Coś poszło nie tak!')
        }
        dispatch({type: DELETE_PRODUCT, prodId: productId})
    }
}
