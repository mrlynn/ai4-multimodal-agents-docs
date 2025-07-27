/**
 * Convert various Google Slides URL formats to embeddable iframe URL
 * @param {string} url - The Google Slides URL
 * @param {Object} options - Embed options
 * @param {boolean} options.autoplay - Start presentation automatically
 * @param {boolean} options.loop - Loop the presentation
 * @param {number} options.delayMs - Delay between slides in milliseconds
 * @param {string} options.slideId - Specific slide ID to start on
 * @param {number} options.slideNumber - Specific slide number to start on (1-based)
 * @returns {string} - Embeddable URL
 */
export function convertToEmbedUrl(url, options = {}) {
  const { autoplay = false, loop = false, delayMs = 5000, slideId, slideNumber } = options;

  // Handle already embedded URLs
  if (url.includes('/embed')) {
    return url;
  }

  // Extract presentation ID and slide ID from various Google Slides URL formats
  let presentationId;
  let extractedSlideId;
  
  // Format: https://docs.google.com/presentation/d/{id}/edit
  const editMatch = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
  if (editMatch) {
    presentationId = editMatch[1];
  }
  
  // Format: https://docs.google.com/presentation/d/{id}/view
  const viewMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)\/view/);
  if (viewMatch) {
    presentationId = viewMatch[1];
  }
  
  // Format: https://drive.google.com/file/d/{id}/view
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveMatch) {
    presentationId = driveMatch[1];
  }
  
  // Extract slide ID from URL if present
  // Format: #slide=id.g35df0c0f3b1_0_12007
  const slideMatch = url.match(/#slide=id\.([a-zA-Z0-9_]+)/);
  if (slideMatch) {
    extractedSlideId = slideMatch[1];
  }

  if (!presentationId) {
    // If we can't extract an ID, return the original URL
    return url;
  }

  // Build embed URL with parameters
  let embedUrl = `https://docs.google.com/presentation/d/${presentationId}/embed`;
  const params = [];

  // Handle slide specification
  const finalSlideId = slideId || extractedSlideId;
  if (finalSlideId) {
    params.push(`slide=id.${finalSlideId}`);
  } else if (slideNumber && slideNumber > 1) {
    // Google Slides uses 0-based indexing for slide numbers in embed URLs
    params.push(`slide=${slideNumber - 1}`);
  }

  if (autoplay) {
    params.push('start=true');
  }
  if (loop) {
    params.push('loop=true');
  }
  if (delayMs !== 5000) {
    params.push(`delayms=${delayMs}`);
  }

  if (params.length > 0) {
    embedUrl += '?' + params.join('&');
  }

  return embedUrl;
}

/**
 * Validate if a URL is a valid Google Slides URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export function isValidGoogleSlidesUrl(url) {
  const patterns = [
    /^https:\/\/docs\.google\.com\/presentation\/d\/[a-zA-Z0-9-_]+/,
    /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+/,
  ];
  
  return patterns.some(pattern => pattern.test(url));
}

/**
 * Extract presentation metadata from URL if available
 * @param {string} url - Google Slides URL
 * @returns {Object} - Metadata object
 */
export function extractPresentationMetadata(url) {
  const metadata = {
    id: null,
    type: 'google-slides',
    isPublic: true,
  };

  const idMatch = url.match(/\/(?:presentation|file)\/d\/([a-zA-Z0-9-_]+)/);
  if (idMatch) {
    metadata.id = idMatch[1];
  }

  return metadata;
}