import { UserFirstVerification } from "@/types/user";

export const verificationProcess = async (token: string, data: UserFirstVerification) => {
  const res = await fetch('http://localhost:8000/api/auth/verification', {
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
