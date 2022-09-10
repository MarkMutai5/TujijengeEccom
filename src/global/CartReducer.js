
export const CartReducer = (state, action) => {

    const {shoppingCart, totalPrice, totalQty} = state

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {
        case 'ADD_TO_CART':
            const check = shoppingCart.find( product => product.ProductId === action.id)
            if(check){
                console.log("Product already in cart");
                return state
            }
            else{
                product = action.product
                product ['qty'] = 1
                product ['TotalProductPrice'] = product.ProductPrice * product.qty
                updatedQty = totalQty + 1
                updatedPrice = totalPrice + product.ProductPrice 
                return{
                    shoppingCart: [ product, ...shoppingCart], totalPrice: updatedPrice, totalQty:updatedQty
                }
            }
            break

    }
}