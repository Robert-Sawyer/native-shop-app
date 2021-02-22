import PRODUCTS from '../../data/data'
import {DELETE_PRODUCT} from "../actions/products";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:

            return {
                ...state,
                userProducts: state.userProducts.filter(product =>
                    //filtruję po produktach i zachowuję wszystkie te, których id się nie zgadza, czyli jeśli się
                    //zgadza, to znaczy, że właśnie ten product chcę usunąć, bo id jest przekazywane do funkcji delete
                    product.id !== action.prodId),
                availableProducts: state.availableProducts.filter(product =>
                product.id !== action.prodId)
            }
    }

    return state
}

export default productsReducer
