import { UserLogin, UserRegister } from "@/types/user";

export const registerBuyer = async (data: UserRegister) => {
    const res = await fetch('http://localhost:8000/api/auth/register', {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    return res.json()
}

export const loginBuyer = async (data: UserLogin) => {
    const res = await fetch('http://localhost:8000/api/auth/login', {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    const response = await res.json()
    return {result: response, ok: res.ok}
}

