"use client";

import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function SignUpPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const { name, email, password } = formData;

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to sign up. Please try again.");
            }
        }
    };

    const handleGoogleSignUp = async () => {
        setError("");
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to sign up with Google. Please try again.");
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition cursor-pointer"
                >
                    Sign Up
                </button>
            </form>
            <button
                onClick={handleGoogleSignUp}
                className="w-full py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 transition cursor-pointer"
            >
                Sign Up with Google
            </button>
            <p className="mt-4 text-[14px] font-medium text-center text-[#212121]">
                Already have an account?{" "}
                <Link href="/signin" className="text-teal-600 hover:underline cursor-pointer">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
