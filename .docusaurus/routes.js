import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/helloWorld',
    component: ComponentCreator('/helloWorld', '3a9'),
    exact: true
  },
  {
    path: '/slides',
    component: ComponentCreator('/slides', '983'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '07d'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '3b4'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '41a'),
            routes: [
              {
                path: '/docs',
                component: ComponentCreator('/docs', '9b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/agent-patterns',
                component: ComponentCreator('/docs/agent-patterns', 'a2b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-agent-workflow',
                component: ComponentCreator('/docs/ai-agent-workflow', '48d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api-architecture',
                component: ComponentCreator('/docs/api-architecture', '30d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api-gateway-status',
                component: ComponentCreator('/docs/api-gateway-status', 'd94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/approach-comparison',
                component: ComponentCreator('/docs/approach-comparison', 'fc4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture-overview',
                component: ComponentCreator('/docs/architecture-overview', '827'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/codebase',
                component: ComponentCreator('/docs/codebase', 'b75'),
                exact: true
              },
              {
                path: '/docs/community-resources',
                component: ComponentCreator('/docs/community-resources', 'b3c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/complete-multimodal-agent',
                component: ComponentCreator('/docs/complete-multimodal-agent', 'f6d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/content-organization-guide',
                component: ComponentCreator('/docs/content-organization-guide', 'b6f'),
                exact: true
              },
              {
                path: '/docs/cost-optimization',
                component: ComponentCreator('/docs/cost-optimization', 'e5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-troubleshooting',
                component: ComponentCreator('/docs/docker-troubleshooting', 'e9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/enhanced-text-context-3',
                component: ComponentCreator('/docs/enhanced-text-context-3', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/exercise-advanced-tools',
                component: ComponentCreator('/docs/exercise-advanced-tools', 'e7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/exercise-memory-context',
                component: ComponentCreator('/docs/exercise-memory-context', '706'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/exercise-pdf-rag-agent',
                component: ComponentCreator('/docs/exercise-pdf-rag-agent', '062'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/github-codespaces',
                component: ComponentCreator('/docs/github-codespaces', 'c06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '00d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/local-setup-tips',
                component: ComponentCreator('/docs/local-setup-tips', '605'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/memory-context-patterns',
                component: ComponentCreator('/docs/memory-context-patterns', '307'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mongodb-atlas-setup',
                component: ComponentCreator('/docs/mongodb-atlas-setup', '345'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mongodb-vector-setup',
                component: ComponentCreator('/docs/mongodb-vector-setup', '243'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/monitoring-observability',
                component: ComponentCreator('/docs/monitoring-observability', 'f8c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/multimodal-image-queries',
                component: ComponentCreator('/docs/multimodal-image-queries', '982'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/n8n-first-run',
                component: ComponentCreator('/docs/n8n-first-run', '6a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/path-a-n8n-overview',
                component: ComponentCreator('/docs/path-a-n8n-overview', '831'),
                exact: true
              },
              {
                path: '/docs/path-b-python-overview',
                component: ComponentCreator('/docs/path-b-python-overview', '740'),
                exact: true
              },
              {
                path: '/docs/path-selection',
                component: ComponentCreator('/docs/path-selection', 'c9b'),
                exact: true
              },
              {
                path: '/docs/pdf-processing-workflow',
                component: ComponentCreator('/docs/pdf-processing-workflow', '1e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/prerequisites',
                component: ComponentCreator('/docs/prerequisites', '81c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/production-security',
                component: ComponentCreator('/docs/production-security', '9b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/python-mongodb-approaches',
                component: ComponentCreator('/docs/python-mongodb-approaches', '72a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/slide-viewer-demo',
                component: ComponentCreator('/docs/slide-viewer-demo', '525'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/status-badge-usage-guide',
                component: ComponentCreator('/docs/status-badge-usage-guide', 'f43'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/status-monitoring',
                component: ComponentCreator('/docs/status-monitoring', '09d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/summary',
                component: ComponentCreator('/docs/summary', '8ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tool-definition-primer',
                component: ComponentCreator('/docs/tool-definition-primer', '8e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/troubleshooting-guide',
                component: ComponentCreator('/docs/troubleshooting-guide', '149'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/upload-interface',
                component: ComponentCreator('/docs/upload-interface', '017'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vector-search-workflow',
                component: ComponentCreator('/docs/vector-search-workflow', '2ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/voyage-ai-setup',
                component: ComponentCreator('/docs/voyage-ai-setup', 'e62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/workflow-guide-getting-started',
                component: ComponentCreator('/docs/workflow-guide-getting-started', 'a95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/workflow-guide-hybrid-agent',
                component: ComponentCreator('/docs/workflow-guide-hybrid-agent', '590'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/workflow-integration-guide',
                component: ComponentCreator('/docs/workflow-integration-guide', '889'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/workflow-reference',
                component: ComponentCreator('/docs/workflow-reference', '10a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/workflows-library',
                component: ComponentCreator('/docs/workflows-library', '922'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/workshop-alignment-assessment',
                component: ComponentCreator('/docs/workshop-alignment-assessment', '9ba'),
                exact: true
              },
              {
                path: '/docs/workshop-overview',
                component: ComponentCreator('/docs/workshop-overview', '2df'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
