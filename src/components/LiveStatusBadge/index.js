import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// Auto-detect Codespace environment and build n8n URL
const detectCodespaceN8nUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Check if we're in a Codespace environment
    if (hostname.includes('app.github.dev') || hostname.includes('preview.app.github.dev')) {
      // Extract the Codespace identifier and build n8n URL
      const parts = hostname.split('-');
      if (parts.length >= 2) {
        const codespaceId = parts[0];
        return `https://${codespaceId}-5678.app.github.dev/healthz`;
      }
    }
  }
  return null;
};

// Get saved configuration from localStorage
const getSavedConfig = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('workshop-status-config');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn('Could not load saved configuration:', error);
      return {};
    }
  }
  return {};
};

// Save configuration to localStorage
const saveConfig = (config) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('workshop-status-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Could not save configuration:', error);
    }
  }
};

export default function LiveStatusBadge({ 
  systems = null, // Will be built dynamically based on config
  refreshInterval = 30000, // 30 seconds
  showDetails = false
}) {
  const [systemStatus, setSystemStatus] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({});
  const [configForm, setConfigForm] = useState({
    n8nUrl: '',
    mongoDbTestUrl: '',
    codespaceId: ''
  });

  // Initialize configuration on mount
  useEffect(() => {
    const savedConfig = getSavedConfig();
    const detectedN8nUrl = detectCodespaceN8nUrl();
    
    const initialConfig = {
      n8nUrl: savedConfig.n8nUrl || detectedN8nUrl || '',
      mongoDbTestUrl: savedConfig.mongoDbTestUrl || '',
      codespaceId: savedConfig.codespaceId || ''
    };
    
    setConfig(initialConfig);
    setConfigForm(initialConfig);
    
    // If no configuration exists, show config panel
    if (!savedConfig.n8nUrl && !detectedN8nUrl) {
      setShowConfig(true);
    }
  }, []);

  // Build systems array dynamically based on configuration
  const buildSystems = () => {
    const systemsArray = [
      {
        name: "Workshop API Gateway",
        endpoint: "https://workshop-embedding-api.vercel.app/api/health",
        description: "Embedding and proxy services",
        configurable: false
      }
    ];

    // Add n8n system if configured
    if (config.n8nUrl) {
      systemsArray.push({
        name: "n8n Workflow Engine",
        endpoint: config.n8nUrl,
        description: "Visual workflow automation",
        local: true,
        configurable: true
      });
    }

    // Add MongoDB system - either test endpoint or Atlas check
    if (config.mongoDbTestUrl) {
      systemsArray.push({
        name: "MongoDB Atlas",
        endpoint: config.mongoDbTestUrl,
        description: "Vector database and storage",
        configurable: true
      });
    } else {
      systemsArray.push({
        name: "MongoDB Atlas",
        endpoint: "https://workshop-embedding-api.vercel.app/api/check-db",
        description: "Vector database and storage (generic check)",
        configurable: false
      });
    }

    return systemsArray;
  };

  const currentSystems = systems || buildSystems();

  // Check system health
  const checkSystemHealth = async (system) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(system.endpoint, {
        method: 'GET',
        signal: controller.signal,
        mode: system.local ? 'no-cors' : 'cors'
      });
      
      clearTimeout(timeoutId);
      
      if (system.local && response.type === 'opaque') {
        // For local services, opaque response means it's reachable
        return { status: 'ok', responseTime: Date.now() };
      }
      
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        return { 
          status: 'ok', 
          responseTime: Date.now(),
          data: data
        };
      } else {
        return { 
          status: 'error', 
          responseTime: Date.now(),
          error: `HTTP ${response.status}`
        };
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return { status: 'timeout', error: 'Request timeout' };
      }
      return { 
        status: 'error', 
        error: system.local ? 'Service not running locally' : error.message 
      };
    }
  };

  // Check all systems
  const checkAllSystems = async () => {
    const results = {};
    
    for (const system of currentSystems) {
      results[system.name] = await checkSystemHealth(system);
    }
    
    setSystemStatus(results);
    setLastUpdate(new Date());
  };

  // Configuration form handlers
  const handleConfigSubmit = (e) => {
    e.preventDefault();
    const newConfig = { ...configForm };
    setConfig(newConfig);
    saveConfig(newConfig);
    setShowConfig(false);
    // Re-check systems with new config
    setTimeout(checkAllSystems, 100);
  };

  const handleConfigReset = () => {
    const detectedN8nUrl = detectCodespaceN8nUrl();
    const resetConfig = {
      n8nUrl: detectedN8nUrl || '',
      mongoDbTestUrl: '',
      codespaceId: ''
    };
    setConfigForm(resetConfig);
  };

  // Initial check and setup interval
  useEffect(() => {
    if (currentSystems.length > 0) {
      checkAllSystems();
    }
    
    const interval = setInterval(() => {
      if (currentSystems.length > 0) {
        checkAllSystems();
      }
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, config]); // Re-run when config changes

  // Get overall system status
  const getOverallStatus = () => {
    const statuses = Object.values(systemStatus);
    if (statuses.length === 0) return 'loading';
    if (statuses.every(s => s.status === 'ok')) return 'healthy';
    if (statuses.some(s => s.status === 'error' || s.status === 'timeout')) return 'degraded';
    return 'checking';
  };

  const overallStatus = getOverallStatus();

  return (
    <div className={styles.statusContainer}>
      <div 
        className={styles.statusHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.statusIndicator}>
          <div className={`${styles.statusDot} ${styles[overallStatus]}`}></div>
          <span className={styles.statusText}>
            Workshop Systems: {overallStatus === 'healthy' ? 'All Online' : 
                              overallStatus === 'degraded' ? 'Issues Detected' : 
                              overallStatus === 'loading' ? 'Checking...' : 'Unknown'}
          </span>
        </div>
        
        <div className={styles.controls}>
          {lastUpdate && (
            <span className={styles.lastUpdate}>
              Last check: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowConfig(!showConfig);
            }}
            className={styles.refreshButton}
            title="Configure endpoints"
          >
            ⚙️
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              checkAllSystems();
            }}
            className={styles.refreshButton}
            title="Refresh status"
          >
            🔄
          </button>
          <span className={styles.expandIcon}>
            {isExpanded ? '▼' : '▶'}
          </span>
        </div>
      </div>

      {showConfig && (
        <div className={styles.configPanel}>
          <form onSubmit={handleConfigSubmit} className={styles.configForm}>
            <h4>🔧 Configure Your Workshop Environment</h4>
            <p className={styles.configHelp}>
              Personalize the status checks for your specific Codespace and MongoDB Atlas instance.
            </p>
            
            <div className={styles.configField}>
              <label htmlFor="n8nUrl">n8n Workflow Engine URL:</label>
              <input
                type="text"
                id="n8nUrl"
                value={configForm.n8nUrl}
                onChange={(e) => setConfigForm({...configForm, n8nUrl: e.target.value})}
                placeholder="https://your-codespace-5678.app.github.dev/healthz"
                className={styles.configInput}
              />
              <small className={styles.configHint}>
                💡 Find this in your Codespace: Go to the PORTS tab and look for port 5678, then add '/healthz' to the URL
              </small>
            </div>

            <div className={styles.configField}>
              <label htmlFor="mongoDbTestUrl">MongoDB Atlas Test URL (optional):</label>
              <input
                type="text"
                id="mongoDbTestUrl"
                value={configForm.mongoDbTestUrl}
                onChange={(e) => setConfigForm({...configForm, mongoDbTestUrl: e.target.value})}
                placeholder="Custom MongoDB health check endpoint"
                className={styles.configInput}
              />
              <small className={styles.configHint}>
                💡 Leave empty to use the generic MongoDB check via workshop gateway
              </small>
            </div>

            <div className={styles.configActions}>
              <button type="submit" className={styles.configSave}>
                Save Configuration
              </button>
              <button type="button" onClick={handleConfigReset} className={styles.configReset}>
                Auto-Detect
              </button>
              <button type="button" onClick={() => setShowConfig(false)} className={styles.configCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isExpanded && (
        <div className={styles.systemDetails}>
          {currentSystems.map((system) => {
            const status = systemStatus[system.name] || { status: 'loading' };
            
            return (
              <div key={system.name} className={styles.systemRow}>
                <div className={styles.systemInfo}>
                  <div className={`${styles.systemDot} ${styles[status.status]}`}></div>
                  <div>
                    <div className={styles.systemName}>{system.name}</div>
                    <div className={styles.systemDescription}>{system.description}</div>
                  </div>
                </div>
                
                <div className={styles.systemStatus}>
                  <span className={`${styles.statusLabel} ${styles[status.status]}`}>
                    {status.status === 'ok' ? 'Online' :
                     status.status === 'error' ? 'Error' :
                     status.status === 'timeout' ? 'Timeout' : 'Checking...'}
                  </span>
                  
                  {status.error && (
                    <div className={styles.errorMessage}>{status.error}</div>
                  )}
                  
                  {system.local && status.status !== 'ok' && (
                    <div className={styles.localHelp}>
                      💡 Make sure your Codespace is running and n8n is started
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          <div className={styles.statusFooter}>
            <div className={styles.helpText}>
              {overallStatus === 'healthy' ? 
                '✅ All systems operational - ready for workshop exercises!' :
                '⚠️ Some systems need attention - check the details above'}
            </div>
            
            <div className={styles.troubleshootLinks}>
              <a href="/docs/docker-troubleshooting" className={styles.helpLink}>
                🔧 Troubleshooting Guide
              </a>
              <a href="/docs/github-codespaces" className={styles.helpLink}>
                ☁️ Codespace Setup
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for inline use
export function StatusDot({ 
  system, 
  endpoint, 
  size = 'small',
  showLabel = true 
}) {
  const [status, setStatus] = useState('loading');
  
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(endpoint, { 
          method: 'GET',
          signal: AbortSignal.timeout(3000)
        });
        setStatus(response.ok ? 'ok' : 'error');
      } catch (error) {
        setStatus('error');
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [endpoint]);

  return (
    <span className={`${styles.inlineStatus} ${styles[size]}`}>
      <div className={`${styles.statusDot} ${styles[status]}`}></div>
      {showLabel && <span>{system}: {status === 'ok' ? 'Online' : 'Offline'}</span>}
    </span>
  );
}

// System health dashboard for instructor view
export function SystemHealthDashboard() {
  return (
    <div className={styles.dashboard}>
      <h3>🖥️ Workshop System Health</h3>
      <LiveStatusBadge showDetails={true} refreshInterval={15000} />
      
      <div className={styles.dashboardHelp}>
        <h4>For Instructors:</h4>
        <ul>
          <li>Green: System is responsive and healthy</li>
          <li>Yellow: System responding but may be slow</li>
          <li>Red: System unreachable or error detected</li>
        </ul>
        
        <p>
          <strong>Before starting exercises:</strong> Verify all systems show green.
          If any are red, use the troubleshooting links or have attendees switch to working systems.
        </p>
      </div>
    </div>
  );
}

// Import and re-export specialized status badge components
export { default as CodespaceStatusBadge } from './CodespaceStatusBadge.js';
export { default as DockerServicesStatusBadge } from './DockerServicesStatusBadge.js';
export { default as MongoDBAtlasStatusBadge } from './MongoDBAtlasStatusBadge.js';
export { default as VoyageAIStatusBadge } from './VoyageAIStatusBadge.js';
export { default as WorkflowTestBadge } from './WorkflowTestBadge.js';