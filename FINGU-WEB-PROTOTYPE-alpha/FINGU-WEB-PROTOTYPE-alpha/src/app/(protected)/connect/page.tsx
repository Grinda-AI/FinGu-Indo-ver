"use client"
import { Header } from "@/components/Header";
import { InstitutionCard } from "@/components/InstitutionCard";
import { Loading } from "@/components/Loading";
import { useReadSessionQuery } from "@/store/authApi";
import { useReadInstitutionsQuery } from "@/store/institutionApi";


export default function Page() {
    const {data:session} = useReadSessionQuery({}) 
    const {data:institutionList, isFetching:isFetchingInstitutionList} = useReadInstitutionsQuery({userId:session?.user.id as string})

    return (
        <main className="m-auto flex h-full w-full max-w-screen-2xl flex-col">
            <Header />
            <div className="h-full w-full self-center p-2 overflow-y-scroll scrollbar-thumb-neutral scrollbar-track-base-100 scrollbar-thin scrollbar-rounded-lg" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr)",
                gridTemplateRows: "auto",
                alignContent:"start",
                gap: "5px",
            }}>
                {isFetchingInstitutionList && <Loading/>}
                {institutionList?.data && institutionList?.data?.map((institution) => {
                    return (
                        <InstitutionCard key={institution.id} props={{id:institution.id, name: institution.name, isConnected: institution.is_connected}}/>
                    )
                })}
            </div>
        </main>
    )
}