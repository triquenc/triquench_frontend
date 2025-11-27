import Image from "next/image";
import InnerPageBanner from "../commonComponents/innerpagebanner";
import ServiceWeProvide from '@/components/commonComponents/serviceWeProvide';
import FormSection from '@/components/contactComponents/formSection';


export default function ContactUsInfo() {
  // 2. STRUCTURED DATA
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    description: 'Contact details for Triquench India Pvt. Ltd.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Triquench India Pvt. Ltd.',
      image: 'https://res.cloudinary.com/dd1na5drh/image/upload/v1734679455/IMG_2980_pdvjfa.png',
      telephone: '+919601111615',
      email: 'info@triquenchindia.com',
      url: 'https://www.triquenchindia.com/contact',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D-01, Sumel Business Park - 7, N.H.-08, Road, nr. Soni Ni Chawl Road, Rakhial',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380023',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.0206134,
        longitude: 72.6368996,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: [
        "https://www.facebook.com/triquenchindia",
        "https://www.linkedin.com/company/triquench-india"
      ]
    },
  };

  return (
    <div>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <InnerPageBanner
        title="Contact Us"
        subtitle="ENQUIRY"
        paragraph="We provide “Intelligent Spindle Solutions” and aspire to be of service to society and grow along with it."
        bannerImage="https://res.cloudinary.com/dd1na5drh/image/upload/v1734679455/IMG_2980_pdvjfa.png"
        className="contact-banner"
        buttonText="Reach Out"
        buttonUrl="tel:+919601111615"
      />
      
      <section className="contact-form-block">
        <div className="container">
          <div className="contact-form-inner">
            <div className="contact-form-left">
              <div className="contact-form-left-inner">
                <h2>Send Enquiry</h2>
                <FormSection />
              </div>
            </div>
            <div className="contact-form-right">
              <ul className="contact-info-block">
                <li>
                  <a href="mailto:info@triquenchindia.com" className="align-center">
                    <span className="icon-wrapper">
                      <Image src="/images/email-icon.svg" alt="Email Icon" width={32} height={24} />
                    </span>
                    <span className="icon-text">info@triquenchindia.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:9601111615" className="align-center">
                    <span className="icon-wrapper">
                      <Image src="/images/call-ic-white.svg" alt="Phone Icon" width={30} height={30} />
                    </span>
                    <span className="icon-text">
                      Kaushal Panchal: <br />
                      9601111615
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.google.com/maps?ll=23.020613,72.6369&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=3970970015259865852" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="align-center"
                  >
                    <span className="icon-wrapper">
                      <Image src="/images/location-icon.svg" alt="Location Icon" width={30} height={36} />
                    </span>
                    {/* Fixed: Changed span to div here to prevent hydration error with address tag */}
                    <div className="icon-text">
                      <address>
                        D-01, Sumel Business Park - 7, N.H.-08, Road, nr. Soni Ni Chawl Road, Rakhial, Ahmedabad, Gujarat 380023
                      </address>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14688.344103462823!2d72.6368996!3d23.0206134!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e865f48240435%3A0x371bb830954ab2fc!2sTriQuench%20India%20spindle%20Motor!5e0!3m2!1sen!2sin!4v1729869535430!5m2!1sen!2sin"
          width="100%"
          height="400"
          loading="lazy"
          title="Google Map location of Triquench India Pvt. Ltd. in Ahmedabad"
          style={{ border: 0 }}
        ></iframe>
      </section>

      <ServiceWeProvide />
    </div>
  );
}