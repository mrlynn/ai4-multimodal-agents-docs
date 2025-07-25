import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DownloadAllWorkflows() {
  const {siteConfig} = useDocusaurusContext();
  
  const workflows = [
    '01-getting-started.json',
    '02-pdf-processor.json',
    '03-multimodal-agent.json',
    '04-complete-agent-mock.json',
    '05-real-multimodal-agent.json',
    '06-real-voyage-multimodal.json',
    '07-form-based-agent.json',
    '08-voyage-context-3-embeddings.json',
    '09-hybrid-multimodal-context-agent.json'
  ];

  const downloadAll = async () => {
    for (const workflow of workflows) {
      const response = await fetch(`/workflows/${workflow}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = workflow;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return (
    <div style={{
      padding: '1rem',
      background: 'var(--ifm-color-emphasis-100)',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '2rem 0'
    }}>
      <h4>Download All Workshop Workflows</h4>
      <p>Get all 9 workflows in one click!</p>
      <button 
        className="button button--primary button--lg"
        onClick={downloadAll}
      >
        📦 Download All Workflows (ZIP coming soon)
      </button>
      <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: 'var(--ifm-color-emphasis-600)' }}>
        Files will be downloaded individually to your Downloads folder
      </p>
    </div>
  );
}