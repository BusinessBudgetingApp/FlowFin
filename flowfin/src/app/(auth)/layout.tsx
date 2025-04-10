import "../globals.css"; 

export const metadata = {
    title: "Authentication",
    description: "Sign in or sign up to access the application.",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-teal-700">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    {children}
                </div>
            </body>
        </html>
    );
}
