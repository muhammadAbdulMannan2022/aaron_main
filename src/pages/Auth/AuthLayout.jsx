import { Outlet } from "react-router"


export default function AuthLayout() {
    return (
        <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-main-bg)" }}>
            {/* Left side - Illustration (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
                <div className="w-full flex items-center justify-center flex-col gap-10">
                    <div className="mb-8 flex flex-col items-center justify-center">
                        <img src="/logo.png" className="h-12 w-auto" height={48} width={180} alt="" />
                        <p className="mt-4 text-lg" style={{ color: "var(--color-profile-text-main)" }}>
                            Maintain your process flow in a better way
                        </p>
                    </div>
                    <img src="/auth.png" className="w-full" alt="" />
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2">
                <Outlet />
            </div>
        </div>
    )
}
