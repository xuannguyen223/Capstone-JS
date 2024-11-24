import { getEle } from "./commonUtils.js"

export const kiemTraRong = (value, idErr, message) =>{
    if(value.trim() === ""){
        getEle(idErr).innerHTML = message;
        return false;
    }
    else{
        getEle(idErr).innerHTML = "";
        return true;
    }
};

export const kiemTraSo = (value, idErr, message) => {
    const regexNumber = /^\$?[0-9]+$/;
    const isNumber = regexNumber.test(value);
    if(isNumber){
        getEle(idErr).innerHTML = "";
        return true;
    }
    else{
        getEle(idErr).innerHTML = message;
        return false;
    }
};