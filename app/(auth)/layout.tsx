// general imports
import { Metadata } from "next/types";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

//styles
import "../globals.css";

//set up the metadata
export const metadata: Metadata = {
  title: "BCS connect",
  description:
    "A community app for BCS workers to connect and share resources.",
};

//set up the font
const inter = Inter({ subsets: ["latin"] });

//set up the layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
