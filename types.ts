import React from 'react';

export interface Tool {
  title: string;
  description: string;
  link: string;
  // Fix: Specify that the icon can receive a className prop to allow styling with React.cloneElement.
  icon: React.ReactElement<{ className?: string }>;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: React.ReactElement;
}