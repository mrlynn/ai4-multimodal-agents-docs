import React from 'react';
import SlideViewer from './index';

/**
 * Wrapper component that reads slide configuration from frontmatter
 * @param {Object} props - Component props
 * @param {Object} props.slideConfig - Slide configuration from frontmatter
 */
export default function SlideViewerFromConfig({ slideConfig }) {
  if (!slideConfig || !slideConfig.url) {
    return (
      <div style={{ 
        padding: '2rem', 
        background: 'var(--ifm-color-emphasis-100)', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p>No slide configuration found. Add slides to your frontmatter:</p>
        <pre style={{ textAlign: 'left', marginTop: '1rem' }}>
          <code>{`---
slides:
  url: "https://docs.google.com/presentation/d/YOUR_ID"
  title: "Your Presentation Title"
  autoplay: true
---`}</code>
        </pre>
      </div>
    );
  }

  return <SlideViewer {...slideConfig} />;
}

/**
 * Component for rendering multiple slides from frontmatter array
 * @param {Object} props - Component props
 * @param {Array} props.slides - Array of slide configurations
 */
export function MultiSlideViewer({ slides }) {
  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {slides.map((slide, index) => (
        <div key={index} style={{ marginBottom: '3rem' }}>
          <SlideViewer {...slide} />
        </div>
      ))}
    </div>
  );
}