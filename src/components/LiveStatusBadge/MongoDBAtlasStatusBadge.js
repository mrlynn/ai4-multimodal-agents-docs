import React, { useState, useEffect } from 'react';
import LiveStatusBadge from './index.js';

/**
 * Specialized status badge for MongoDB Atlas setup validation
 * Used when attendees configure their MongoDB Atlas connection
 */
export default function MongoDBAtlasStatusBadge({ 
  showDetails = true,
  refreshInterval = 20000, // Less frequent for external service
  connectionString = null // Allow passing connection string for testing
}) {
  const [atlasConfig, setAtlasConfig] = useState({
    connectionString: connectionString || '',
    clusterName: '',
    database: 'workshop'
  });
  const [showConnectionForm, setShowConnectionForm] = useState(false);

  // Load saved Atlas configuration
  useEffect(() => {
    const savedConfig = localStorage.getItem('workshop-atlas-config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setAtlasConfig(config);
      } catch (error) {
        console.warn('Could not load Atlas configuration:', error);
      }
    } else if (!connectionString) {
      setShowConnectionForm(true); // Show config form if no saved config
    }
  }, [connectionString]);

  const saveAtlasConfig = (config) => {
    try {
      localStorage.setItem('workshop-atlas-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Could not save Atlas configuration:', error);
    }
  };

  const atlasSpecificSystems = [
    {
      name: "MongoDB Atlas Cluster",
      endpoint: "https://workshop-embedding-api.vercel.app/api/atlas-test",
      description: "Cloud MongoDB cluster connectivity",
      method: "POST",
      body: {
        connectionString: atlasConfig.connectionString,
        database: atlasConfig.database
      },
      expectedResponse: { status: 'connected' },
      configurable: true
    },
    {
      name: "Vector Search Index",
      endpoint: "https://workshop-embedding-api.vercel.app/api/vector-index-test", 
      description: "AI-powered search capabilities",
      method: "POST",
      body: {
        connectionString: atlasConfig.connectionString,
        database: atlasConfig.database,
        collection: 'embeddings'
      },
      dependsOn: "MongoDB Atlas Cluster",
      configurable: true
    },
    {
      name: "Database Permissions",
      endpoint: "https://workshop-embedding-api.vercel.app/api/permissions-test",
      description: "Read/write access verification", 
      method: "POST",
      body: {
        connectionString: atlasConfig.connectionString,
        database: atlasConfig.database
      },
      dependsOn: "MongoDB Atlas Cluster",
      configurable: true
    }
  ];

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newConfig = {
      connectionString: formData.get('connectionString'),
      clusterName: formData.get('clusterName') || 'workshop-cluster',
      database: formData.get('database') || 'workshop'
    };
    
    setAtlasConfig(newConfig);
    saveAtlasConfig(newConfig);
    setShowConnectionForm(false);
  };

  return (
    <div>
      <LiveStatusBadge 
        systems={atlasSpecificSystems}
        showDetails={showDetails}
        refreshInterval={refreshInterval}
      />
      
      {showConnectionForm && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1.5rem', 
          background: 'var(--ifm-color-warning-contrast-background)',
          borderRadius: '4px',
          border: '1px solid var(--ifm-color-warning-contrast-border)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--ifm-color-warning)' }}>
            🔧 Configure MongoDB Atlas Connection
          </h4>
          
          <form onSubmit={handleConfigSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="connectionString" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                MongoDB Atlas Connection String:
              </label>
              <input
                type="text"
                id="connectionString"
                name="connectionString"
                placeholder="mongodb+srv://username:password@cluster.mongodb.net/"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ifm-font-family-monospace)',
                  fontSize: '0.85rem'
                }}
                required
                defaultValue={atlasConfig.connectionString}
              />
              <small style={{ color: 'var(--ifm-color-content-secondary)', fontSize: '0.8rem' }}>
                💡 Find this in your MongoDB Atlas dashboard under "Connect" → "Connect your application"
              </small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label htmlFor="clusterName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Cluster Name (optional):
                </label>
                <input
                  type="text"
                  id="clusterName"
                  name="clusterName"
                  placeholder="workshop-cluster"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '4px'
                  }}
                  defaultValue={atlasConfig.clusterName}
                />
              </div>
              
              <div>
                <label htmlFor="database" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Database Name:
                </label>
                <input
                  type="text"
                  id="database"
                  name="database"
                  placeholder="workshop"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '4px'
                  }}
                  defaultValue={atlasConfig.database}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowConnectionForm(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '4px',
                  background: 'var(--ifm-background-color)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  background: 'var(--ifm-color-primary)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Test Connection
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'var(--ifm-color-info-contrast-background)',
        borderRadius: '4px',
        border: '1px solid var(--ifm-color-info-contrast-border)'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-info)' }}>
          ☁️ MongoDB Atlas Setup Validation
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
          <div>
            <strong>✅ Cluster Connectivity</strong>
            <br />
            <small>Basic connection to your Atlas cluster</small>
          </div>
          <div>
            <strong>🔍 Vector Search Ready</strong>
            <br />
            <small>AI-powered search index available</small>
          </div>
          <div>
            <strong>🔐 Permissions Verified</strong>
            <br />
            <small>Read/write access confirmed</small>
          </div>
        </div>
        
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
            🛠️ Atlas Setup Checklist
          </summary>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Create MongoDB Atlas account (free tier)</li>
            <li>Create a new cluster (M0 Sandbox is sufficient)</li>
            <li>Add your IP address to Network Access</li>
            <li>Create database user with read/write permissions</li>
            <li>Get connection string from "Connect" button</li>
            <li>Replace &lt;password&gt; with your actual password</li>
          </ul>
        </details>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            onClick={() => setShowConnectionForm(true)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--ifm-color-primary)',
              borderRadius: '4px',
              background: 'var(--ifm-background-color)',
              color: 'var(--ifm-color-primary)',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ⚙️ Configure Connection
          </button>
          <span style={{ fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)' }}>
            Update your MongoDB Atlas connection details
          </span>
        </div>
      </div>
    </div>
  );
}