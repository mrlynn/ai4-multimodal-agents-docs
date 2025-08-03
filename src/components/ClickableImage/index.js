import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function ClickableImage({ src, alt, caption, maxWidth = '100%', ...props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = useBaseUrl(src);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Add event listener for escape key when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isModalOpen]);

  return (
    <>
      {/* Clickable Image */}
      <div className={styles.imageContainer} style={{ maxWidth }}>
        <img
          src={imageUrl}
          alt={alt}
          className={styles.clickableImage}
          onClick={openModal}
          loading="lazy"
          {...props}
        />
        {caption && <div className={styles.caption}>{caption}</div>}
        <div className={styles.clickHint}>
          <svg 
            className={styles.expandIcon} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
          Click to enlarge
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className={styles.modal} 
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image view"
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img
              src={imageUrl}
              alt={alt}
              className={styles.modalImage}
            />
            {caption && <div className={styles.modalCaption}>{caption}</div>}
          </div>
        </div>
      )}
    </>
  );
}