import React from 'react';
import {
    HeadlineIcon, UTMLinkIcon, SEOMetaIcon, EngagementIcon, EmailIcon, RoiIcon, KeywordIcon,
    LightbulbIcon, HashtagIcon, BacklinkIcon, PaletteIcon, WordCountIcon, PersonaIcon, CalendarIcon,
    TwitterIcon, LinkedinIcon, YoutubeIcon
} from './components/icons';
import { Tool } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  legalLinks: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ],
  socialLinks: [
    { name: 'Twitter', path: 'https://twitter.com', icon: <TwitterIcon /> },
    { name: 'LinkedIn', path: 'https://linkedin.com', icon: <LinkedinIcon /> },
    { name: 'YouTube', path: 'https://youtube.com', icon: <YoutubeIcon /> },
  ],
};

export const TOOLS_DATA: Tool[] = [
    {
        title: 'Headline Analyzer',
        description: 'Get feedback on your headlines to improve click-through rates and engagement.',
        link: '/tools/headline-analyzer',
        icon: <HeadlineIcon />,
    },
    {
        title: 'UTM Link Builder',
        description: 'Easily create campaign URLs with UTM parameters for better tracking in analytics.',
        link: '/tools/utm-builder',
        icon: <UTMLinkIcon />,
    },
    {
        title: 'SEO Meta Preview',
        description: 'See how your title tag and meta description will appear in Google search results.',
        link: '/tools/seo-meta-preview',
        icon: <SEOMetaIcon />,
    },
    {
        title: 'Social Engagement Calculator',
        description: 'Calculate the engagement rate of your social media posts and profiles.',
        link: '/tools/engagement-calculator',
        icon: <EngagementIcon />,
    },
    {
        title: 'Email Subject Line Tester',
        description: 'Test your email subject lines to increase open rates and avoid spam filters.',
        link: '/tools/subject-tester',
        icon: <EmailIcon />,
    },
    {
        title: 'ROI Calculator',
        description: 'Calculate the return on investment of your marketing campaigns.',
        link: '/tools/roi-calculator',
        icon: <RoiIcon />,
    },
    {
        title: 'Keyword Density Analyzer',
        description: 'Check the keyword density of a webpage to optimize for SEO.',
        link: '/tools/keyword-density-analyzer',
        icon: <KeywordIcon />,
    },
    {
        title: 'Blog Title Generator',
        description: 'Generate catchy and SEO-friendly blog post titles based on your keyword.',
        link: '/tools/blog-title-generator',
        icon: <LightbulbIcon />,
    },
    {
        title: 'Hashtag Generator',
        description: 'Find relevant and trending hashtags for your social media posts.',
        link: '/tools/hashtag-generator',
        icon: <HashtagIcon />,
    },
    {
        title: 'Backlink Checker',
        description: 'Discover who is linking to your website (or your competitors\').',
        link: '/tools/backlink-checker',
        icon: <BacklinkIcon />,
    },
    {
        title: 'Color Palette Generator',
        description: 'Create beautiful color schemes from an image or a keyword.',
        link: '/tools/color-palette-generator',
        icon: <PaletteIcon />,
    },
    {
        title: 'Word Counter',
        description: 'Quickly count words, characters, and paragraphs in your text.',
        link: '/tools/word-counter',
        icon: <WordCountIcon />,
    },
    {
        title: 'Persona Generator',
        description: 'Create detailed marketing personas to better understand your target audience.',
        link: '/tools/persona-generator',
        icon: <PersonaIcon />,
    },
    {
        title: 'Content Idea Generator',
        description: 'Never run out of content ideas. Get suggestions based on your topic.',
        link: '/tools/content-idea-generator',
        icon: <LightbulbIcon />,
    },
    {
        title: 'Best Posting Time Finder',
        description: 'Analyze your audience to find the optimal times to post on social media.',
        link: '/tools/best-posting-time-finder',
        icon: <CalendarIcon />,
    },
];

export const BLOG_POSTS = [
  {
    title: 'The Ultimate Guide to SEO in 2024',
    excerpt: 'Learn the latest strategies to rank higher on Google and drive organic traffic to your website.',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    link: '/blog/seo-guide',
  },
  {
    title: '10 Content Marketing Trends to Watch',
    excerpt: 'Stay ahead of the curve with these emerging trends in content creation and distribution.',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    link: '/blog/content-trends',
  },
  {
    title: 'How to Master Social Media Engagement',
    excerpt: 'Boost your likes, comments, and shares with these proven tactics for social media.',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    link: '/blog/social-engagement',
  },
];

export const PRIVACY_POLICY = `Last updated: ${new Date().toLocaleDateString()}
Your privacy is important to us. It is Markify Tools' policy to respect your privacy regarding any information we may collect from you across our website.
We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
Your continued use of our website will be regarded as acceptance of our practices around