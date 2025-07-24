import React from 'react';
import LiveStatusBadge from './index.js';

/**
 * Specialized status badge for Docker services validation
 * Used after attendees run `npm run dev` or `docker-compose up`
 */
export default function DockerServicesStatusBadge({ 
  showDetails = true,
  refreshInterval = 10000 // Frequent checks during service startup
}) {
  // Auto-detect Codespace environment for service URLs
  const getCodespaceUrl = (port) => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('app.github.dev') || hostname.includes('preview.app.github.dev')) {
        const parts = hostname.split('-');
        if (parts.length >= 2) {
          const codespaceId = parts[0];
          return `https://${codespaceId}-${port}.app.github.dev`;
        }
      }
    }
    return `http://localhost:${port}`;
  };

  const dockerServiceSystems = [
    {
      name: "n8n Workflow Engine",
      endpoint: `${getCodespaceUrl(5678)}/healthz`,
      description: "Visual workflow automation platform",
      local: true,
      expectedResponse: { status: 'ok' },
      troubleshooting: [
        "Check if Docker containers are running: `docker ps`",
        "Restart n8n service: `docker-compose restart n8n`",
        "Check n8n logs: `docker-compose logs n8n`"
      ]
    },
    {
      name: "Documentation Site",
      endpoint: `${getCodespaceUrl(3000)}`,
      description: "This workshop documentation (should be running)",
      local: true,
      expectedResponse: null, // HTML response
      isCurrentSite: true
    }
  ];

  return (
    <div>
      <LiveStatusBadge 
        systems={dockerServiceSystems}
        showDetails={showDetails}
        refreshInterval={refreshInterval}
      />
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'var(--ifm-color-success-contrast-background)',
        borderRadius: '4px',
        border: '1px solid var(--ifm-color-success-contrast-border)'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-success)' }}>
          🐳 Docker Services Status
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
          <div>
            <strong>n8n Workflow Engine</strong>
            <br />
            <small>Visual workflow builder - your main tool</small>
          </div>
          <div>
            <strong>Documentation Site</strong>
            <br />
            <small>Workshop guidance (this site)</small>
          </div>
        </div>
        
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
            🔧 Troubleshooting Commands
          </summary>
          <div style={{ marginTop: '0.5rem', fontFamily: 'var(--ifm-font-family-monospace)', fontSize: '0.85rem' }}>
            <div><strong>Check all services:</strong> <code>docker ps</code></div>
            <div><strong>View service logs:</strong> <code>docker-compose logs [service-name]</code></div>
            <div><strong>Restart services:</strong> <code>docker-compose restart</code></div>
            <div><strong>Stop and restart all:</strong> <code>docker-compose down && docker-compose up -d</code></div>
          </div>
        </details>
        
        <p style={{ margin: '1rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)' }}>
          💡 <strong>Success Criteria:</strong> All services showing "Online" means you're ready to build workflows!
        </p>
      </div>
    </div>
  );
}