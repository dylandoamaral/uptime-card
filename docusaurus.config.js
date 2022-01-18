// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Uptime Card',
  url: 'https://dylandoamaral.github.io/',
  baseUrl: '/uptime-card/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'dylandoamaral', // Usually your GitHub org/user name.
  projectName: 'uptime-card', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Uptime Card',
        logo: {
          alt: 'Uptime Card Logo',
          src: 'img/logo.svg',
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Home Assistant',
                href: 'https://www.home-assistant.io/',
              },
              {
                label: 'Github',
                href: 'https://github.com/dylandoamaral/uptime-card',
              }
            ],
          },
          {
            title: 'Author',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dylandoamaral',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/dylandmrl',
              },
              {
                label: 'Buy me a coffee',
                href: 'https://www.buymeacoffee.com/dylandoamaral',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dylan DO AMARAL. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
