// src/components/SeoTags.js
import React from 'react';
import { Helmet } from 'react-helmet';


<SeoTags
  title="ISO30 9kW CNC Spindle Motor – TriQuench"
  description="Powerful ISO30 9kW CNC spindle motor for high-speed and precision routing. Ideal for wood, plastic, and aluminum CNC machines."
  keywords="ISO30 spindle, 9kW spindle motor, CNC wood router motor, high speed spindle, aluminum cutting motor"
/>


const DEFAULT_KEYWORDS = [
  "CNC spindle motor",
  "high performance spindle",
  "TriQuench India",
  "CNC router motor",
  "precision spindle",
  "industrial motor",
  "High speed CNC spindle motor for wood router",
  "Best CNC spindle motor for woodworking routers",
  "Affordable CNC spindle motor for wood cutting machine",
  "Water cooled CNC spindle motor for wood router",
  "Heavy duty CNC spindle motor for wood carving router",
  "High torque CNC spindle motor for metal lathe",
  "Precision CNC spindle motor for metal turning lathe",
  "Water cooled CNC spindle motor for heavy metal lathe",
  "Best CNC spindle motor for metal cutting applications",
  "Industrial CNC spindle motor for metal lathe machine",
  ""
];

const SeoTags = ({ title, description, keywords = '' }) => {
  const allKeywords = [...DEFAULT_KEYWORDS, ...keywords.split(',').map(k => k.trim())].join(', ');
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
    </Helmet>
  );
};

export default SeoTags;
