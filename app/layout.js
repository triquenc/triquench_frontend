// --- IMPORTS ---
import '../styles/_globals.scss'; // Your global styles
import { Hind, Montserrat } from 'next/font/google'; // Import fonts correctly
import BannerStructuredData from '@/components/seo/BannerStructuredData'; // Your SEO component
import PageWrapper from '@/components/commonComponents/PageWrapper';// The new client component

// --- FONT SETUP ---
// const hind = Hind({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-hind',
// });

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-montserrat',
// });

// --- THIS IS ALL YOUR METADATA, MOVED TO THE CORRECT PLACE ---
export const metadata = {
  title: "TriQuench India Pvt Ltd - Intelligent Spindle Solutions",
  description: "TriQuench India Pvt Ltd, established in 2012 in Ahmedabad, specializes in CNC machine spindles, providing precision assembly services and world-class spindle repair solutions. Known for dynamic customer service and innovative spindle technology.",
  keywords: "CNC machine spindles, spindle repair, intelligent spindle solutions, CNC router spindle, belt-driven spindle, spindle accessories, TriQuench India, Ahmedabad, India",
  author: [{ name: "TriQuench India Pvt Ltd" }],
  
  openGraph: {
    type: "website",
    title: "TriQuench India Pvt Ltd - Intelligent Spindle Solutions",
    description: "Leading CNC spindle manufacturer in India, offering precision engineering, spindle repair services, and advanced spindle technology solutions.",
    url: "https://www.spindlemotor.in",
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
// --- END OF METADATA ---


// --- ROOT LAYOUT COMPONENT (This is a Server Component) ---
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Your SEO Schema file IS placed here */}
        <BannerStructuredData />
        
        {/* Your font links ARE placed here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* PageWrapper handles the client-side logic */}
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}