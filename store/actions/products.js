import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const createProduct = (title, imageUrl, price, description) => {
    return async dispatch => {
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
        const response = await fetch('https://native-shop-app-d7b20-default-rtdb.firebaseio.com/products.json', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            //obiektem wysyłanym do bazy będzie obiekt json, ametoda stringify przekształca tablicę, lub obiekt JS
            //właśnie w obiekt JSON. Produkt jest obiektem JS więc potrzeba przekształcić go w jsona
            body: JSON.stringify({title, imageUrl, price, description})
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
                description
            }
        })
    }
}

export const fetchProducts = () => {
    return async dispatch => {
        //pobieram produkty domyślną metoda get bez headersów i body więc nie potrzebuję configa
        const response = await fetch('https://native-shop-app-d7b20-default-rtdb.firebaseio.com/products.json')

        const resData = await response.json()
        const loadedProducts = []

        for (const key in resData) {
            loadedProducts.push(
                new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
        }

        dispatch({type: SET_PRODUCTS, products: loadedProducts})
    }
}

export const updateProduct = (id, title, imageUrl, price, description) => {
    return {
        type: UPDATE_PRODUCT,
        prodId: id,
        productData: {
            title,
            imageUrl,
            price,
            description
        }
    }
}

export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT, prodId: productId}
}
