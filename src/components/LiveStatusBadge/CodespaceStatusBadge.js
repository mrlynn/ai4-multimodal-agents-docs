import React from 'react';
import LiveStatusBadge from './index.js';

/**
 * Specialized status badge for initial Codespace setup validation
 * Used right after attendees launch their Codespace environment
 */
export default function CodespaceStatusBadge({ 
  showDetails = true,
  refreshInterval = 15000 // More frequent checks during setup
}) {
  const codespaceSpecificSystems = [
    {
      name: "GitHub Codespace Environment",
      endpoint: null, // Will be detected automatically
      description: "Development container and VS Code",
      test: () => {
        // Check if we're running in a Codespace
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          return hostname.includes('app.github.dev') || hostname.includes('preview.app.github.dev');
        }
        return false;
      },
      localTest: true
    },
    {
      name: "Docker Environment",
      endpoint: "http://localhost:2375/version", // Docker daemon endpoint
      description: "Container runtime for workshop services",
      local: true,
      fallbackTest: async () => {
        // Fallback: Check if we can reach typical Docker services
        try {
          const response = await fetch('http://localhost:5678', { method: 'HEAD', mode: 'no-cors' });
          return true; // If n8n is accessible, Docker is likely running
        } catch {
          return false;
        }
      }
    },
    {
      name: "Port Forwarding",
      endpoint: null,
      description: "Codespace port accessibility",
      test: async () => {
        // Test if we can access forwarded ports
        if (typeof window === 'undefined') return false;
        
        const hostname = window.location.hostname;
        if (!hostname.includes('app.github.dev')) return false;
        
        // Extract codespace ID and test a known port
        const parts = hostname.split('-');
        if (parts.length >= 2) {
          const codespaceId = parts[0];
          try {
            // Test if port 3000 (docs) is accessible - it should be since we're viewing it
            const testUrl = `https://${codespaceId}-3000.app.github.dev`;
            const response = await fetch(testUrl, { method: 'HEAD', mode: 'no-cors' });
            return true;
          } catch {
            return false;
          }
        }
        return false;
      },
      localTest: true
    }
  ];

  return (
    <div>
      <LiveStatusBadge 
        systems={codespaceSpecificSystems}
        showDetails={showDetails}
        refreshInterval={refreshInterval}
      />
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'var(--ifm-color-info-contrast-background)',
        borderRadius: '4px',
        border: '1px solid var(--ifm-color-info-contrast-border)'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-info)' }}>
          🚀 Codespace Setup Checklist
        </h4>
        <ul style={{ margin: '0', paddingLeft: '1.5rem' }}>
          <li><strong>Environment Active</strong> - Your Codespace container is running</li>
          <li><strong>Docker Available</strong> - Container runtime ready for workshop services</li>
          <li><strong>Port Forwarding</strong> - Services will be accessible through secure URLs</li>
        </ul>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)' }}>
          💡 <strong>Next Step:</strong> Once all systems show green, you're ready to start the Docker services!
        </p>
      </div>
    </div>
  );
}