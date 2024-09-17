export interface UserRegister {
    email: string
}

export interface UserLogin {
    email: string
    password: string
}

export interface UserFirstVerification {
    first_name: string
    password: string
    phone: string
}

export interface Buyer {
    first_name: string
    last_name: string
    email: string
    phone: string
    date_ob: string
    avatar: File
}

export interface BuyerAvatar {
    avatar: File
}