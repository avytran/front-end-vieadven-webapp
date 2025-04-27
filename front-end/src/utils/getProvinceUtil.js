export const getProvinceColor = (allowedProvinces, key) => {
    if(allowedProvinces.includes(key) && allowedProvinces[allowedProvinces.length - 1] === key){
        return "#f37c3f";
    }

    if(allowedProvinces.includes(key)){
        return "#1DB973"
    }

    else {
        return "#D3D5D6";
    }
}


export const getProvinceIds = (allowedProvinces) => {
    return allowedProvinces.map(province => province.province_id.trim());
}

export const getProvinceName = (allowedProvinces, key) => {
    const province = allowedProvinces?.find(province => province.province_id.trim() === key);
    return province ? province.province_name : "";
}