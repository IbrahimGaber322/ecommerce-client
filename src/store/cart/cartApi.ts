import api from "../../api";

// get user's cart
export const getUserCart = () => {
    return api.get('/cart/');
}
export const creatCartForUser = () => {
    return api.post('/cart/');
}
// Add item to cart
export const addItemToCart = (data:any) => {
    console.log(data)
    return api.post('/cart/item/cartitem/', data,{headers:{"Content-Type":"application/json"}});
}
// export const addItemToCart = (data: any) => {
//     console.log("ddddddddddddd")
//     const jsonData = JSON.stringify(data);
//     return api.post('/cart/item/cartitem/', jsonData);
// }
// Remove item from cart
export const removeCartItem = (itemId:number) => {
    return api.delete(`/cart/item/cartitem/${itemId}/`);
}
// update item from cart
export const updateCartItem = (itemId:number) => {
    return api.patch(`/cart/item/cartitem/${itemId}/`);
}