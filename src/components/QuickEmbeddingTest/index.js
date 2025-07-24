import React, { useState } from 'react';
import styles from './styles.module.css';

export default function QuickEmbeddingTest({ 
  text = "Test the workshop embedding API with this sample text",
  label = "Quick API Test"
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://workshop-embedding-api.vercel.app/api/embed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model: 'voyage-3'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.quickTest}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <button 
          onClick={testAPI}
          disabled={loading}
          className={styles.testButton}
        >
          {loading ? '⏳ Testing...' : '🚀 Test API'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          ❌ {error}
        </div>
      )}

      {result && (
        <div className={styles.success}>
          ✅ API Working! Generated {result.embeddings[0].length}D embedding
          <div className={styles.details}>
            Model: {result.model} | Tokens: {result.usage?.total_tokens || 'N/A'}
          </div>
        </div>
      )}

      <div className={styles.testText}>
        <strong>Test text:</strong> "{text.substring(0, 100)}{text.length > 100 ? '...' : ''}"
      </div>
    </div>
  );
}