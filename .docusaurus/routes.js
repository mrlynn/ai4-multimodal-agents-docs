import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug', 'd0b'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug/config',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug/config', '117'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug/content',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug/content', 'c4f'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug/globalData',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug/globalData', '941'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug/metadata',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug/metadata', '814'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug/registry',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug/registry', 'ac4'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/__docusaurus/debug/routes',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/__docusaurus/debug/routes', '904'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/helloWorld',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/helloWorld', '194'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/docs',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/docs', 'f93'),
    routes: [
      {
        path: '/multimodal-pdf-agent-n8n/docs',
        component: ComponentCreator('/multimodal-pdf-agent-n8n/docs', 'f3b'),
        routes: [
          {
            path: '/multimodal-pdf-agent-n8n/docs',
            component: ComponentCreator('/multimodal-pdf-agent-n8n/docs', '607'),
            routes: [
              {
                path: '/multimodal-pdf-agent-n8n/docs',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs', '248'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/agent-patterns',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/agent-patterns', 'abb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/ai-agent-workflow',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/ai-agent-workflow', '2b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/api-architecture',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/api-architecture', '928'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/api-gateway-status',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/api-gateway-status', '3c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/approach-comparison',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/approach-comparison', '55c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/architecture-overview',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/architecture-overview', 'e95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/codebase',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/codebase', '522'),
                exact: true
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/community-resources',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/community-resources', '96d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/complete-multimodal-agent',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/complete-multimodal-agent', '4c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/docker-troubleshooting',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/docker-troubleshooting', 'e8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/enhanced-text-context-3',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/enhanced-text-context-3', '083'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/exercise-advanced-tools',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/exercise-advanced-tools', '52f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/exercise-memory-context',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/exercise-memory-context', 'd02'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/exercise-pdf-rag-agent',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/exercise-pdf-rag-agent', '4b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/github-codespaces',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/github-codespaces', 'b20'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/intro',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/intro', '2d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/local-setup-tips',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/local-setup-tips', '7a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/memory-context-patterns',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/memory-context-patterns', 'a9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/mongodb-atlas-setup',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/mongodb-atlas-setup', 'baf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/mongodb-vector-setup',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/mongodb-vector-setup', 'd7a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/multimodal-image-queries',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/multimodal-image-queries', '0d5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/n8n-first-run',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/n8n-first-run', '529'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/pdf-processing-workflow',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/pdf-processing-workflow', '808'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/prerequisites',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/prerequisites', '88c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/python-mongodb-approaches',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/python-mongodb-approaches', '391'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/status-badge-usage-guide',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/status-badge-usage-guide', 'e78'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/status-monitoring',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/status-monitoring', 'dca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/summary',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/summary', '6fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/tool-definition-primer',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/tool-definition-primer', '3b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/upload-interface',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/upload-interface', '8ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/vector-search-workflow',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/vector-search-workflow', '5e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/voyage-ai-setup',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/voyage-ai-setup', '77a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/workflow-guide-getting-started',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/workflow-guide-getting-started', '3ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/workflow-guide-hybrid-agent',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/workflow-guide-hybrid-agent', 'e2b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/workflow-integration-guide',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/workflow-integration-guide', '099'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/workflow-reference',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/workflow-reference', 'f6e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/docs/workflows-library',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/docs/workflows-library', '7cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/multimodal-pdf-agent-n8n/',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/', '7a9'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
