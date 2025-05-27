/**
 * Handles scheduling of timed events for audio playback
 */
export class Scheduler {
  constructor() {
    this.events = new Map();
    this.startTime = 0;
    this.isRunning = false;
  }

  /**
   * Start the scheduler
   */
  start() {
    this.startTime = Date.now();
    this.isRunning = true;
  }

  /**
   * Stop the scheduler and clear all events
   */
  stop() {
    this.isRunning = false;
    this.events.forEach((timeout) => clearTimeout(timeout));
    this.events.clear();
  }

  /**
   * Schedule an event to be executed at a specific time
   * @param {Function} callback - Function to execute
   * @param {number} startTime - Time in seconds when to start
   * @param {string} id - Unique identifier for the event
   */
  scheduleEvent(callback, startTime, id) {
    if (!this.isRunning) return;

    // Convert startTime from seconds to milliseconds
    const delay = startTime * 1000 - (Date.now() - this.startTime);

    if (delay < 0) {
      // Execute immediately if we're past the start time
      callback();
      return;
    }

    // Clear any existing timeout for this ID
    if (this.events.has(id)) {
      clearTimeout(this.events.get(id));
    }

    // Schedule new timeout
    const timeout = setTimeout(() => {
      callback();
      this.events.delete(id);
    }, delay);

    this.events.set(id, timeout);
  }

  /**
   * Get current playback time in seconds
   */
  getCurrentTime() {
    if (!this.isRunning) return 0;
    return (Date.now() - this.startTime) / 1000;
  }
}
