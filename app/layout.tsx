import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import {Toaster} from "@/components/ui/sonner"
import "./globals.css";

import {
  ClerkProvider
} from '@clerk/nextjs'
import { Provider } from "./provider"


export const metadata: Metadata = {
  title: "PrepSphere AI",
  description: "PrepSphere AI : Exam and interview material generator",
};

const outfit = Outfit({
  subsets: ['latin']
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body
          className={outfit.className}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>

  );
}
