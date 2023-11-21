"use client"

import ConnectInstitution from "@/components/Connectinstitution"
import { Header } from "@/components/Header"
import { Loading } from "@/components/Loading"
import {  useReadInstitutionQuery } from "@/store/institutionApi"
import { useParams } from "next/navigation"

export default function Page() {
    const { institutionId } = useParams()
    const { data: institutionData, isFetching: isFetchingInstitution } = useReadInstitutionQuery({ institutionId: institutionId as string})

    return (<main className="w-full h-full flex flex-col">
        <Header/>
        <div className="flex-1 flex justify-center items-center">
        {isFetchingInstitution && <Loading />}
        {institutionData && <ConnectInstitution props={{ institutionName: institutionData.name, id: institutionData.id }} />}
        </div>
    </main>)
}