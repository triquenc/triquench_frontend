
import ContactUsInfo from '@/components/contactComponents/contactpage';


// 1. SEO METADATA (On-Page SEO)
export const metadata = {
  title: 'Contact Us - Triquench India | Intelligent Spindle Solutions',
  description: 'Get in touch with Triquench India Pvt. Ltd. in Ahmedabad for CNC Spindle Motors and automation solutions. Call +91 9601111615 or email info@triquenchindia.com.',
  alternates: {
    canonical: 'https://www.triquenchindia.com/contact',
  },
  openGraph: {
    title: 'Contact Triquench India',
    description: 'We provide Intelligent Spindle Solutions. Visit us in Ahmedabad or contact us for inquiries.',
    url: 'https://www.triquenchindia.com/contact',
    siteName: 'Triquench India',
    images: [
      {
        url: 'https://res.cloudinary.com/dd1na5drh/image/upload/v1734679455/IMG_2980_pdvjfa.png',
        width: 1200,
        height: 630,
        alt: 'Triquench India Contact Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ContactUs() {

  return (
    <ContactUsInfo/>
  );
}