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
    path: '/assistant',
    component: ComponentCreator('/assistant', '0c8'),
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
    path: '/upload',
    component: ComponentCreator('/upload', '536'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '9f1'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '9b9'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e8e'),
            routes: [
              {
                path: '/docs',
                component: ComponentCreator('/docs', '341'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/atlas-setup',
                component: ComponentCreator('/docs/atlas-setup', 'bfb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/codebase',
                component: ComponentCreator('/docs/codebase', 'b75'),
                exact: true
              },
              {
                path: '/docs/content-organization-guide',
                component: ComponentCreator('/docs/content-organization-guide', 'b6f'),
                exact: true
              },
              {
                path: '/docs/gemini-setup',
                component: ComponentCreator('/docs/gemini-setup', '914'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/objectives-overview',
                component: ComponentCreator('/docs/objectives-overview', 'b0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/prerequisites',
                component: ComponentCreator('/docs/prerequisites', 'c09'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/python-exercise-1',
                component: ComponentCreator('/docs/python-exercise-1', '203'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/python-exercise-2',
                component: ComponentCreator('/docs/python-exercise-2', 'cfc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/python-exercise-3',
                component: ComponentCreator('/docs/python-exercise-3', 'ed3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/python-exercise-4',
                component: ComponentCreator('/docs/python-exercise-4', 'e2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/voyage-ai-setup',
                component: ComponentCreator('/docs/voyage-ai-setup', 'fe7'),
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
                component: ComponentCreator('/docs/workshop-overview', 'de6'),
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
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
