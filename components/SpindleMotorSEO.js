// components/SpindleMotorSEO.js
import React from 'react';
import { useRouter } from 'next/router';
import SeoTags from './SeoTags';
import seoPages from '../src/utils/seoData';


const SpindleMotorSEO = () => {
  const router = useRouter();
  const path = router.pathname === '/' ? '' : router.pathname.split('/').pop();

  const seo = seoPages.find(page => page.slug === path);

  if (!seo) return null;

  return (
    <SeoTags
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
    />
  );
};

export default SpindleMotorSEO;
