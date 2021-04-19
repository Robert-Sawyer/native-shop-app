import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from "../../models/cart-item";
import {ADD_ORDER} from "../actions/orders";
import {DELETE_PRODUCT} from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title
            const pushToken = addedProduct.pushToken

            let newOrUpdatedCartItem

            //jeśli mam już produkt w koszyku i chcę dodać nową sztukę tego samego produktu
            if (state.items[addedProduct.id]) {
                newOrUpdatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productTitle,
                    productPrice,
                    state.items[addedProduct.id].sum + productPrice,
                    pushToken
                )
            } else {
                newOrUpdatedCartItem = new CartItem(1, productTitle, productPrice, productPrice, pushToken)
            }
            return {
                //nie muszę kopiować starego stanu w przypadku takim jak ten - gdy w każdym przypadku zmieniam
                //oba parametry stanu - items i totalamount. Jeśli dodałbym dodatkowe pole i zmieniał je
                //gdzieś indziej osobno to wtedy muszę skopiować stan w obu przypadkach
                ...state,
                items: {...state.items, [addedProduct.id]: newOrUpdatedCartItem},
                totalAmount: state.totalAmount + productPrice
            }
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.prodId]
            const currentQuantity = selectedCartItem.quantity
            let updatedCartItems
            if (currentQuantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productTitle,
                    selectedCartItem.productPrice,
                    selectedCartItem.sum - selectedCartItem.productPrice
                )
                //aktualizuję obiekty w koszyku o ten usunięty
                updatedCartItems = {...state.items, [action.prodId]: updatedCartItem}
            } else {
                //w przypadku gdy mam tylko jedną sztukę produktu w koszyku kopiuję stan i usuwam cały produkt
                //o określonym id
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.prodId]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: Math.abs(state.totalAmount - selectedCartItem.productPrice)
            }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            //sprawdzam, czy usuwany produkt jest w ogóle w koszyku, jesli nie, to zwracam state i nie robie nic
            if (!state.items[action.prodId]) {
                return state
            }
            //kopiuję produkty...
            const updatedItems = {...state.items}
            //pobieram kwotę usuwanego produktu...
            const itemAmount = state.items[action.prodId].sum
            //i usuwam produkt z listy...
            delete updatedItems[action.prodId]
            return {
                ...state,
                items: updatedItems,
                //odejmuję od całkowitej kwoty wartośc usuniętego produktu
                totalAmount: state.totalAmount - itemAmount
            }
    }

    return state
}

export default cartReducer
