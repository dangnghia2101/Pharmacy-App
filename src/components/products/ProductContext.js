import React, { createContext, useState, useEffect } from 'react';
import { getProducts, getProductById, getAllCart, saveCart, saveProfile, search } from './ProductService';
import constants from "../../utils/constants";

export const ProductContext = createContext();
export const ProductContextProvider = props => {
    const { children } = props

    const [cart, setCart] = useState([])

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])

    const updateCart = (product, price, quantity, checked) => {
        let _cart = cart
        quantity = quantity > 3 ? 3: quantity;
        if(cart.length == 0){
            //Gior hàng rỗng
            _cart.push({product, price, quantity, checked})
        }else{
            let item = _cart.filter(i => i.product._id == product._id);
            if(item.length == 0){
                //Nothing in cart
                _cart.push({product, price, quantity, checked})
            }else{
                //Have product cart
                if(quantity ==   0){
                    _cart = _cart.filter(i => i.product._id != product._id)
                }else{
                    _cart = _cart.map(item => {
                        if(item.product._id == product._id){
                            item.quantity = quantity > 3 ? 3 : quantity;
                        }
                        return item;
                    })
                }

            }
        }
        setCart([..._cart]);
    }

    //Get all cart
    const onGetAllCart = async () => {
        try{
            const res = await getAllCart();
            if(res.error == false){
                return res.data;
            }
        }catch(err){
            console.error("onGetAllCart error: ", err)
        }
        return [];
    }

    const getCart = () => cart;

    const deleteCart = () => setCart([...[]])

    const onGetProducts = async () => {
        try{
            const res = await getProducts();
            setProducts(res)
            return res 
        }catch(err){
            console.error("onGetProductForHomePage error: ", err)

        }
        return [];
    }

    const onGetProductById = async (id) => {
        try{
            const res = await getProductById(id);
            setProduct(res)
            return res
        }catch(err){
            console.error("onGetProductForHomePage error: ", err)

        }
        return [];
    }


    const onSaveCart = async () => {
        try {
            let total = 0;
            let products = [];
            for(let index = 0; index < cart.length; index++) {
                const element = cart[index];
                total += element.quantity * element.price;
                products.push({
                    product: element.product._id,
                    quantity: element.quantity,
                    price: element.price
                })
            }
            await saveCart({ total, products});
            setCart([...[]]);
        } catch (error) {
            console.log("onSaveCart error: ", error)    
        }
    }

    const onSaveProfile = async (profile) => {
        try {
            await saveProfile(profile);
        } catch (error) {
            console.log("onSaveProfile error: ", error)    
        }
    }

    const onSearch = async (name) => {
        try {
            const res = await search(name);
            if(res.error == false){
                return res.data;
            }
        }catch (error) {
            console.log("onSearch error: ", error)
        }
        return [];
    }

    return(
        <ProductContext.Provider
            value={{
                onGetProducts,
                onGetProductById,
                updateCart, getCart, deleteCart,
                onGetAllCart,
                cart, onSaveCart, onSearch, onSaveProfile, product, products
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}