import React, { useState } from 'react';
import styles from './styles.module.css';

export default function WorkshopResources({ 
  title = "Additional Resources",
  categories = {
    "Documentation": [
      {
        title: "n8n Documentation",
        url: "https://docs.n8n.io/",
        description: "Complete n8n reference and tutorials",
        icon: "📚"
      },
      {
        title: "MongoDB Atlas Vector Search",
        url: "https://www.mongodb.com/docs/atlas/atlas-vector-search/",
        description: "Official vector search documentation",
        icon: "🔍"
      },
      {
        title: "Voyage AI API Reference",
        url: "https://docs.voyageai.com/",
        description: "Multimodal embedding API documentation",
        icon: "🚢"
      }
    ],
    "Community & Support": [
      {
        title: "n8n Community Forum",
        url: "https://community.n8n.io/",
        description: "Get help and share workflows",
        icon: "💬"
      },
      {
        title: "MongoDB Developer Community",
        url: "https://www.mongodb.com/community/forums/",
        description: "Connect with MongoDB developers",
        icon: "🌐"
      },
      {
        title: "Workshop GitHub Issues",
        url: "https://github.com/mongodb-developer/multimodal-pdf-agent-n8n/issues",
        description: "Report issues or ask questions",
        icon: "🐛"
      }
    ],
    "Sample Data & Templates": [
      {
        title: "Sample PDF Collection",
        url: "/static/sample-pdfs/",
        description: "Test PDFs for workshop exercises",
        icon: "📄"
      },
      {
        title: "n8n Workflow Templates",
        url: "https://n8n.io/workflows/",
        description: "Ready-made workflow templates",
        icon: "⚡"
      },
      {
        title: "Vector Search Examples",
        url: "https://github.com/mongodb-developer/vector-search-examples",
        description: "Example implementations and patterns",
        icon: "💡"
      }
    ],
    "Tools & Extensions": [
      {
        title: "MongoDB Compass",
        url: "https://www.mongodb.com/products/compass",
        description: "Visual MongoDB database browser",
        icon: "🧭"
      },
      {
        title: "n8n Desktop App",
        url: "https://n8n.io/download/",
        description: "Desktop version of n8n",
        icon: "💻"
      },
      {
        title: "Vector Database Benchmarks",
        url: "https://github.com/erikbern/ann-benchmarks",
        description: "Performance comparisons and metrics",
        icon: "📊"
      }
    ]
  }
}) {
  const [activeCategory, setActiveCategory] = useState(Object.keys(categories)[0]);

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.resourcesContainer}>
      <h3 className={styles.resourcesTitle}>{title}</h3>
      
      <div className={styles.resourcesContent}>
        <div className={styles.categoryTabs}>
          {Object.keys(categories).map(category => (
            <button
              key={category}
              className={`${styles.categoryTab} ${activeCategory === category ? styles.activeTab : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.resourcesList}>
          {categories[activeCategory]?.map((resource, index) => (
            <div key={index} className={styles.resourceCard} onClick={() => openLink(resource.url)}>
              <div className={styles.resourceHeader}>
                <span className={styles.resourceIcon}>{resource.icon}</span>
                <h4 className={styles.resourceTitle}>{resource.title}</h4>
                <span className={styles.externalIcon}>↗</span>
              </div>
              <p className={styles.resourceDescription}>{resource.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.resourcesFooter}>
        <div className={styles.quickAccess}>
          <h4>🔗 Quick Access</h4>
          <div className={styles.quickLinks}>
            <button onClick={() => openLink('https://github.com/mongodb-developer/multimodal-pdf-agent-n8n')} className={styles.quickLink}>
              📁 Workshop Repo
            </button>
            <button onClick={() => openLink('https://www.mongodb.com/try')} className={styles.quickLink}>
              ☁️ MongoDB Atlas
            </button>
            <button onClick={() => openLink('https://docs.n8n.io/')} className={styles.quickLink}>
              📖 n8n Docs
            </button>
          </div>
        </div>

        <div className={styles.downloadSection}>
          <h4>📥 Workshop Materials</h4>
          <p>Access additional workshop resources:</p>
          <div className={styles.downloadLinks}>
            <a href="/static/workshop-slides.pdf" download className={styles.downloadLink}>
              🖼️ Workshop Slides (PDF)
            </a>
            <a href="/static/sample-workflows.json" download className={styles.downloadLink}>
              ⚡ Sample n8n Workflows
            </a>
            <a href="/static/cheat-sheet.pdf" download className={styles.downloadLink}>
              📋 Quick Reference Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}