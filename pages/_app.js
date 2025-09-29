// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import SpindleMotorSEO from "../components/SpindleMotorSEO";
import "@/styles/_globals.scss";


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
      {/* SEO Tags Component */} 
      <SpindleMotorSEO /> 
      {/* new Page Component */}

      {/* Main Page Component */}
      <Component {...pageProps} />
    <div className="App">
      <SpindleMotorSEO />
    </div>

    </>
  );
}
