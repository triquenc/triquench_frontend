<<<<<<< HEAD
// src/components/SeoTags.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SeoTags = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
  </Helmet>
=======
// components/SeoTags.js

import Head from 'next/head';

const SeoTags = ({ title, description, keywords }) => (
  <Head>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
  </Head>
>>>>>>> origin/new-feature
);

export default SeoTags;
