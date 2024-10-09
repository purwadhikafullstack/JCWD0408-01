import { UserFirstVerification } from "@/types/user";
import Cookies from "js-cookie";
import { navigate } from "./server";
import { toast } from "react-toastify";

export const onLogout = async () => {
  Cookies.remove('token')
  localStorage.clear()
  navigate('/')
  toast.success("You've logged out")
}

export const verificationProcess = async (token: string, data: UserFirstVerification) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/verification`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  const response = await res.json();
  return { result: response, ok: res.ok };
};
