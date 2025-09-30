// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
//import "@/styles/_globals.scss";
import SpindleMotorSEO from "@/components/SpindleMotorSEO"; // Use alias if configured

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("Page changed to:", url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* Global SEO Tags - optional, can be overridden per page */}
      <SpindleMotorSEO />

      {/* Main Component */}
    {/*  <Component {...pageProps} /> */} 
    </>
  );
}
