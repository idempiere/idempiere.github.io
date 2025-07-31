// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// https://github.com/facebook/docusaurus/pull/9316
import {themes as prismThemes} from 'prism-react-renderer';
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'iDempiere Open Source ERP',
  tagline: 'Community Powered Documentation',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://idempiere.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'idempiere', // Usually your GitHub org/user name.
  projectName: 'idempiere.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    require.resolve('docusaurus-lunr-search'),
    [
      '@docusaurus/plugin-pwa',
      {
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#0c5f91',
          },
        ],
      },
    ],
],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/idempiere/idempiere.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/idempiere-social-card.jpg',
      navbar: {
        title: 'iDempiere',
        logo: {
          alt: 'iDempiere Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          // Right
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/idempiere/idempiere',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Basic Installation Guide',
                to: '/docs/introduction',
              },
              {
                label: 'Basic Functional Guide',
                to: '/docs/introduction',
              },
              {
                label: 'Basic Developer Guide',
                to: '/docs/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Google Groups',
                href: 'https://groups.google.com/g/idempiere',
              },
              {
                label: 'Mattermost',
                href: 'https://mattermost.idempiere.org/',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/groups/idempiere/',
              },
              {
                label: 'Twitter',
                href: 'http://www.twitter.com/idempiere',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCRdFTCB3yc_ni8EBXyhVqfQ',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/groups/5146317/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/idempiere/idempiere',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} iDempiere<br/>Illustrations by <a href="https://storyset.com">Storyset</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
