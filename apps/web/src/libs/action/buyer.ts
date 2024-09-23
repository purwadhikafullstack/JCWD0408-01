import { BuyerAvatar, UserLogin, UserRegister } from "@/types/user";
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
