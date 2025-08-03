import React, { useState, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';

export default function PDFUploadTest() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [asking, setAsking] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook-test/process-pdf');
  const [chatWebhookUrl, setChatWebhookUrl] = useState('http://localhost:5678/webhook/multimodal-chat-agent');
  
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setStatus({
        type: 'error',
        message: 'Please upload a PDF file only.'
      });
      return;
    }

    setUploading(true);
    setStatus({
      type: 'info',
      message: `Uploading and processing PDF to: ${webhookUrl}...`
    });

    const formData = new FormData();
    formData.append('file', file);

    console.log('🚀 Uploading to URL:', webhookUrl);
    console.log('📄 File:', file.name, 'Size:', file.size);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      let result;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const text = await response.text();
          result = { rawResponse: text, contentType };
        }
      } catch (jsonError) {
        // Handle JSON parsing errors
        try {
          const text = await response.text();
          result = { 
            parseError: jsonError.message,
            rawResponse: text, 
            contentType,
            note: 'Response could not be parsed as JSON'
          };
        } catch (textError) {
          result = {
            parseError: jsonError.message,
            textError: textError.message,
            rawResponse: 'Could not read response',
            contentType
          };
        }
      }

      console.log('📦 Response data:', result);

      if (response.ok) {
        setCurrentFile(file.name);
        setStatus({
          type: 'success',
          message: `✅ Successfully processed ${file.name}!`,
          details: {
            ...result,
            requestUrl: webhookUrl,
            responseStatus: response.status
          }
        });
        setChatMode(true);
      } else {
        const errorMessage = result.error || result.message || result.rawResponse || 'Upload failed';
        const jsonParseHint = result.parseError ? ' (JSON parsing failed - check n8n workflow response format)' : '';
        
        setStatus({
          type: 'error',
          message: `❌ HTTP ${response.status}: ${errorMessage}${jsonParseHint}`,
          details: {
            ...result,
            requestUrl: webhookUrl,
            responseStatus: response.status,
            suggestion: response.status === 404 
              ? 'Webhook not found. Check if your n8n workflow is active and the path is correct.'
              : result.parseError
                ? 'n8n workflow is not returning valid JSON. Check your workflow response format.'
                : 'Check n8n workflow logs for detailed error information.'
          }
        });
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      setStatus({
        type: 'error',
        message: `❌ Connection Error: ${error.message}`,
        details: { 
          errorType: error.name,
          errorMessage: error.message,
          requestUrl: webhookUrl,
          suggestion: 'Make sure your n8n workflow is running and the webhook URL is correct. Check browser console for more details.',
          troubleshooting: [
            'Verify n8n is running on the correct port',
            'Check if the workflow is activated in n8n',
            'Ensure the webhook path matches your workflow',
            'Try opening the webhook URL directly in browser'
          ]
        }
      });
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { type: 'user', text: question, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setAsking(true);

    const loadingMessage = { type: 'ai', text: 'Thinking...', loading: true, timestamp: new Date() };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const response = await fetch(chatWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.text,
          filename: currentFile
        })
      });

      const result = await response.json();
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => !msg.loading));

      if (response.ok) {
        const aiMessage = {
          type: 'ai',
          text: result.message || result.response || result.answer || 'No answer received',
          timestamp: new Date(),
          details: result
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage = {
          type: 'ai',
          text: `❌ Error: ${result.error || result.message || 'Failed to get answer'}`,
          timestamp: new Date(),
          error: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      // Remove loading message
      setMessages(prev => prev.filter(msg => !msg.loading));
      
      const errorMessage = {
        type: 'ai',
        text: `❌ Connection Error: ${error.message}`,
        timestamp: new Date(),
        error: true,
        details: {
          suggestion: 'Make sure your n8n chat workflow is running and the webhook URL is correct.',
          currentUrl: chatWebhookUrl
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setAsking(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setChatMode(false);
    setCurrentFile(null);
    setStatus(null);
  };

  const testConnection = async () => {
    setStatus({
      type: 'info',
      message: `Testing connection to: ${webhookUrl}...`
    });

    try {
      console.log('🔍 Testing connection to:', webhookUrl);
      
      // Try a simple GET request first to see if the endpoint exists
      const response = await fetch(webhookUrl, {
        method: 'POST',
      });

      console.log('🔍 Test response status:', response.status);
      console.log('🔍 Test response headers:', Object.fromEntries(response.headers.entries()));

      let result;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const text = await response.text();
          result = { rawResponse: text, contentType };
        }
      } catch (jsonError) {
        // Handle JSON parsing errors in test connection
        try {
          const text = await response.text();
          result = { 
            parseError: jsonError.message,
            rawResponse: text, 
            contentType,
            note: 'Response could not be parsed as JSON'
          };
        } catch (textError) {
          result = {
            parseError: jsonError.message,
            textError: textError.message,
            rawResponse: 'Could not read response',
            contentType
          };
        }
      }

      if (response.status === 405) {
        // Method not allowed is expected for webhooks - it means the endpoint exists
        setStatus({
          type: 'success',
          message: '✅ Webhook endpoint found! (Method Not Allowed is expected for webhooks)',
          details: {
            requestUrl: webhookUrl,
            responseStatus: response.status,
            note: 'HTTP 405 is normal for webhook endpoints when accessed via GET. Your webhook should work for POST requests.'
          }
        });
      } else if (response.status === 404) {
        // Check if it's an n8n-specific 404 with helpful message
        const isN8nError = result.message && result.message.includes('webhook') && result.message.includes('registered');
        
        setStatus({
          type: 'error',
          message: `❌ Webhook not found (404)${isN8nError ? ' - n8n Webhook Not Registered' : ''}`,
          details: {
            requestUrl: webhookUrl,
            responseStatus: response.status,
            n8nMessage: result.message,
            n8nHint: result.hint,
            suggestion: isN8nError 
              ? 'Your n8n workflow needs to be activated or you need to click "Execute workflow" in n8n to register the webhook.'
              : 'Check if your n8n workflow is active and the webhook path is correct.',
            quickFix: isN8nError ? [
              '1. Open your n8n workflow',
              '2. Click the "Execute workflow" button to register the webhook for testing',
              '3. OR activate the workflow for permanent registration',
              '4. Try the upload again'
            ] : undefined
          }
        });
      } else {
        setStatus({
          type: 'info',
          message: `🔍 Connection test completed (HTTP ${response.status})`,
          details: {
            ...result,
            requestUrl: webhookUrl,
            responseStatus: response.status,
            note: 'Unexpected response. Check the details below.'
          }
        });
      }
    } catch (error) {
      console.error('🔍 Connection test error:', error);
      setStatus({
        type: 'error',
        message: `❌ Connection Test Failed: ${error.message}`,
        details: {
          errorType: error.name,
          errorMessage: error.message,
          requestUrl: webhookUrl,
          suggestion: 'Cannot reach the webhook URL. Check if n8n is running and accessible.'
        }
      });
    }
  };

  return (
    <Layout
      title="PDF Upload Tester"
      description="Test your n8n PDF processing workflows">
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          padding: '2rem',
          border: '1px solid var(--ifm-color-emphasis-200)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-primary)' }}>
              🤖 PDF Workflow Tester
            </h1>
            <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '1.1rem', margin: 0 }}>
              Test your n8n PDF processing and chat workflows
            </p>
          </div>

          {/* Configuration Section */}
          <div style={{ 
            background: 'var(--ifm-color-emphasis-100)', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '2rem' 
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>⚙️ Webhook Configuration</h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Upload Webhook URL:
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                  placeholder="http://localhost:5678/webhook-test/process-pdf"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Chat Webhook URL:
                </label>
                <input
                  type="text"
                  value={chatWebhookUrl}
                  onChange={(e) => setChatWebhookUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                  placeholder="http://localhost:5678/webhook/multimodal-chat-agent"
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                onClick={testConnection}
                style={{
                  background: 'var(--ifm-color-secondary)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                🔍 Test Connection
              </button>
            </div>
          </div>

          {/* Upload Section */}
          {!chatMode && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)'}`,
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                background: dragActive ? 'var(--ifm-color-primary-lightest)' : 'var(--ifm-color-emphasis-100)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                marginBottom: '2rem'
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--ifm-color-emphasis-800)' }}>
                {dragActive ? 'Drop your PDF here!' : 'Upload PDF Document'}
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--ifm-color-emphasis-600)' }}>
                Drag and drop your PDF file here, or click to browse
              </p>
              <button
                style={{
                  background: 'var(--ifm-color-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                disabled={uploading}
              >
                {uploading ? '⏳ Processing...' : '📁 Choose PDF File'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {/* Status Section */}
          {status && (
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              background: status.type === 'success' ? '#d4edda' : 
                         status.type === 'error' ? '#f8d7da' : '#d1ecf1',
              border: `1px solid ${status.type === 'success' ? '#c3e6cb' : 
                                   status.type === 'error' ? '#f5c6cb' : '#bee5eb'}`,
              color: status.type === 'success' ? '#155724' : 
                     status.type === 'error' ? '#721c24' : '#0c5460'
            }}>
              <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {status.message}
              </div>
              {status.details && (
                <details style={{ marginTop: '0.5rem' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                    View Details
                  </summary>
                  <pre style={{
                    background: 'rgba(0,0,0,0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    overflow: 'auto',
                    marginTop: '0.5rem'
                  }}>
                    {JSON.stringify(status.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Chat Section */}
          {chatMode && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h2 style={{ margin: 0, color: 'var(--ifm-color-primary)' }}>
                  💬 Ask Questions about {currentFile}
                </h2>
                <button
                  onClick={resetChat}
                  style={{
                    background: 'var(--ifm-color-emphasis-300)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🔄 Upload New PDF
                </button>
              </div>

              {/* Messages */}
              <div style={{
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '8px',
                height: '400px',
                overflowY: 'auto',
                padding: '1rem',
                marginBottom: '1rem',
                background: 'var(--ifm-background-color)'
              }}>
                {messages.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    color: 'var(--ifm-color-emphasis-600)',
                    marginTop: '2rem'
                  }}>
                    💡 Start by asking a question about your PDF content
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: msg.type === 'user' 
                          ? 'var(--ifm-color-primary-lightest)' 
                          : msg.error 
                            ? '#f8d7da'
                            : 'var(--ifm-color-emphasis-100)',
                        border: `1px solid ${msg.type === 'user' 
                          ? 'var(--ifm-color-primary-light)' 
                          : msg.error 
                            ? '#f5c6cb'
                            : 'var(--ifm-color-emphasis-300)'}`,
                        alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '500',
                        marginBottom: '0.25rem',
                        color: msg.type === 'user' ? 'var(--ifm-color-primary-dark)' : 'var(--ifm-color-emphasis-800)'
                      }}>
                        {msg.type === 'user' ? '👤 You' : '🤖 AI Assistant'}
                      </div>
                      <div style={{ lineHeight: '1.5' }}>
                        {msg.loading ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid var(--ifm-color-emphasis-300)',
                              borderTop: '2px solid var(--ifm-color-primary)',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }} />
                            {msg.text}
                          </div>
                        ) : (
                          msg.text
                        )}
                      </div>
                      {msg.details && !msg.loading && (
                        <details style={{ marginTop: '0.5rem' }}>
                          <summary style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                            Response Details
                          </summary>
                          <pre style={{
                            background: 'rgba(0,0,0,0.1)',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            overflow: 'auto',
                            marginTop: '0.5rem'
                          }}>
                            {JSON.stringify(msg.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Question Input */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !asking && askQuestion()}
                  placeholder="Ask a question about your PDF..."
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  disabled={asking}
                />
                <button
                  onClick={askQuestion}
                  disabled={asking || !question.trim()}
                  style={{
                    background: asking ? 'var(--ifm-color-emphasis-300)' : 'var(--ifm-color-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    cursor: asking ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  {asking ? '⏳' : '🚀'} Ask
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'var(--ifm-color-emphasis-100)',
          borderRadius: '8px',
          border: '1px solid var(--ifm-color-emphasis-200)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>🛠️ How to Use This Tester</h3>
          <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><strong>Test connection first</strong> - Use the "Test Connection" button to verify n8n is accessible</li>
            <li><strong>Configure webhook URLs</strong> - Update the URLs to match your n8n workflow endpoints</li>
            <li><strong>Import your agent workflows</strong> - Use the LangChain agent workflows: <code>05-proper-chat-agent.json</code>, <code>06-advanced-agent-with-tools.json</code>, and <code>07-pdf-processing-agent.json</code></li>
            <li><strong>Activate your workflow</strong> - Make sure it's running in n8n (not just saved)</li>
            <li><strong>Upload a PDF</strong> - Drag and drop or click to select a PDF file</li>
            <li><strong>Ask questions</strong> - Once processed, you can chat with your document</li>
          </ol>
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            background: 'var(--ifm-color-warning-lightest)',
            border: '1px solid var(--ifm-color-warning-light)',
            borderRadius: '4px'
          }}>
            <strong>💡 Common Issues & Solutions:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
              <li><strong>404 "webhook not registered":</strong> Click "Execute workflow" in n8n or activate the workflow</li>
              <li><strong>Failed to fetch:</strong> n8n might not be running or port is wrong</li>
              <li><strong>CORS errors:</strong> Try accessing from the same origin as n8n</li>
              <li>Use the <strong>Test Connection</strong> button first to diagnose issues</li>
              <li>Check browser console (F12) for detailed error information</li>
              <li>Default URLs assume n8n is running on <code>localhost:5678</code></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}