import React, { useState } from 'react';
import styles from './styles.module.css';

export default function CodeBlock({ 
  language = 'bash',
  children,
  title,
  showCopy = true,
  filename,
  highlight = []
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = children.trim();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.codeBlockContainer}>
      {(title || filename) && (
        <div className={styles.header}>
          <span className={styles.title}>
            {filename && <span className={styles.filename}>📄 {filename}</span>}
            {title && <span className={styles.codeTitle}>{title}</span>}
          </span>
          {showCopy && (
            <button 
              className={styles.copyButton}
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          )}
        </div>
      )}
      <div className={styles.codeBlock}>
        <pre className={`${styles.code} language-${language}`}>
          <code>{children.trim()}</code>
        </pre>
        {!title && !filename && showCopy && (
          <button 
            className={styles.floatingCopyButton}
            onClick={handleCopy}
            disabled={copied}
          >
            {copied ? '✅' : '📋'}
          </button>
        )}
      </div>
    </div>
  );
}

export function TerminalCommand({ command, output, prompt = '$' }) {
  const [showOutput, setShowOutput] = useState(false);

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <div className={styles.terminalButton} style={{backgroundColor: '#ff5f57'}}></div>
          <div className={styles.terminalButton} style={{backgroundColor: '#ffbd2e'}}></div>
          <div className={styles.terminalButton} style={{backgroundColor: '#28ca42'}}></div>
        </div>
        <div className={styles.terminalTitle}>Terminal</div>
      </div>
      <div className={styles.terminalContent}>
        <div className={styles.commandLine}>
          <span className={styles.prompt}>{prompt}</span>
          <span className={styles.command}>{command}</span>
        </div>
        {output && (
          <>
            {!showOutput && (
              <button 
                className={styles.showOutputButton}
                onClick={() => setShowOutput(true)}
              >
                Show expected output ▼
              </button>
            )}
            {showOutput && (
              <div className={styles.output}>
                <pre>{output}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}