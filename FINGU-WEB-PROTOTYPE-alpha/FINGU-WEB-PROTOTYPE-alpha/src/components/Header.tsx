import { useSignOutMutation } from "@/store/authApi";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter();
    const pathName = usePathname()

    const [signOut] = useSignOutMutation()

    const signOutHandler = async () => {
        await signOut({})
        router.push('/auth')
    }

    const connectBankHandler = async () => {
        router.push('/connect')
    }

    const backHandler = async () => {
        router.back()
    }
    return (
        <div className="flex items-center px-4 py-2 gap-2">
            <div className="text-lg font-bold mr-auto">
                Fingu Web Prototype
            </div>
            <div>
                {pathName === '/' && <button className="btn btn-primary btn-sm" onClick={connectBankHandler}>Connect Bank</button>}
                {pathName !== '/' && <button className="btn btn-primary btn-sm" onClick={backHandler}>back</button>}
            </div>
            <div>
                <button className="btn btn-secondary btn-sm" onClick={signOutHandler}>Sign Out</button>
            </div>
        </div>
    )
}