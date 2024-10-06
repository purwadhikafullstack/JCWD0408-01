import { BuyerAvatar, ResetPassword, UserLogin, UserRegister } from "@/types/user";
import { RefCodeVoucher } from "@/types/voucher";
import Cookies from "js-cookie";

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
    const token = Cookies.get('token')
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


const avatarUpload = async (data: BuyerAvatar) => {
    const token = Cookies.get('token')
    const formData = new FormData()
    formData.append('avatar', data.avatar as File)
    const res = await fetch('http://localhost:8000/api/user', {
        headers: {
            Authorization : `Bearer ${token}`
        },
        method: "PATCH",
        body: formData
    })
    return res.json()
}

export const updateAvatar = async (dataUrl: string) => {
    const file = dataURLtoFile(dataUrl, 'cropped-image.png');
    const buyerAvatar: BuyerAvatar = { avatar: file };
    await avatarUpload(buyerAvatar);
  }
  
  function dataURLtoFile(dataURL: string, fileName: string): File {
    const [header, base64String] = dataURL.split(",");
    const mimeType = header.match(/:(.*?);/)?.[1] || "image/jpeg";
    const byteString = atob(base64String);
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  }

  export const reqChangePass = async (data: UserRegister) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/auth/reqchangepass', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
  }

  export const changePass = async (token: string ,data: ResetPassword) => {
    const res = await fetch('http://localhost:8000/api/auth/resetpassword', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    })
    return res.json()
  }

  export const changeEmail = async (data: UserRegister) => {
    const token = Cookies.get('token')
    const res = await fetch('http://localhost:8000/api/user/changemail', {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
  }

  export const reverifyEmail = async (token: string) => {
    const res = await fetch(`http://localhost:8000/api/user/reverify/${token}`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'PATCH',
    })
    return res.json()
  }

  export const buyerVoucher = async () => {
    const token  = Cookies.get('token')
    const res = await fetch(`http://localhost:8000/api/voucher/ref`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    })
    return res.json()
  }