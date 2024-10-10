import { StoreData } from "@/types/superadmin"
import Cookies from "js-cookie"

export const createStore = async (data: StoreData) => {
    const token = Cookies.get('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}superadmin/store`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    return res.json()
}

export const editStore = async (data: StoreData) => {
    const token = Cookies.get('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}superadmin/store`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return res.json()
}

export const deleteStore = async (store_id: number) => {
    const token = Cookies.get('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}superadmin/store`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'DELETE',
        body: JSON.stringify({store_id})
    })
    
    return res
}