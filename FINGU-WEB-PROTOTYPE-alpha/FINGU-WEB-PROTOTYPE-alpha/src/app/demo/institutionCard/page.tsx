import { InstitutionCard } from "@/components/InstitutionCard";

export default function Page() {
    return (
        <>
            <InstitutionCard props={{ id: "1", name: "test", isConnected: true }} />
            <InstitutionCard props={{ id: "2", name: "test", isConnected: false }} />
        </>
    )
}