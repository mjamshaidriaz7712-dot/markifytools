// FIX: Import React to use the React.ReactNode type.
import React from 'react';

export interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export interface BlogPost {
  imageUrl: string;
  title: string;
  excerpt: string;
  link: string;
}

export interface NavLink {
  name: string;
  path: string;
}
