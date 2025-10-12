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
  manifest: '/manifest.json',
  keywords: ['AI', 'study materials', 'exam preparation', 'interview prep', 'education', 'learning'],
  authors: [{ name: 'PrepSphere AI' }],
  creator: 'PrepSphere AI',
  publisher: 'PrepSphere AI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/logo-dark.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'PrepSphere AI',
    description: 'PrepSphere AI : Exam and interview material generator',
    url: 'https://prepsphereai.vercel.app/',
    siteName: 'PrepSphere AI',
    images: [
      {
        url: '/logo-dark.svg',
        width: 200,
        height: 200,
        alt: 'PrepSphere AI Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrepSphere AI',
    description: 'PrepSphere AI : Exam and interview material generator',
    images: ['/logo-dark.svg'],
  },
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
          suppressHydrationWarning
        >
          <Provider>
            {children}
          </Provider>
          <Toaster/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator && typeof window !== 'undefined') {
                  window.addEventListener('load', function() {
                    // Only register in production or when explicitly needed
                    const isDev = window.location.hostname === 'localhost' || 
                                 window.location.hostname === '127.0.0.1';
                    
                    if (!isDev) {
                      navigator.serviceWorker.register('/sw.js')
                        .then(function(registration) {
                          console.log('SW registered successfully:', registration.scope);
                          
                          // Handle updates
                          registration.addEventListener('updatefound', function() {
                            console.log('SW update found');
                          });
                        })
                        .catch(function(registrationError) {
                          console.warn('SW registration failed:', registrationError);
                        });
                    } else {
                      console.log('Development mode: Service Worker registration skipped');
                    }
                  });
                }
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>

  );
}
