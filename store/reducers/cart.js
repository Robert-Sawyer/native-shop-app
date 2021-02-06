import {ADD_TO_CART} from "../actions/cart";
import {add} from "react-native-reanimated";
import CartItem from "../../models/cart-item";

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

            let newOrUpdatedCartItem

            //jeśli mam już produkt w koszyku i chcę dodać nową sztukę tego samego produktu
            if (state.items[addedProduct.id]) {
                newOrUpdatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productTitle,
                    productPrice,
                    state.items[addedProduct.id].sum + productPrice
                )
            } else {
                newOrUpdatedCartItem = new CartItem(1, productTitle, productPrice, productPrice)
            }
            return {
                //nie muszę kopiować starego stanu w przypadku takim jak ten - gdy w każdym przypadku zmieniam
                //oba parametry stanu - items i totalamount. Jeśli dodałbym dodatkowe pole i zmieniał je
                //gdzieś indziej osobno to wtedy muszę skopiować stan w obu przypadkach
                ...state,
                items: {...state.items, [addedProduct.id]: newOrUpdatedCartItem},
                totalAmount: state.totalAmount + productPrice
            }
    }
    return state
}

export default cartReducer
