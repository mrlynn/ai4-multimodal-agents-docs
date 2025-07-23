// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// Change here to customise config

// Name of the Github Repo, it's also teh baseUrl
const workshopName = 'multimodal-pdf-agent-n8n';
// Change this if hosting outside mongodb-developer
const organizationName = "mongodb-developer";

// Main page config
const title = "Build a Multimodal PDF Agent with n8n";
const tagLine = "Process, encode, and search PDFs using MongoDB Vector Search, Voyage AI, and n8n automation";
const startButtonTitle = "Start Building";
const favicon = "img/favicon.svg"

// Main Page Features
const featureList = [
  {
    title: 'Visual Workflow Building',
    illustration: 'img/n8n-workflow.png',
    description: `
        Build complex AI agents using n8n's visual interface - no coding required!
    `,
  },
  {
    title: 'Multimodal Processing',
    illustration: 'img/multimodal.png',
    description: `
        Process both text and images from PDFs using Voyage AI's multimodal embeddings.
    `,
  },
  {
    title: 'Production-Ready',
    illustration: 'img/mongodb-atlas.png',
    description: `
        Deploy scalable vector search with MongoDB Atlas and n8n's robust automation.
    `,
  },
];

// UTM stuff

const utmAdvocateName = `michael.lynn`;
const utmWorkshopName = 'multimodal_pdf_agent_n8n'

const utmParams = `utm_campaign=devrel&utm_source=workshop&utm_medium=cta&utm_content=${utmWorkshopName}&utm_term=${utmAdvocateName}`;

// Footer links (probably no need to change them)

const footerLinks = [
  {
    label: "Try MongoDB Atlas",
    href: `https://www.mongodb.com/try?${utmParams}`,
  },
  {
    label: "Forums",
    href: `https://www.mongodb.com/community/forums?${utmParams}`,
  },
  {
    label: "Developer Center",
    href: `https://www.mongodb.com/developer?${utmParams}`,
  },
  {
    label: "MongoDB University",
    href: `https://learn.mongodb.com?${utmParams}`,
  },
  {
    href: `https://github.com/${organizationName}/${workshopName}`,
    label: "This lab in GitHub",
  },
];

///////////////////////////////////////////////////////////////////////////////
// DON'T CHANGE ANYTHING BELOW UNLESS YOU KNOW WHAT YOU'RE DOING             //
///////////////////////////////////////////////////////////////////////////////

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${title}`,
  tagline: `${tagLine}`,
  url: process.env.CODESPACES ? `https://${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${workshopName}.github.io`,
  baseUrl: process.env.CODESPACES || process.env.VERCEL_URL ? `/` : `/${workshopName}/`,
  projectName: `${organizationName}.github.io`,
  organizationName: `${organizationName}`,
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: `${favicon}`,
  deploymentBranch: "gh-pages",
  staticDirectories: ["static"],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  customFields: {
    startButtonTitle: `${startButtonTitle}`,
    featureList: featureList,
    utmParams,
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: `https://github.com/${organizationName}/${workshopName}/blob/main`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-ZJ28V71VTQ",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve("docusaurus-lunr-search"),
      {
        languages: ["es", "en"], // language codes
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      announcementBar: {
        id: "feedback_form",
        content:
          'This is a demonstration that we can put a pop-up message here! Even <a target="_blank" rel="noopener noreferrer" href="#">links</a>',
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: true,
      },
      navbar: {
        title: `${title}`,
        logo: {
          alt: "MongoDB Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
          className: "navbar-logo",
          width: "135px",
          height: "100%",
        },
        items: [
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: footerLinks,
        copyright: `© ${new Date().getFullYear()} MongoDB, Inc.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["powershell", "swift", "kotlin"],
      },
      mermaid: {
        theme: { light: "neutral", dark: "forest" },
      },
    }),
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
    },
    // Enable faster build options for Vercel deployment
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
    },
    experimental_storage: {
      type: "localStorage",
      namespace: true,
    },
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;
