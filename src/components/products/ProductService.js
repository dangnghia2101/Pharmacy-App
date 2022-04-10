import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";

export const getProducts = async() => {
    const res = await axiosInstance.get(constants.API_PRODUCTS);
    return res;
}

export const getProductById = async(id) => {
    const res = await axiosInstance.get(`${constants.API_PRODUCTS}/${id}/detail`);
    return res;
}

export const getAllCart = async() => {
    const res = await axiosInstance.get('api/carts/get-all');
    return res;
}


export const getProductDetail = async(id) => {
    const res = await axiosInstance.get(`api/products/${id}/view`);
    return res;
}

export const saveCart = async(data) => {
    const res = await axiosInstance.post(`api/carts`, data)
    return res;
}

export const saveProfile = async(data) => {
    const res = await axiosInstance.post(`api/users/update-profile`, data)
    return res;
}

export const search = async(name) => {
    const res = await axiosInstance.get(`api/products/search?name=${name}`)
    return res;
}