import { toLower, isString, isBoolean, isNumber } from "lodash";

const skipedKey = [
    // Exemple:
    "offerTokenAddress",
];

const filterDatas = <T extends { [key: string]: any }>(filterValue: string, datas: T[]) => {
    if(!filterValue) return datas;

    return datas.filter((data: T) => {
        return Object.keys(data).map(key => {
            if(skipedKey.includes(key)) return false;

            const value = data[key as keyof typeof data];

            if(isString(value)){
                return toLower(value).includes(toLower(filterValue))
            }

            if (isBoolean(value)) {
                return (filterValue === 'true' && value) || (filterValue === 'false' && !value)
            }

            if (isNumber(value)) {
                return value.toString() == filterValue
            }

            return false
        }).includes(true);
    });
}

interface UseFilter<T>{
    filteredDatas: T[]
}

export const useFilter = <T extends { [key: string]: any }>(filterValue: string, datas: T[]): UseFilter<T> => {

    return {
        filteredDatas: filterDatas(filterValue,datas)
    }
}