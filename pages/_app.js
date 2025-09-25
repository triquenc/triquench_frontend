import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import "@/styles/_globals.scss";
import SpindleMotorSEO from './components/SpindleMotorSEO';


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
      <Component {...pageProps} />
    <div className="App">
      <SpindleMotorSEO />
    </div>

    </>
  );
}
