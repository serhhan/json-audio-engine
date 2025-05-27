import { ActionHandlers } from "./actions/index.js";

/**
 * Manages a single audio layer with its actions
 */
export class AudioLayer {
  /**
   * @param {Object} config - Layer configuration
   * @param {Function} audioLoader - Function to load audio
   * @param {Scheduler} scheduler - Scheduler instance
   */
  constructor(config, audioLoader, scheduler) {
    this.id = config.id;
    this.file = config.file;
    this.actions = config.actions || [];
    this.audioLoader = audioLoader;
    this.scheduler = scheduler;
    this.audioNode = null;
  }

  /**
   * Initialize the layer by loading audio
   */
  async init() {
    try {
      this.audioNode = await this.audioLoader(this.file);
      this.audioNode.id = this.id;
      return true;
    } catch (error) {
      console.error(`Failed to load audio for layer ${this.id}:`, error);
      return false;
    }
  }

  /**
   * Schedule all actions for this layer
   */
  scheduleActions() {
    this.actions.forEach((action) => {
      const handler = ActionHandlers[action.type];
      if (handler && this.audioNode) {
        handler(action, this.audioNode, this.scheduler);
      } else if (!handler) {
        console.warn(`Unknown action type: ${action.type}`);
      }
    });
  }

  /**
   * Stop all audio playback and clear scheduled actions
   */
  stop() {
    if (this.audioNode && this.audioNode.stop) {
      this.audioNode.stop();
    }
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.stop();
    if (this.audioNode && this.audioNode.dispose) {
      this.audioNode.dispose();
    }
    this.audioNode = null;
  }
}
