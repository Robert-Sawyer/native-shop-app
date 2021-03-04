import PRODUCTS from '../../data/data'
import {CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT} from "../actions/products";
import Product from "../../models/product";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.prodId)
            const updatedProduct = new Product(
                action.prodId,
                //ownerId nie uega zmianie więc pobieram dane konkretnego produktu i biore id
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price)
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.prodId)
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductIndex] = updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
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
