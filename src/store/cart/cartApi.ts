import api from "../../api";

// Fetch user's cart
export const getUserCart = () => {
    return api.get('/cart/');
}
export const creatCartForUser = () => {
    return api.post('/cart/');
}
// Add item to cart
export const addItemToCart = (data:any) => {
    return api.post('/cart/item/cartitem/', data);
}

// Remove item from cart
export const removeCartItem = (itemId:number) => {
    return api.delete(`/cart/item/cartitem/${itemId}/`);
}