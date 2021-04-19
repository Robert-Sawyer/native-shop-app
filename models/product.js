class Product {
    constructor(id, ownerId, ownerPushToken, title, imageUrl ,description, price) {
        this.id = id
        this.ownerId = ownerId
        //pushToken a nie ownerPT bo w reducerze użyłem właśnie tej nazwy - tam jest ona potrzebna
        this.pushToken = ownerPushToken
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
}

export default Product
