<<<<<<< HEAD
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
=======
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
>>>>>>> origin/new-feature
};

export default SpindleMotorSEO;
