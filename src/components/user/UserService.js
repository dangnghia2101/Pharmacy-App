import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";

export const SignIn = async (email, password) => {
    const data = {  
        email, password
    }
    console.log(email, password);
    const res = await axiosInstance.post(constants.API_LOGIN, data);
    return res;
}

export const SignUp = async (email, password, confirm_password) => {
    const data = {  
        email, password, confirm_password
    }
    const res = await axiosInstance.post(constants.API_REGISTER, data);
    return res;
}