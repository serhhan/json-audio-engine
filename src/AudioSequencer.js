import { AudioLayer } from "./AudioLayer.js";
import { Scheduler } from "./Scheduler.js";

/**
 * Main sequencer class that manages audio layers and scheduling
 */
export class AudioSequencer {
  /**
   * @param {Object} config - Sequencer configuration
   * @param {Function} audioLoader - Function to load audio files
   */
  constructor(config, audioLoader) {
    this.config = config;
    this.audioLoader = audioLoader;
    this.scheduler = new Scheduler();
    this.layers = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize the sequencer and load all audio files
   */
  async init() {
    if (this.isInitialized) return;

    const layerPromises = this.config.layers.map(async (layerConfig) => {
      const layer = new AudioLayer(
        layerConfig,
        this.audioLoader,
        this.scheduler
      );
      const success = await layer.init();

      if (success) {
        this.layers.set(layer.id, layer);
      }

      return success;
    });

    const results = await Promise.all(layerPromises);
    this.isInitialized = results.every((success) => success);

    return this.isInitialized;
  }

  /**
   * Start playback of all layers
   */
  async start() {
    if (!this.isInitialized) {
      await this.init();
    }

    this.scheduler.start();
    this.layers.forEach((layer) => {
      layer.scheduleActions();
    });
  }

  /**
   * Stop playback of all layers
   */
  stop() {
    this.scheduler.stop();
    this.layers.forEach((layer) => {
      layer.stop();
    });
  }

  /**
   * Get a layer by ID
   * @param {string} id - Layer ID
   * @returns {AudioLayer|undefined}
   */
  getLayer(id) {
    return this.layers.get(id);
  }

  /**
   * Clean up and dispose of all resources
   */
  dispose() {
    this.stop();
    this.layers.forEach((layer) => {
      layer.dispose();
    });
    this.layers.clear();
    this.isInitialized = false;
  }
}
