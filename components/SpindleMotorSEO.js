import React from 'react';
import { useRouter } from 'next/router';
//import seoPages from '../utils/seoData';
import seoPages from '@/src/utils/seoData';
import SeoTags from './SeoTags';

const SpindleMotorSEO = () => {
  const router = useRouter();
  const path = router.pathname.split('/').pop(); // Get current slug
  const seo = seoPages.find(page => page.slug === path);

  if (!seo) return null; // Optional: fallback if no match

  return <SeoTags title={seo.title} description={seo.description} keywords={seo.keywords} />;
};

export default SpindleMotorSEO;

