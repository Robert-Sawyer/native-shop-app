import PRODUCTS from '../../data/data'

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {

    }

    return state
}

export default productsReducer
