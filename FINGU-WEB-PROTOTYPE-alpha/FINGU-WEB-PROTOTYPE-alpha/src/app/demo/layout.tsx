export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full w-full flex justify-center items-center">
            {children}
        </div>
    )
}