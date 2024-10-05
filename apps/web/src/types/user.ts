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
    password: string
}

export interface BuyerAvatar {
    avatar: File
}

export interface Referral {
    referral_code: string
}

export interface ResetPassword {
    password: string
    newPassword: string
}

export interface UserPhone {
    phone: string
}