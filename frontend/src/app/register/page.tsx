import AuthCard from "@/features/auth/components/AuthCard";
import Logo from "@/features/auth/components/Logo";
import RegisterForm from "@/features/auth/components/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-amber-50 to-emerald-50 py-16">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-8 flex items-center justify-center">
                    <Logo />
                </div>

                <AuthCard
                    aside={
                        <div className="relative w-full h-full">
                            <Image
                                src="/auth/images/farm2.jpg"
                                alt="Mandi trading management"
                                fill
                                className="object-cover"
                            />
                        </div>
                    }
                >
                    <div className="w-full">
                        <h2 className="mb-4 text-xl font-semibold">
                            Create Your Firm
                        </h2>
                        <RegisterForm />
                    </div>
                </AuthCard>
            </div>
        </div>
    );
}
