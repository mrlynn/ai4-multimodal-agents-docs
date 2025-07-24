import React, { useState, useEffect } from 'react';
import LiveStatusBadge from './index.js';

/**
 * Specialized status badge for Voyage AI integration testing
 * Used when attendees test their embedding generation capabilities
 */
export default function VoyageAIStatusBadge({ 
  showDetails = true,
  refreshInterval = 30000, // Less frequent for external API
  testMode = 'workshop' // 'workshop' uses proxy, 'direct' uses user's API key
}) {
  const [testResults, setTestResults] = useState({});
  const [isRunningTest, setIsRunningTest] = useState(false);

  const voyageAITestSystems = [
    {
      name: "Workshop API Gateway",
      endpoint: "https://workshop-embedding-api.vercel.app/api/health",
      description: "Proxy service for Voyage AI access",
      expectedResponse: { status: 'ok' }
    },
    {
      name: "Voyage AI Text Embeddings",
      endpoint: "https://workshop-embedding-api.vercel.app/api/embed",
      description: "Text-to-vector conversion",
      method: "POST",
      body: {
        input: { text: "This is a test embedding for the workshop" },
        model: "voyage-3",
        input_type: "document"
      },
      expectedResponse: { embeddings: [] },
      testResultKey: 'textEmbed'
    },
    {
      name: "Voyage AI Multimodal Embeddings", 
      endpoint: "https://workshop-embedding-api.vercel.app/api/embed",
      description: "Combined text + image embeddings",
      method: "POST",
      body: {
        input: { 
          text: "Sample document text",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" // 1x1 pixel PNG
        },
        model: "voyage-multimodal-3"
      },
      expectedResponse: { embeddings: [] },
      testResultKey: 'multimodalEmbed'
    },
    {
      name: "Embedding Dimensions",
      endpoint: null, // Custom test based on previous results
      description: "Verify 1024-dimensional vectors",
      customTest: async () => {
        const textResult = testResults.textEmbed;
        if (textResult && textResult.embeddings && textResult.embeddings.length > 0) {
          const dimensions = textResult.embeddings[0].length;
          return {
            status: dimensions === 1024 ? 'ok' : 'error',
            message: `Vector dimensions: ${dimensions} (expected: 1024)`,
            dimensions
          };
        }
        return { status: 'pending', message: 'Waiting for embedding test results' };
      },
      dependsOn: ["Voyage AI Text Embeddings"]
    }
  ];

  // Run comprehensive embedding test
  const runEmbeddingTest = async () => {
    setIsRunningTest(true);
    const results = {};
    
    try {
      // Test text embeddings
      const textResponse = await fetch('https://workshop-embedding-api.vercel.app/api/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: "Workshop embedding test - text only" },
          model: "voyage-3",
          input_type: "document"
        })
      });
      
      if (textResponse.ok) {
        results.textEmbed = await textResponse.json();
      }

      // Test multimodal embeddings
      const multimodalResponse = await fetch('https://workshop-embedding-api.vercel.app/api/embed', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { 
            text: "Workshop test - multimodal",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          },
          model: "voyage-multimodal-3"
        })
      });
      
      if (multimodalResponse.ok) {
        results.multimodalEmbed = await multimodalResponse.json();
      }

      setTestResults(results);
    } catch (error) {
      console.error('Embedding test failed:', error);
    } finally {
      setIsRunningTest(false);
    }
  };

  return (
    <div>
      <LiveStatusBadge 
        systems={voyageAITestSystems}
        showDetails={showDetails}
        refreshInterval={refreshInterval}
      />
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'var(--ifm-color-secondary-contrast-background)',
        borderRadius: '4px',
        border: '1px solid var(--ifm-color-secondary-contrast-border)'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-secondary)' }}>
          🚀 Voyage AI Integration Testing
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
          <div>
            <strong>📝 Text Embeddings</strong>
            <br />
            <small>Convert text to 1024-dimensional vectors</small>
            {testResults.textEmbed && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-color-success)' }}>
                ✅ {testResults.textEmbed.embeddings?.[0]?.length || 0} dimensions
              </div>
            )}
          </div>
          
          <div>
            <strong>🖼️ Multimodal Embeddings</strong>
            <br />
            <small>Unified text + image vector space</small>
            {testResults.multimodalEmbed && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-color-success)' }}>
                ✅ {testResults.multimodalEmbed.embeddings?.[0]?.length || 0} dimensions
              </div>
            )}
          </div>
          
          <div>
            <strong>⚡ API Performance</strong>
            <br />
            <small>Response time and throughput</small>
            {testResults.textEmbed && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-color-info)' }}>
                📊 Usage: {testResults.textEmbed.usage?.total_tokens || 0} tokens
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
            onClick={runEmbeddingTest}
            disabled={isRunningTest}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              background: isRunningTest ? 'var(--ifm-color-emphasis-300)' : 'var(--ifm-color-primary)',
              color: 'white',
              cursor: isRunningTest ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            {isRunningTest ? '🔄 Testing...' : '🧪 Run Embedding Test'}
          </button>
          
          <div style={{ flex: 1 }}>
            <strong>Comprehensive Test</strong>
            <br />
            <small style={{ color: 'var(--ifm-color-content-secondary)' }}>
              Tests both text and multimodal embedding generation with real API calls
            </small>
          </div>
        </div>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
            📋 What This Test Validates
          </summary>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
            <li><strong>API Connectivity:</strong> Workshop gateway can reach Voyage AI services</li>
            <li><strong>Text Processing:</strong> Plain text converts to 1024-dimensional vectors</li>
            <li><strong>Multimodal Processing:</strong> Combined text+image creates unified embeddings</li>
            <li><strong>Vector Dimensions:</strong> Confirms standard 1024-dimensional output</li>
            <li><strong>Response Format:</strong> Validates expected JSON structure and fields</li>
          </ul>
        </details>

        {testResults.textEmbed && (
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
              📊 Latest Test Results
            </summary>
            <div style={{ 
              marginTop: '0.5rem', 
              padding: '0.75rem',
              background: 'var(--ifm-background-color)',
              borderRadius: '4px',
              fontFamily: 'var(--ifm-font-family-monospace)',
              fontSize: '0.8rem',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              <div><strong>Text Embedding Sample:</strong></div>
              <div>Dimensions: {testResults.textEmbed.embeddings?.[0]?.length}</div>
              <div>First 5 values: [{testResults.textEmbed.embeddings?.[0]?.slice(0, 5).map(v => v.toFixed(4)).join(', ')}...]</div>
              <div>Usage: {JSON.stringify(testResults.textEmbed.usage)}</div>
              
              {testResults.multimodalEmbed && (
                <>
                  <div style={{ marginTop: '0.5rem' }}><strong>Multimodal Embedding Sample:</strong></div>
                  <div>Dimensions: {testResults.multimodalEmbed.embeddings?.[0]?.length}</div>
                  <div>First 5 values: [{testResults.multimodalEmbed.embeddings?.[0]?.slice(0, 5).map(v => v.toFixed(4)).join(', ')}...]</div>
                </>
              )}
            </div>
          </details>
        )}

        <p style={{ margin: '1rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-content-secondary)' }}>
          💡 <strong>Next Step:</strong> Once embeddings work, you're ready to store them in MongoDB Atlas!
        </p>
      </div>
    </div>
  );
}