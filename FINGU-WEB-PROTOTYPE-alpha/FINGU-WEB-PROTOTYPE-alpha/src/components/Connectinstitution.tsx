"use client"
import { useReadSessionQuery } from "@/store/authApi"
import { useConnectInstitutionMutation } from "@/store/institutionApi"
import { useRouter } from "next/navigation"
import React, {useRef } from "react"
import z from "zod"


const ConnectInstitutionPropsSchema = z.object({
    id: z.string(),
    institutionName: z.string().default(""),
})

type ConnectInstitutionProps = z.infer<typeof ConnectInstitutionPropsSchema>

export default function ConnectInstitution({ props }:{ props: ConnectInstitutionProps }) {
    const [connectInstitution, connectInstitutionResponse] = useConnectInstitutionMutation()
    const { data: session } = useReadSessionQuery({})
    const ref = useRef(null)
    const router = useRouter()
    
    const ConnectInstitutionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const data = Object.fromEntries(form.entries())
        if (!data?.id || !data?.password || !props?.id || !session?.user?.id){
            return
        }

        const newData = {
            username: data.id.toString(),
            password: data.password.toString(),
            institutionId: props.id,
            userId: session.user.id
        }
        const connectInstitutionResponse = await connectInstitution(newData)

        if ("error" in connectInstitutionResponse){
            return
        }

        if("data" in connectInstitutionResponse){
            router.push("/")
        }

        if (ref.current){
            // @ts-ignore
            ref.current.reset()
        }
    }
    return (
        <form ref={ref} className="flex flex-1 items-center justify-center p-9 rounded-box max-w-sm w-screen flex-col bg-base-300 text-neutral-content gap-2 shadow-md" onSubmit={ConnectInstitutionHandler}>
            <div className="font-bold text-xl pb-2">
                {props.institutionName}
            </div>
            <label htmlFor="id" className="self-start pl-2 text-sm">
                ID :
            </label>
            <input name="id" type="text" placeholder="ID" className="input input-bordered w-full" />
            <label htmlFor="password" className="self-start pl-2 text-sm">
                Password :
            </label>
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" />
            <button type="submit" className={`btn mt-5 btn-block btn-primary ${connectInstitutionResponse.isLoading ? "btn-disabled" : ""}`}>
                {connectInstitutionResponse.isLoading && <span className="loading loading-spinner"></span>}
                Connect
            </button>
            <div className="text-sm text-center text-base-content/80">
                By syncing your data, Fingu can give you a real time personalized insight on your finance.
            </div>
        </form>
    )
}