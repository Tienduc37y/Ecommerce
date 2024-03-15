import axios from "axios";

export const searchProductByName = async (txt) => {
    const response = await axios.get(`/products?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[name][$contains]=${txt}`);
    return response.data;
}
