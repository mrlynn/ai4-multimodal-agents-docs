import React, { useState, useEffect } from 'react';
import SlideViewer from './index';

/**
 * Enhanced SlideViewer that pre-checks presentation availability
 * This component attempts to validate the presentation before rendering
 */
export default function SlideViewerWithCheck(props) {
  const [checkStatus, setCheckStatus] = useState('checking');
  const [checkError, setCheckError] = useState(null);

  useEffect(() => {
    const checkPresentation = async () => {
      try {
        // Extract presentation ID from URL
        const match = props.url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) {
          setCheckError('invalid-url');
          setCheckStatus('error');
          return;
        }

        const presentationId = match[1];
        
        // Try to fetch the presentation metadata (this will fail for private presentations)
        // Note: This is a heuristic check - Google doesn't provide a direct API for this
        const checkUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;
        
        // Use a simple image request to check if the presentation exists
        // Google Slides generates preview images for public presentations
        const img = new Image();
        img.onload = () => {
          setCheckStatus('success');
        };
        img.onerror = () => {
          // This could be a permission issue or the presentation doesn't exist
          setCheckError('access-denied');
          setCheckStatus('error');
        };
        
        // Try to load a thumbnail of the first slide
        img.src = `https://docs.google.com/presentation/d/${presentationId}/export/png?id=${presentationId}&pageid=p`;
        
        // Set a timeout for the check
        setTimeout(() => {
          if (checkStatus === 'checking') {
            setCheckStatus('success'); // Assume success if no explicit error
          }
        }, 3000);
      } catch (error) {
        setCheckError('unknown');
        setCheckStatus('error');
      }
    };

    checkPresentation();
  }, [props.url, checkStatus]);

  if (checkStatus === 'checking') {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        background: 'var(--ifm-background-surface-color)',
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-200)'
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
        <p>Checking presentation availability...</p>
      </div>
    );
  }

  if (checkStatus === 'error' && checkError === 'access-denied') {
    return (
      <SlideViewer 
        {...props}
        fallbackContent={
          <div>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
              To view this presentation, you may need to:
            </p>
            <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              <li>Request access from the presentation owner</li>
              <li>Sign in to your Google account</li>
              <li>Ensure the presentation is shared publicly</li>
            </ol>
            <a 
              href={props.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: '500'
              }}
            >
              Request Access in Google Slides
            </a>
          </div>
        }
      />
    );
  }

  // Render normal SlideViewer for all other cases
  return <SlideViewer {...props} />;
}