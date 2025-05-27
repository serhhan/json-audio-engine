import { WebAudioNode } from "./WebAudioNode.js";

/**
 * Create an audio loader function for Web Audio API
 * @param {AudioContext} context - Web Audio context to use
 * @returns {Function} Audio loader function
 */
export function createWebAudioLoader(context) {
  // Cache for loaded audio buffers
  const audioBufferCache = new Map();

  /**
   * Load and decode audio file
   * @param {string} url - URL of the audio file
   * @returns {Promise<WebAudioNode>} Audio node instance
   */
  return async function loadAudio(url) {
    // Check cache first
    if (audioBufferCache.has(url)) {
      return new WebAudioNode(context, audioBufferCache.get(url));
    }

    try {
      // Fetch audio file
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get array buffer
      const arrayBuffer = await response.arrayBuffer();

      // Decode audio data
      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      // Cache the decoded buffer
      audioBufferCache.set(url, audioBuffer);

      // Create and return audio node
      return new WebAudioNode(context, audioBuffer);
    } catch (error) {
      console.error("Failed to load audio:", error);
      throw error;
    }
  };
}
