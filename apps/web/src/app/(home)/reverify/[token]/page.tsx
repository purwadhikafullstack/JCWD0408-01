import { reverifyEmail } from "@/libs/action/buyer"
import { navigate } from "@/libs/action/server"
import { UserRegister } from "@/types/user"

export default async function Reverify({ params }: { params: { token: string } }) {
    await reverifyEmail(params.token)
    navigate('/user')
    return (
        <div>

        </div>
    )
}