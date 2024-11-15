import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="site-footer">
             <Image src="/images/footerbg.png" width={2160} height={443} alt="footerBG" className='bg-img'/>
            <div className="container">
                <div className="footer-top">
                    <div className="logo-wrapper">
                        <div className="logo-block">
                            <a href="/">
                                <Image src="/images/site-logo.svg" width={64} height={56} alt="Triqunch" />
                            </a>
                        </div>
                        <div className="social-media-wrapper">
                            <span className="title">
                                Follow Us
                            </span>
                            <ul className='d-flex'>
                                <li>
                                    <a href="" title="facebook">
                                        <Image src="/images/facebook.svg" width={14} height={14} alt="Facebook Icon" />
                                    </a>
                                </li>
                                <li>
                                    <a href="" title="Instagram">
                                        <Image src="/images/insta.svg" width={14} height={14} alt="Instagram Icon" />
                                    </a>
                                </li>
                                <li>
                                    <a href="" title="Youtube">
                                        <Image src="/images/youtube.svg" width={15} height={11} alt="youtube Icon" />
                                    </a>
                                </li>
                                <li>
                                    <a href="" title="X">
                                        <Image width={12} height={12} src="/images/x-logo.svg" alt="X Icon" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="links-wrapper">
                        <div className="link-inner">
                            <div className="links-inner-wrapper">
                                <span className="footer-title">
                                Categories
                                </span>
                                <ul>
                                    <li>
                                        <a href="" title="Spindle Motor ATC">Spindle Motor ATC</a>
                                    </li>
                                    <li>
                                        <a href="" title="Spindle Motor MTC">Spindle Motor MTC</a>
                                    </li>
                                    <li>
                                        <a href="" title="VFD">VFD</a>
                                    </li>
                                    <li>
                                        <a href="" title="Spindle Bearing">Spindle Bearing</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="links-inner-wrapper">
                                <span className="footer-title">
                                Quick links
                                </span>
                                <ul>
                                    <li>
                                        <a href="/" title="Home">Home</a>
                                    </li>
                                    <li>
                                        <a href="/products" title="Categories">Categories</a>
                                    </li>
                                    <li>
                                        <a href="/contact" title="Contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="links-inner-wrapper">
                                <span className="footer-title">
                                Policy
                                </span>
                                <ul>
                                    <li>
                                        <a href="" title="Privacy policy">Privacy policy</a>
                                    </li>
                                    <li>
                                        <a href="" title="Refund policy">Refund policy</a>
                                    </li>
                                    <li>
                                        <a href="" title="Terms of service">Terms of service</a>
                                    </li>
                                    <li>
                                        <a href="" title="Contact information">Contact information</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-contact-wrapper">
                        <span className="contact-title">
                        Contact Us
                        </span>
                        <a href="mailto:support@triquench.com" title="Mail Us">support@triquench.com</a>
                        <a href="tel:+91898783678" title="Call Us">+91 89878 3678</a>
                    </div>
                </div>
                <div className="footer-bottom d-flex align-center justify-sb">
                    <div className="left">
                        © <span className="year">2024</span>, Triquench India PVT. LTD.
                    </div>
                    <div className="right">
                        <ul className="d-flex align-center">
                            <li>
                                <Image src="/images/visa.svg" width={36} height={22} alt="visa" />
                            </li>
                            <li>
                                <Image src="/images/diners.svg" width={36} height={22} alt="diners" />
                            </li>
                            <li>
                                <Image src="/images/master-card.svg" width={36} height={22} alt="mastercard" />
                            </li>
                            <li>
                                <Image src="/images/american-express.svg" width={36} height={22} alt="americanExpress" />
                            </li>
                            <li>
                                <Image src="/images/discover.svg" width={36} height={22} alt="discover" />
                            </li>
                            <li>
                                <Image src="/images/paypal.svg" width={36} height={22} alt="paypal" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}