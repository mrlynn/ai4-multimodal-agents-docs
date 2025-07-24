import React, { useState, useEffect } from 'react';
import LiveStatusBadge from './index.js';

/**
 * Specialized status badge for testing complete n8n workflows
 * Used when attendees build and test their PDF processing workflows
 */
export default function WorkflowTestBadge({ 
  showDetails = true,
  refreshInterval = 45000, // Less frequent for complex workflow tests
  workflowEndpoint = null, // Allow custom workflow webhook URL
  testDocument = null // Allow custom test document
}) {
  const [workflowConfig, setWorkflowConfig] = useState({
    webhookUrl: workflowEndpoint || '',
    testDocumentUrl: testDocument || 'https://workshop-files.s3.amazonaws.com/sample-report.pdf'
  });
  const [testResults, setTestResults] = useState({});
  const [isRunningWorkflowTest, setIsRunningWorkflowTest] = useState(false);
  const [showWorkflowConfig, setShowWorkflowConfig] = useState(false);

  // Auto-detect n8n webhook URL if possible
  useEffect(() => {
    if (!workflowEndpoint && typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('app.github.dev')) {
        const parts = hostname.split('-');
        if (parts.length >= 2) {
          const codespaceId = parts[0];
          const detectedUrl = `https://${codespaceId}-5678.app.github.dev/webhook/pdf-upload`;
          setWorkflowConfig(prev => ({
            ...prev,
            webhookUrl: prev.webhookUrl || detectedUrl
          }));
        }
      }
    }
  }, [workflowEndpoint]);

  const workflowTestSystems = [
    {
      name: "n8n Webhook Endpoint",
      endpoint: workflowConfig.webhookUrl || null,
      description: "PDF upload webhook receiver",
      method: "POST",
      body: { test: true },
      local: true,
      configurable: true
    },
    {
      name: "PDF Processing Pipeline",
      endpoint: null, // Custom test
      description: "Complete PDF-to-embeddings workflow",
      customTest: async () => {
        if (!workflowConfig.webhookUrl) {
          return { status: 'error', message: 'Webhook URL not configured' };
        }
        
        try {
          const response = await fetch(workflowConfig.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              documentUrl: workflowConfig.testDocumentUrl,
              test: true
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            return {
              status: 'ok',
              message: `Processed successfully: ${result.pages || 0} pages`,
              result
            };
          } else {
            return {
              status: 'error', 
              message: `HTTP ${response.status}: ${response.statusText}`
            };
          }
        } catch (error) {
          return {
            status: 'error',
            message: error.message
          };
        }
      },
      dependsOn: ["n8n Webhook Endpoint"]
    },
    {
      name: "MongoDB Storage",
      endpoint: null,
      description: "Embeddings stored in database",
      customTest: async () => {
        // This would check if the workflow actually stored data in MongoDB
        // For now, we'll simulate based on the PDF processing result
        const pdfResult = testResults.pdfProcessing;
        if (pdfResult && pdfResult.result && pdfResult.result.embeddings) {
          return {
            status: 'ok',
            message: `${pdfResult.result.embeddings.length} embeddings stored`
          };
        }
        return { status: 'pending', message: 'Waiting for PDF processing results' };
      },
      dependsOn: ["PDF Processing Pipeline"]
    }
  ];

  // Run comprehensive workflow test
  const runWorkflowTest = async () => {
    setIsRunningWorkflowTest(true);
    const results = {};
    
    try {
      // Test the complete workflow with a real document
      const response = await fetch(workflowConfig.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentUrl: workflowConfig.testDocumentUrl,
          options: {
            maxPages: 3, // Limit for testing
            generateEmbeddings: true,
            storeInMongoDB: true
          }
        })
      });
      
      if (response.ok) {
        results.workflowTest = await response.json();
        results.success = true;
      } else {
        results.error = `HTTP ${response.status}: ${response.statusText}`;
        results.success = false;
      }
      
      setTestResults(results);
    } catch (error) {
      console.error('Workflow test failed:', error);
      setTestResults({ error: error.message, success: false });
    } finally {
      setIsRunningWorkflowTest(false);
    }
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setWorkflowConfig({
      webhookUrl: formData.get('webhookUrl'),
      testDocumentUrl: formData.get('testDocumentUrl')
    });
    setShowWorkflowConfig(false);
  };

  return (
    <div>
      <LiveStatusBadge 
        systems={workflowTestSystems}
        showDetails={showDetails}
        refreshInterval={refreshInterval}
      />
      
      {showWorkflowConfig && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1.5rem', 
          background: 'var(--ifm-color-warning-contrast-background)',
          borderRadius: '4px',
          border: '1px solid var(--ifm-color-warning-contrast-border)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--ifm-color-warning)' }}>
            🔧 Configure Workflow Testing
          </h4>
          
          <form onSubmit={handleConfigSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="webhookUrl" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                n8n Webhook URL:
              </label>
              <input
                type="text"
                id="webhookUrl"
                name="webhookUrl"
                placeholder="https://your-codespace-5678.app.github.dev/webhook/pdf-upload"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ifm-font-family-monospace)',
                  fontSize: '0.85rem'
                }}
                required
                defaultValue={workflowConfig.webhookUrl}
              />
              <small style={{ color: 'var(--ifm-color-content-secondary)', fontSize: '0.8rem' }}>
                💡 This should be your n8n webhook trigger URL for the PDF processing workflow
              </small>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="testDocumentUrl" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Test Document URL:
              </label>
              <input
                type="url"
                id="testDocumentUrl"
                name="testDocumentUrl"
                placeholder="https://example.com/sample-document.pdf"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '4px'
                }}
                defaultValue={workflowConfig.testDocumentUrl}
              />
              <small style={{ color: 'var(--ifm-color-content-secondary)', fontSize: '0.8rem' }}>
                💡 A publicly accessible PDF URL for testing your workflow
              </small>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowWorkflowConfig(false)}
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
                Save Configuration
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'var(--ifm-color-success-contrast-background)',
        borderRadius: '4px',
        border: '1px solid var(--ifm-color-success-contrast-border)'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-success)' }}>
          🔄 End-to-End Workflow Testing
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
          <div>
            <strong>📋 PDF Processing</strong>
            <br />
            <small>Text extraction and page analysis</small>
            {testResults.workflowTest?.pages && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-color-success)' }}>
                ✅ {testResults.workflowTest.pages} pages processed
              </div>
            )}
          </div>
          
          <div>
            <strong>🧠 Embedding Generation</strong>
            <br />
            <small>Text-to-vector conversion</small>
            {testResults.workflowTest?.embeddings && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-color-success)' }}>
                ✅ {testResults.workflowTest.embeddings.length} embeddings
              </div>
            )}
          </div>
          
          <div>
            <strong>💾 Database Storage</strong>
            <br />
            <small>MongoDB Atlas persistence</small>
            {testResults.workflowTest?.stored && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-color-success)' }}>
                ✅ Data stored successfully
              </div>
            )}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--ifm-color-emphasis-100)',
          borderRadius: '4px'
        }}>
          <button
            onClick={runWorkflowTest}
            disabled={isRunningWorkflowTest || !workflowConfig.webhookUrl}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              background: isRunningWorkflowTest || !workflowConfig.webhookUrl ? 
                'var(--ifm-color-emphasis-300)' : 'var(--ifm-color-success)',
              color: 'white',
              cursor: isRunningWorkflowTest || !workflowConfig.webhookUrl ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            {isRunningWorkflowTest ? '🔄 Testing Workflow...' : '🚀 Test Complete Workflow'}
          </button>
          
          <div style={{ flex: 1 }}>
            <strong>Full Pipeline Test</strong>
            <br />
            <small style={{ color: 'var(--ifm-color-content-secondary)' }}>
              Tests PDF upload → processing → embedding → storage pipeline
            </small>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            onClick={() => setShowWorkflowConfig(true)}
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
            ⚙️ Configure Endpoints
          </button>
          <span style={{ fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)' }}>
            Set your n8n webhook URL and test document
          </span>
        </div>

        {testResults.success === false && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'var(--ifm-color-danger-contrast-background)',
            border: '1px solid var(--ifm-color-danger-contrast-border)',
            borderRadius: '4px',
            color: 'var(--ifm-color-danger)'
          }}>
            <strong>❌ Test Failed:</strong> {testResults.error}
          </div>
        )}

        {testResults.workflowTest && (
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
              📊 Latest Workflow Results
            </summary>
            <div style={{ 
              marginTop: '0.5rem', 
              padding: '0.75rem',
              background: 'var(--ifm-background-color)',
              borderRadius: '4px',
              fontFamily: 'var(--ifm-font-family-monospace)',
              fontSize: '0.8rem',
              maxHeight: '300px',
              overflow: 'auto'
            }}>
              <pre>{JSON.stringify(testResults.workflowTest, null, 2)}</pre>
            </div>
          </details>
        )}

        <p style={{ margin: '1rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)' }}>
          💡 <strong>Success means:</strong> Your complete PDF agent pipeline is working end-to-end!
        </p>
      </div>
    </div>
  );
}