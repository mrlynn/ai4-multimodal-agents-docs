import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/multimodal-pdf-agent-n8n/es/helloWorld',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/es/helloWorld', '608'),
    exact: true
  },
  {
    path: '/multimodal-pdf-agent-n8n/es/docs',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs', '502'),
    routes: [
      {
        path: '/multimodal-pdf-agent-n8n/es/docs',
        component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs', '437'),
        routes: [
          {
            path: '/multimodal-pdf-agent-n8n/es/docs',
            component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs', '11a'),
            routes: [
              {
                path: '/multimodal-pdf-agent-n8n/es/docs',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs', '7d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/ai-agent-workflow',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/ai-agent-workflow', '08a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/community-resources',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/community-resources', '5ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/complete-multimodal-agent',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/complete-multimodal-agent', '5d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/docker-troubleshooting',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/docker-troubleshooting', 'e38'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/github-codespaces',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/github-codespaces', 'a08'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/intro',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/intro', 'fd3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/local-setup-tips',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/local-setup-tips', '281'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/mongodb-atlas-setup',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/mongodb-atlas-setup', '45b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/mongodb-vector-setup',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/mongodb-vector-setup', '151'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/n8n-first-run',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/n8n-first-run', 'f73'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/pdf-processing-workflow',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/pdf-processing-workflow', 'd48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/prerequisites',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/prerequisites', '0c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/summary',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/summary', '011'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/upload-interface',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/upload-interface', 'ef3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/vector-search-workflow',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/vector-search-workflow', '33a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/multimodal-pdf-agent-n8n/es/docs/voyage-ai-setup',
                component: ComponentCreator('/multimodal-pdf-agent-n8n/es/docs/voyage-ai-setup', 'a14'),
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
    path: '/multimodal-pdf-agent-n8n/es/',
    component: ComponentCreator('/multimodal-pdf-agent-n8n/es/', '738'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
