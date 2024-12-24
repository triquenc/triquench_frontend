import { useEffect } from "react";
import "@/styles/_globals.scss";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load the Google Tag Manager script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-5JNDGE6QPH";
    document.head.appendChild(script);

    // Configure the GTM tag
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5JNDGE6QPH');
    `;
    document.head.appendChild(script2);
  }, []);

  return <Component {...pageProps} />;
}
