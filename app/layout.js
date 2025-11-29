// app/layout.js
import '../styles/_globals.scss';
import { Hind, Montserrat } from 'next/font/google';
import BannerStructuredData from '@/components/seo/BannerStructuredData';
import PageWrapper from '@/components/commonComponents/PageWrapper';

export const metadata = {
  // ADDED: This fixes relative URL issues for OG images and canonicals
  metadataBase: new URL('https://www.triquenchindia.com'),

  title: "TriQuench India Pvt Ltd - Intelligent Spindle Solutions",
  description: "TriQuench India Pvt Ltd, established in 2012 in Ahmedabad, specializes in CNC machine spindles, providing precision assembly services and world-class spindle repair solutions. Known for dynamic customer service and innovative spindle technology.",
  keywords: "CNC machine spindles, spindle repair, intelligent spindle solutions, CNC router spindle, belt-driven spindle, spindle accessories, TriQuench India, Ahmedabad, India",
  author: [{ name: "TriQuench India Pvt Ltd" }],
  
  openGraph: {
    type: "website",
    title: "TriQuench India Pvt Ltd - Intelligent Spindle Solutions",
    description: "Leading CNC spindle manufacturer in India, offering precision engineering, spindle repair services, and advanced spindle technology solutions.",
    url: "https://www.triquenchindia.com",
    siteName: "TriQuench India Pvt Ltd",
    images: [{ url: "/favicon/favicon-48x48.png" }],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "TriQuench India Pvt Ltd - Intelligent Spindle Solutions",
    description: "Your trusted partner in CNC spindle technology and repair services. Delivering excellence since 2012.",
    images: ["/favicon/favicon-48x48.png"],
  },

  icons: {
    icon: [
      { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon/favicon.ico'],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <BannerStructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}