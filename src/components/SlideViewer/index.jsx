import React, { useState, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';
import { convertToEmbedUrl, isValidGoogleSlidesUrl } from './utils';

export default function SlideViewer({
  url,
  title,
  width = '100%',
  height = '600px',
  caption,
  autoplay = false,
  loop = false,
  delayMs = 5000,
  notesLink,
  fallbackContent,
  loadTimeout = 10000, // 10 seconds default timeout
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  const checkIntervalRef = useRef(null);

  const embedUrl = convertToEmbedUrl(url, { autoplay, loop, delayMs });

  // Validate URL format
  useEffect(() => {
    if (!isValidGoogleSlidesUrl(url)) {
      setHasError(true);
      setErrorType('invalid-url');
      setIsLoading(false);
    }
  }, [url]);

  // Set up load timeout
  useEffect(() => {
    if (!hasError) {
      timeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setHasError(true);
          setErrorType('timeout');
        }
      }, loadTimeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [hasError, isLoading, loadTimeout]);

  const handleLoad = () => {
    // Clear the timeout since load succeeded
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Check if the iframe loaded but is empty (indicates permission issue)
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        // Try to check if we can access the content
        checkIntervalRef.current = setTimeout(() => {
          try {
            // If iframe is blank or has minimal content, likely a permission issue
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.length < 100) {
              setHasError(true);
              setErrorType('permissions');
            }
          } catch (e) {
            // Cross-origin error is expected for Google Slides, this is OK
            setIsLoading(false);
          }
        }, 1000);
      }
    } catch (e) {
      // Expected cross-origin error
    }
    
    setIsLoading(false);
  };

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
    setHasError(true);
    setErrorType('load-error');
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div className={styles.slideViewerContainer}>
          {title && <h3 className={styles.slideTitle}>{title}</h3>}
          
          <div className={styles.slideWrapper} style={{ width, height }}>
            {isLoading && !hasError && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner} />
                <p>Loading presentation...</p>
              </div>
            )}
            
            {hasError ? (
              <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>
                  {errorType === 'permissions' ? '🔒' : '⚠️'}
                </div>
                <p className={styles.errorMessage}>
                  {errorType === 'invalid-url' && 'Invalid Google Slides URL format.'}
                  {errorType === 'permissions' && 'This presentation requires permission to view.'}
                  {errorType === 'timeout' && 'The presentation took too long to load.'}
                  {errorType === 'load-error' && 'Unable to load the presentation.'}
                  {!errorType && 'An error occurred loading the presentation.'}
                </p>
                {errorType === 'permissions' && (
                  <div className={styles.errorDetails}>
                    <p>This could be because:</p>
                    <ul>
                      <li>The presentation is not publicly shared</li>
                      <li>You need to be signed in to Google</li>
                      <li>The presentation has been deleted or moved</li>
                    </ul>
                  </div>
                )}
                {fallbackContent || (
                  <div className={styles.errorActions}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fallbackLink}>
                      Open presentation in Google Slides
                    </a>
                    {errorType === 'timeout' && (
                      <button onClick={() => window.location.reload()} className={styles.retryButton}>
                        Retry
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={embedUrl}
                className={styles.slideFrame}
                title={title || 'Presentation'}
                onLoad={handleLoad}
                onError={handleError}
                allow="autoplay"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            )}
          </div>
          
          {(caption || notesLink) && (
            <div className={styles.slideFooter}>
              {caption && <p className={styles.caption}>{caption}</p>}
              {notesLink && (
                <a href={notesLink} className={styles.notesLink}>
                  View speaker notes
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </BrowserOnly>
  );
}