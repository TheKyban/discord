import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Discord",
    description: "By Aditya",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(
                        open_sans.className,
                        "bg-white dark:bg-[#313338]"
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        storageKey="discordTheme"
                    >
                        <ModalProvider />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
