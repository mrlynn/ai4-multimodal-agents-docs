import React from 'react';
import Link from '@docusaurus/Link';
import styles from './WorkflowCard.module.css';

export default function WorkflowCard({
  number,
  title,
  description,
  concepts = [],
  difficulty = 'intermediate',
  downloadUrl,
  children
}) {
  const difficultyColors = {
    beginner: '#4CAF50',
    intermediate: '#FF9800',
    advanced: '#F44336',
    expert: '#9C27B0'
  };

  const difficultyEmojis = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
    expert: '🚀'
  };

  return (
    <div className={styles.workflowCard}>
      <div className={styles.header}>
        <div className={styles.numberBadge}>{number}</div>
        <div className={styles.titleSection}>
          <h3>{title}</h3>
          <span 
            className={styles.difficultyBadge}
            style={{ backgroundColor: difficultyColors[difficulty] }}
          >
            {difficultyEmojis[difficulty]} {difficulty}
          </span>
        </div>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      {concepts.length > 0 && (
        <div className={styles.concepts}>
          <strong>Concepts covered:</strong>
          <div className={styles.conceptTags}>
            {concepts.map((concept, index) => (
              <span key={index} className={styles.conceptTag}>
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {children && (
        <div className={styles.details}>
          {children}
        </div>
      )}
      
      <div className={styles.actions}>
        <Link
          className="button button--primary"
          to={downloadUrl}
          download
        >
          📥 Download Workflow
        </Link>
        <Link
          className="button button--secondary"
          to={`/docs/workflow-guides/${number}`}
        >
          📖 View Guide
        </Link>
      </div>
    </div>
  );
}