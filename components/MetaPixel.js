// components/MetaPixel.js
import { useEffect } from 'react';

const MetaPixel = () => {
  useEffect(() => {
    // Facebook Pixel code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '1052806880146400');
    window.fbq('track', 'PageView');
  }, []);

  return (
    <noscript>
      <img height="1" width="1" style={{display:'none'}}
      src="https://www.facebook.com/tr?id=1052806880146400&ev=PageView&noscript=1"
      />
    </noscript>
  );
};

export default MetaPixel;