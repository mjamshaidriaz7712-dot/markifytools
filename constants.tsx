import React from 'react';
import type { Tool, BlogPost, NavLink } from './types';
import { 
    HeadlineIcon, UTMLinkIcon, EngagementIcon, EmailIcon, SEOMetaIcon, LightbulbIcon, TwitterIcon, 
    LinkedinIcon, YoutubeIcon, RoiIcon, KeywordIcon, HashtagIcon, BacklinkIcon, PaletteIcon, 
    WordCountIcon, PersonaIcon, CalendarIcon 
} from './components/icons';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const TOOLS_DATA: Tool[] = [
  {
    icon: <HeadlineIcon />,
    title: 'Headline Analyzer',
    description: 'Write attention-grabbing titles for higher engagement.',
    link: '/tools/headline-analyzer',
  },
  {
    icon: <UTMLinkIcon />,
    title: 'UTM Link Builder',
    description: 'Create trackable campaign links instantly for analytics.',
    link: '/tools/utm-builder',
  },
  {
    icon: <SEOMetaIcon />,
    title: 'SEO Meta Preview',
    description: 'See how your website title & description look in Google.',
    link: '/tools/seo-meta-preview',
  },
  {
    icon: <EngagementIcon />,
    title: 'Social Engagement Calculator',
    description: 'Measure post performance and engagement rate like a pro.',
    link: '/tools/engagement-calculator',
  },
  {
    icon: <EmailIcon />,
    title: 'Email Subject Tester',
    description: 'Boost open rates with better, less spammy subject lines.',
    link: '/tools/subject-tester',
  },
  {
    icon: <RoiIcon />,
    title: 'ROI & Ad Spend Calculator',
    description: 'Compute ROI and cost per acquisition for your campaigns.',
    link: '/tools/roi-calculator',
  },
  {
    icon: <KeywordIcon />,
    title: 'Keyword Density Analyzer',
    description: 'Shows keyword frequency and density from pasted text.',
    link: '/tools/keyword-density-analyzer',
  },
  {
    icon: <LightbulbIcon />,
    title: 'Blog Title Generator',
    description: 'Suggests catchy blog or video titles from a given keyword.',
    link: '/tools/blog-title-generator',
  },
  {
    icon: <HashtagIcon />,
    title: 'Instagram Hashtag Generator',
    description: 'Creates relevant hashtags based on your topic or keyword.',
    link: '/tools/hashtag-generator',
  },
  {
    icon: <BacklinkIcon />,
    title: 'Backlink Checker (Demo)',
    description: 'See basic backlink stats for any domain (demonstration).',
    link: '/tools/backlink-checker',
  },
  {
    icon: <PaletteIcon />,
    title: 'Color Palette Generator',
    description: 'Generate brand color combinations for posts and ads.',
    link: '/tools/color-palette-generator',
  },
  {
    icon: <WordCountIcon />,
    title: 'Word Counter & Readability',
    description: 'Counts words and checks readability score of your text.',
    link: '/tools/word-counter',
  },
  {
    icon: <PersonaIcon />,
    title: 'Marketing Persona Generator',
    description: 'Generates a persona profile based on audience info.',
    link: '/tools/persona-generator',
  },
    {
    icon: <LightbulbIcon />,
    title: 'Content Idea Generator',
    description: 'Get endless blog or social media post ideas by keyword.',
    link: '/tools/content-idea-generator',
  },
  {
    icon: <CalendarIcon />,
    title: 'Best Posting Time Finder',
    description: 'Recommends ideal posting times for each platform.',
    link: '/tools/best-posting-time-finder',
  },
];


export const BLOG_POSTS: BlogPost[] = [
    {
        imageUrl: 'https://picsum.photos/400/250?random=1',
        title: 'Top 10 Free Tools Every Digital Marketer Needs in 2025',
        excerpt: 'Discover the essential free tools that can supercharge your marketing efforts without breaking the bank.',
        link: '/blog/top-10-free-tools'
    },
    {
        imageUrl: 'https://picsum.photos/400/250?random=2',
        title: 'How to Write Click-Worthy Headlines',
        excerpt: 'Learn the secrets behind crafting headlines that grab attention and drive clicks using our Headline Analyzer.',
        link: '/blog/writing-headlines'
    },
    {
        imageUrl: 'https://picsum.photos/400/250?random=3',
        title: 'What Are UTM Links and Why They Matter',
        excerpt: 'A deep dive into UTM parameters and how they provide critical insights into your campaign performance.',
        link: '/blog/what-are-utm-links'
    }
];

export const FOOTER_LINKS = {
    quickLinks: [
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ],
    legalLinks: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Disclaimer', path: '/disclaimer' },
    ],
    socialLinks: [
        { name: 'Twitter', icon: <TwitterIcon />, path: 'https://twitter.com' },
        { name: 'LinkedIn', icon: <LinkedinIcon />, path: 'https://linkedin.com' },
        { name: 'YouTube', icon: <YoutubeIcon />, path: 'https://youtube.com' },
    ],
};

export const PRIVACY_POLICY = `Your privacy is important to us. It is Markify Tools' policy to respect your privacy regarding any information we may collect from you across our website...`;
export const TERMS_OF_SERVICE = `By accessing the website at Markify Tools, you are agreeing to be bound by these terms of service, all applicable laws and regulations...`;
export const DISCLAIMER = `The materials on Markify Tools' website are provided on an 'as is' basis. Markify Tools makes no warranties, expressed or implied...`;