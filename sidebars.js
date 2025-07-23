/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Workshop sidebar with organized sections
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '🎓 Workshop Overview'
    },
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsible: false,
      collapsed: false,
      className: 'sidebar-getting-started',
      description: 'Begin your journey with environment setup and n8n basics',
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: 'Workshop Introduction'
        },
        {
          type: 'doc',
          id: 'github-codespaces',
          label: 'GitHub Codespaces Setup'
        },
        {
          type: 'doc',
          id: 'prerequisites',
          label: 'Prerequisites & Local Setup'
        },
        {
          type: 'doc',
          id: 'n8n-first-run',
          label: 'n8n First Run Experience'
        }
      ],
    },
    {
      type: 'category',
      label: '⚙️ Setup & Configuration',
      collapsible: true,
      collapsed: false,
      className: 'sidebar-setup',
      description: 'Configure MongoDB Atlas and Voyage AI for your agent',
      items: [
        {
          type: 'doc',
          id: 'mongodb-atlas-setup',
          label: 'MongoDB Atlas Setup'
        },
        {
          type: 'doc',
          id: 'voyage-ai-setup',
          label: 'Voyage AI Configuration'
        }
      ],
    },
    {
      type: 'category',
      label: '🔧 Building Workflows',
      collapsible: true,
      collapsed: false,
      className: 'sidebar-workflows',
      description: 'Create powerful automation workflows step by step',
      items: [
        {
          type: 'doc',
          id: 'pdf-processing-workflow',
          label: 'PDF Processing Workflow'
        },
        {
          type: 'doc',
          id: 'vector-search-workflow',
          label: 'Vector Search Implementation'
        },
        {
          type: 'doc',
          id: 'ai-agent-workflow',
          label: 'AI Agent with Tool Calling'
        }
      ],
    },
    {
      type: 'category',
      label: '🎯 Advanced Topics',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-advanced',
      description: 'Take your agent to production with advanced features',
      items: [
        {
          type: 'doc',
          id: 'complete-multimodal-agent',
          label: 'Complete Multimodal Agent'
        },
        {
          type: 'doc',
          id: 'mongodb-vector-setup',
          label: 'Production Vector Search'
        },
        {
          type: 'doc',
          id: 'upload-interface',
          label: 'Web Upload Interface'
        }
      ],
    },
    {
      type: 'category',
      label: '📚 Resources & Support',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-resources',
      description: 'Additional resources, troubleshooting, and community',
      items: [
        {
          type: 'doc',
          id: 'local-setup-tips',
          label: 'Docker Best Practices'
        },
        {
          type: 'doc',
          id: 'docker-troubleshooting',
          label: 'Troubleshooting Guide'
        },
        {
          type: 'doc',
          id: 'community-resources',
          label: 'Community Resources'
        },
        {
          type: 'doc',
          id: 'summary',
          label: '🎉 Workshop Summary'
        }
      ],
    },
  ],
};

module.exports = sidebars;
