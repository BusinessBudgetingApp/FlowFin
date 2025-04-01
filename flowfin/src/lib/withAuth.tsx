"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export function withAuth(Component: React.ComponentType) {
    return function AuthenticatedComponent(props: React.ComponentProps<typeof Component>) {
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (!user) {
                    router.push("/signin");
                }
            });

            return () => unsubscribe();
        }, [router]);

        return <Component {...props} />;
    };
}
