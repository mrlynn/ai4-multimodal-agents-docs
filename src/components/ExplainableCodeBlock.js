import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import { ChevronDownIcon, ChevronRightIcon, InfoIcon } from '@site/src/components/Icons';
import styles from './ExplainableCodeBlock.module.css';

export default function ExplainableCodeBlock({ 
  children, 
  language = 'python',
  title,
  explanation,
  concepts = [],
  hints = [],
  showLineNumbers = true,
  ...props 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      {/* Code Block Header */}
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      
      {/* Original Code Block */}
      <CodeBlock
        language={language}
        showLineNumbers={showLineNumbers}
        {...props}
      >
        {children}
      </CodeBlock>

      {/* Explanation Toggle */}
      {explanation && (
        <div className={styles.explanationContainer}>
          <button
            className={styles.toggleButton}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Hide explanation' : 'Show explanation'}
          >
            <span className={styles.toggleIcon}>
              {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </span>
            <InfoIcon className={styles.infoIcon} />
            <span className={styles.toggleText}>
              {isExpanded ? 'Hide' : 'Show'} Explanation
            </span>
          </button>

          {/* Expandable Explanation Content */}
          <div 
            className={`${styles.explanationContent} ${isExpanded ? styles.expanded : ''}`}
            aria-hidden={!isExpanded}
          >
            <div className={styles.explanationInner}>
              {/* Main Explanation */}
              <div className={styles.explanationText}>
                {explanation}
              </div>

              {/* Key Concepts */}
              {concepts.length > 0 && (
                <div className={styles.conceptsSection}>
                  <h4 className={styles.sectionTitle}>Key Concepts:</h4>
                  <ul className={styles.conceptsList}>
                    {concepts.map((concept, index) => (
                      <li key={index} className={styles.conceptItem}>
                        <strong>{concept.term}:</strong> {concept.definition}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hints */}
              {hints.length > 0 && (
                <div className={styles.hintsSection}>
                  <h4 className={styles.sectionTitle}>💡 Hints:</h4>
                  <ul className={styles.hintsList}>
                    {hints.map((hint, index) => (
                      <li key={index} className={styles.hintItem}>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export with common presets for workshop use
export function WorkshopCodeBlock({ children, ...props }) {
  return (
    <ExplainableCodeBlock
      language="python"
      showLineNumbers={true}
      {...props}
    >
      {children}
    </ExplainableCodeBlock>
  );
}