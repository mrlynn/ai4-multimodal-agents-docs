import React, { useState } from 'react';
import Layout from '@theme/Layout';
import SlideViewer from '@site/src/components/SlideViewer';

const demoSlides = [
  {
    id: 'workshop-intro',
    title: 'Workshop Introduction',
    url: 'https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk',
    caption: 'Introduction to building multimodal PDF agents with Voyage and MongoDB',
    notesLink: '/docs/intro',
  },
  {
    id: 'workshop-agents',
    title: 'AI Agents',
    url: 'https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk/edit?slide=id.g35dddaa82ed_0_4823#slide=id.g35dddaa82ed_0_4823',
    caption: 'Introduction to AI Agents',
    notesLink: '/docs/intro',
  },
  {
    id: 'modality-overview',
    title: 'Mulitmodality',
    url: 'https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk/edit?slide=id.g35df0c0f3b1_0_4883#slide=id.g35df0c0f3b1_0_4883',
    caption: 'High-level system architecture and components',
    autoplay: false,
    loop: true,
  },
  {
    id: 'mongodb-basics',
    title: 'MongoDB Atlas Basics',
    url: 'https://docs.google.com/presentation/d/fedcba0987654321/edit?usp=sharing',
    caption: 'Getting started with MongoDB Atlas for vector search',
  },
];

export default function SlidesPlayground() {
  const [selectedSlide, setSelectedSlide] = useState(demoSlides[0]);
  const [customUrl, setCustomUrl] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  return (
    <Layout
      title="Welcome to AI4 - Building a Multimodal PDF Agent"
      description="Test and preview slide presentations">
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Welcome to AI4 - Building a Multimodal PDF Agent</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3>Sections</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {demoSlides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setSelectedSlide(slide);
                    setShowCustom(false);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '2px solid',
                    borderColor: selectedSlide.id === slide.id && !showCustom ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
                    borderRadius: '4px',
                    background: selectedSlide.id === slide.id && !showCustom ? 'var(--ifm-color-primary-lightest)' : 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: selectedSlide.id === slide.id && !showCustom ? '600' : '400',
                  }}>
                  {slide.title}
                </button>
              ))}
            </div>

            
          </div>

          <div style={{ marginTop: '3rem' }}>
            {showCustom ? (
              <SlideViewer
                url={customUrl}
                title="Custom Presentation"
                caption="User-provided presentation"
                height="650px"
              />
            ) : (
              <SlideViewer
                {...selectedSlide}
                height="650px"
              />
            )}
          </div>

          {/* <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px' }}>
            <h3>Usage Example</h3>
            <pre style={{ background: 'var(--ifm-pre-background)', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
              <code>{`import SlideViewer from '@site/src/components/SlideViewer';

// Basic usage
<SlideViewer 
  url="https://docs.google.com/presentation/d/YOUR_ID/edit"
  title="My Presentation"
/>

// With all options
<SlideViewer 
  url="https://docs.google.com/presentation/d/YOUR_ID/edit"
  title="Workshop Introduction"
  width="100%"
  height="600px"
  caption="Introduction to our workshop"
  autoplay={true}
  loop={true}
  delayMs={5000}
  notesLink="/docs/speaker-notes"
/>`}</code>
            </pre>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}