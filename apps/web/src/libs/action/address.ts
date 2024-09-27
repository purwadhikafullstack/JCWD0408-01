import { addressForm } from "@/types/address"
import Cookies from "js-cookie"


export const getAddrList = async () => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/address/user', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
    })

    return res.json()
}

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

export const editAddress = async (data: addressForm) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/address/user', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return res.json()
}

export const deleteAddress = async (address_id: string) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/address/user', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'DELETE',
        body: JSON.stringify({address_id})
    })

    return res.json()
}

