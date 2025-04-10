"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function SignInPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (err) {
            console.error(err);
            setError("Failed to sign in. Please check your credentials.");
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to sign in with Google. Please try again.");
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition cursor-pointer"
                >
                    Sign In
                </button>
            </form>
            <button
                onClick={handleGoogleSignIn}
                className="w-full py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 transition cursor-pointer"
            >
                Sign In with Google
            </button>
            <p className="mt-4 text-[14px] font-medium text-center text-[#212121]">
                Do not have an account?{" "}
                <Link href="/signup" className="text-teal-600 hover:underline cursor-pointer">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
