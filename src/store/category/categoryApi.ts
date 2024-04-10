import api from "../../api";


export const getCategories = () => {
    return api.get('/category/')
}

export const getCategoryById = (categoryId:number) => {
    console.log(categoryId)
    console.log( `/category/${categoryId}/`)

    return api.get(`/category/${categoryId}/`);
}


export const searchCategories = (data:any) => {
    const { name = '' } = data;
    return api.get(`/category/?name=${name}`);
}


