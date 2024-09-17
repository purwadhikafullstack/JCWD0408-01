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
    const response = await avatarUpload(buyerAvatar);
    // Handle the response from the API
  }
  
  function dataURLtoFile(dataURL: string, fileName: string): File {
    // Split the data URL into two parts (header and base64)
    const [header, base64String] = dataURL.split(",");
  
    // Extract the mime type from the header (e.g., "image/jpeg")
    const mimeType = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  
    // Decode the base64 string to binary data
    const byteString = atob(base64String);
  
    // Convert binary data to array of bytes
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
  
    // Create a Blob from the byte array and mime type
    const blob = new Blob([byteArray], { type: mimeType });
  
    // Convert the Blob to a File object
    return new File([blob], fileName, { type: mimeType });
  }
