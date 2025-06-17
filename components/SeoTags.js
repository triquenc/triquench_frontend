// components/SeoTags.js

import Head from 'next/head';

const SeoTags = ({ title, description, keywords }) => (
  <Head>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
  </Head>
);

export default SeoTags;
