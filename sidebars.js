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
  // Workshop sidebar with clean structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '🎓 Workshop Home'
    },
    {
      type: 'doc',
      id: 'workshop-overview',
      label: '📋 Complete Overview & Slides'
    },
    {
      type: 'doc',
      id: 'objectives-overview',
      label: '🎯 Workshop Objectives'
    },
    {
      type: 'category',
      label: '📋 Prerequisites & Setup',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'prerequisites',
          label: '🛠️ Setup Wizard'
        },
        {
          type: 'doc',
          id: 'voyage-ai-setup',
          label: '🚀 Voyage AI Setup'
        },
        {
          type: 'doc',
          id: 'gemini-setup',
          label: '🤖 Gemini Setup'
        },
        {
          type: 'doc',
          id: 'atlas-setup',
          label: '🍃 Atlas Setup'
        }
      ]
    },
    {
      type: 'category',
      label: '🐍 Python & Jupyter Exercises',
      collapsible: true,
      collapsed: false,
      className: 'sidebar-path-python',
      description: 'Build multimodal AI agents with Python',
      items: [
        {
          type: 'doc',
          id: 'python-exercise-1',
          label: '📊 Exercise 1 - Setup & Data'
        },
        {
          type: 'doc',
          id: 'python-exercise-2',
          label: '🔍 Exercise 2 - Vector Search'
        },
        {
          type: 'doc',
          id: 'python-exercise-3',
          label: '🤖 Exercise 3 - ReAct Agent'
        },
        {
          type: 'doc',
          id: 'python-exercise-4',
          label: '🧪 Exercise 4 - Testing'
        },
        {
          type: 'doc',
          id: 'complete-notebook',
          label: '📓 Complete Notebook'
        },
        {
          type: 'doc',
          id: 'workshop-lab-walkthrough',
          label: '🐍 Python Lab Walkthrough'
        }
      ]
    }
  ],
};

module.exports = sidebars;