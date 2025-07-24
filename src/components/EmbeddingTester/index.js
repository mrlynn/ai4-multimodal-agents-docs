import React, { useState } from 'react';
import styles from './styles.module.css';

export default function EmbeddingTester({ 
  apiUrl = "https://workshop-embedding-api.vercel.app/api/embed",
  defaultModel = "voyage-3"
}) {
  const [text, setText] = useState('');
  const [model, setModel] = useState(defaultModel);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showRawEmbedding, setShowRawEmbedding] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter some text to embed');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          model: model
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate embedding');
    } finally {
      setLoading(false);
    }
  };

  const generateN8nConfig = () => {
    return {
      method: 'POST',
      url: apiUrl,
      authentication: 'none',
      sendHeaders: true,
      headerParameters: {
        parameters: [
          {
            name: 'Content-Type',
            value: 'application/json'
          }
        ]
      },
      sendBody: true,
      bodyContentType: 'json',
      specifyBody: 'json',
      jsonBody: JSON.stringify({
        text: "{{ $json.textContent }}",
        model: model
      }, null, 2)
    };
  };

  const copyN8nConfig = async () => {
    const config = generateN8nConfig();
    const configText = `n8n HTTP Request Node Configuration:

Method: ${config.method}
URL: ${config.url}
Authentication: None

Headers:
- Content-Type: application/json

Body (JSON):
${config.jsonBody}`;

    try {
      await navigator.clipboard.writeText(configText);
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = configText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  const exampleTexts = [
    "This document explains how vector embeddings work in machine learning applications.",
    "MongoDB Atlas provides powerful vector search capabilities for AI applications.",
    "n8n is a visual workflow automation tool that makes building AI agents intuitive.",
    "Multimodal embeddings can process both text and images in a unified vector space."
  ];

  const fillExample = (exampleText) => {
    setText(exampleText);
  };

  return (
    <div className={styles.tester}>
      <div className={styles.header}>
        <h3>🧪 Workshop Embedding API Tester</h3>
        <p>Test the embedding API before using it in your n8n workflows</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="text">Text to Embed:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter any text you want to convert to embeddings..."
            rows={4}
            className={styles.textarea}
          />
          
          <div className={styles.examples}>
            <span className={styles.exampleLabel}>Try an example:</span>
            {exampleTexts.map((example, index) => (
              <button
                key={index}
                type="button"
                className={styles.exampleButton}
                onClick={() => fillExample(example)}
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="model">Model:</label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={styles.select}
          >
            <option value="voyage-3">voyage-3 (Latest)</option>
            <option value="voyage-multimodal-3">voyage-multimodal-3 (Multimodal)</option>
            <option value="voyage-code-3">voyage-code-3 (Code)</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className={styles.submitButton}
          >
            {loading ? '⏳ Generating Embedding...' : '🚀 Generate Embedding'}
          </button>

          <button
            type="button"
            onClick={copyN8nConfig}
            className={styles.copyButton}
            disabled={copiedConfig}
          >
            {copiedConfig ? '✅ Copied!' : '📋 Copy n8n Config'}
          </button>
        </div>
      </form>

      {error && (
        <div className={styles.error}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className={styles.result}>
          <h4>✅ Success! Embedding Generated</h4>
          
          <div className={styles.resultSection}>
            <h5>Response Details:</h5>
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Model:</span>
                <span className={styles.detailValue}>{result.model}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Dimensions:</span>
                <span className={styles.detailValue}>{result.embeddings[0].length}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Tokens Used:</span>
                <span className={styles.detailValue}>{result.usage?.total_tokens || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className={styles.resultSection}>
            <h5>Embedding Preview (first 10 values):</h5>
            <code className={styles.embeddingPreview}>
              [{result.embeddings[0].slice(0, 10).map(v => v.toFixed(4)).join(', ')}...]
            </code>
          </div>

          <button
            type="button"
            onClick={() => setShowRawEmbedding(!showRawEmbedding)}
            className={styles.toggleButton}
          >
            {showRawEmbedding ? 'Hide' : 'Show'} Full Embedding ({result.embeddings[0].length} values)
          </button>

          {showRawEmbedding && (
            <div className={styles.rawEmbedding}>
              <pre>{JSON.stringify(result.embeddings[0], null, 2)}</pre>
            </div>
          )}

          <div className={styles.usage}>
            <h5>📝 n8n Usage Example:</h5>
            <p>This response format is exactly what you'll receive in n8n. Access the embedding array with:</p>
            <code className={styles.accessCode}>
              {'{{ $json.embeddings[0] }}'}
            </code>
          </div>
        </div>
      )}

      <div className={styles.info}>
        <h4>ℹ️ About This API</h4>
        <ul>
          <li>No authentication required - designed for workshop use</li>
          <li>Rate limited to prevent abuse</li>
          <li>Supports text embeddings with Voyage AI models</li>
          <li>Returns 1024-dimensional vectors for semantic search</li>
        </ul>
      </div>
    </div>
  );
}

export function EmbeddingVisualizer({ embedding, maxDisplay = 50 }) {
  if (!embedding || !Array.isArray(embedding)) {
    return null;
  }

  const values = embedding.slice(0, maxDisplay);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  const normalize = (value) => {
    return ((value - min) / range) * 100;
  };

  return (
    <div className={styles.visualizer}>
      <h4>Embedding Visualization (first {maxDisplay} dimensions)</h4>
      <div className={styles.chart}>
        {values.map((value, index) => (
          <div
            key={index}
            className={styles.bar}
            style={{
              height: `${normalize(value)}%`,
              backgroundColor: value >= 0 ? '#10b981' : '#ef4444'
            }}
            title={`Dimension ${index}: ${value.toFixed(4)}`}
          />
        ))}
      </div>
      <div className={styles.chartLabels}>
        <span>Negative ←</span>
        <span>→ Positive</span>
      </div>
    </div>
  );
}