import axios from "axios"

export const addOrder = async (contact, totalOrderPrice, listItems)=>{
    var data = {
        "data": {
            "idUser": contact?.idUser,
            "address": contact?.address,
            "phone": contact?.phone,
            "customerName": contact?.customerName,
            "totalOrderPrice": totalOrderPrice,
            "status": "new",
            "date": new Date(),
            "items": listItems
        }
    }

    let response = await axios.post('/orders', data)
    return response.data
}