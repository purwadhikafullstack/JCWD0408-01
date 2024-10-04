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

    return res
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

export const deleteAddress = async (address_id: number) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/address/user', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'DELETE',
        body: JSON.stringify({address_id})
    })

    return res
}

export const setDefaultAddr = async (address_id: number) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/address/userdef', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify({address_id})
    })

    return res
}

export const provinceList = async () => {
    const cacheKey = 'provinces';
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();
    const expirationTime = 3600000; // 1 hour in milliseconds

    // Check if cached data exists and is still valid
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < expirationTime) {
            return data; // Return cached data
        }
    }

    // If cache is empty or expired, fetch new data
    const token = Cookies.get('token');
    const res = await fetch('http://localhost:8000/api/address/prov', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch provinces');
    }

    const newData = await res.json();

    // Store new data in localStorage
    localStorage.setItem(cacheKey, JSON.stringify({ data: newData, timestamp: now }));

    return newData;
};

export const cityList = async (provinceId: string) => {
    const cacheKey = `cities_${provinceId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();
    const expirationTime = 3600000; // 1 hour in milliseconds

    // Check if cached data exists and is still valid
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < expirationTime) {
            return data; // Return cached data
        }
    }

    // If cache is empty or expired, fetch new data
    const token = Cookies.get('token');
    const res = await fetch('http://localhost:8000/api/address/city', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'POST', // Assuming you're using POST for sending province_id
        body: JSON.stringify({ province_id: provinceId }), // Sending province_id in the body
    });

    if (!res.ok) {
        throw new Error('Failed to fetch cities');
    }

    const newData = await res.json();

    // Store new data in localStorage
    localStorage.setItem(cacheKey, JSON.stringify({ data: newData, timestamp: now }));

    return newData;
};


