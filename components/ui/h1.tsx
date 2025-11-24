export function H1({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-left gap-3">
            <h1 className="text-4xl font-bold">{children}</h1>
        </div>
    )
}
