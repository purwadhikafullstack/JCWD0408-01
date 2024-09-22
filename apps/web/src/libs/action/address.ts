import { addressForm } from "@/types/address"
import Cookies from "js-cookie"

export const addAddress = async (data: addressForm) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/address/user', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    return res.json()
}