"use client"
import { useReadSessionQuery } from "@/store/authApi"
import { useDisconnectInstitutionMutation } from "@/store/institutionApi"
import { useRouter } from "next/navigation"
import { z } from "zod"

export const InstitutionCardPropsSchema = z.object({
    id: z.string(),
    name: z.string().default(""),
    isConnected: z.boolean().default(false)
})

export type InstitutionCardProps = z.infer<typeof InstitutionCardPropsSchema>

export const InstitutionCard = ({ props }: { props: InstitutionCardProps }) => {
    const router = useRouter()
    const { data: session } = useReadSessionQuery({})
    const [disconnectInstitution, disconnectInstitutionResponse] = useDisconnectInstitutionMutation({})
    const connectInstitutionHandler = async () => {
        router.push(`/connect/${props.id}`)
    }

    const disconnectInstitutionHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!session?.user.id) {
            return
        }

        await disconnectInstitution({ institutionId: props.id, userId: session.user.id })
    }

    return (
        <div className={`max-w-xs bg-neutral rounded-box p-2 text-neutral-content flex justify-between items-center pl-4`}>
            <span className="font-bold text-lg cursor-default">
                {props.name}
            </span>
            <span>
                {props.isConnected && <button className="btn btn-ghost btn-sm hover:bg-error hover:text-error-content" onClick={disconnectInstitutionHandler}>
                    {disconnectInstitutionResponse.isLoading && <span className="loading loading-spinner"></span>}
                    Disconnect</button>}
                {!props.isConnected && <button className="btn btn-ghost btn-sm hover:bg-success hover:text-success-content" onClick={connectInstitutionHandler}>Connect</button>}
            </span>
        </div>
    )
}