import { interpolate, Easing } from "../utils/easing.js";

/**
 * Registry of available actions
 */
export const ActionHandlers = {
  /**
   * Handle play action
   * @param {Object} action - Action configuration
   * @param {Object} audioNode - Audio node to control
   * @param {Object} scheduler - Scheduler instance
   */
  play: (action, audioNode, scheduler) => {
    const { start = 0, loop = false } = action;

    scheduler.scheduleEvent(
      () => {
        if (audioNode.play) {
          audioNode.loop = loop;
          audioNode.play();
        }
      },
      start,
      `play_${audioNode.id}`
    );
  },

  /**
   * Handle volume action
   * @param {Object} action - Action configuration
   * @param {Object} audioNode - Audio node to control
   * @param {Object} scheduler - Scheduler instance
   */
  volume: (action, audioNode, scheduler) => {
    const {
      start = 0,
      from = 1,
      to = 1,
      duration = 0,
      ease = "linear",
    } = action;

    const easingFn = Easing[ease] || Easing.linear;

    if (duration === 0) {
      // Instant volume change
      scheduler.scheduleEvent(
        () => {
          if (audioNode.setVolume) {
            audioNode.setVolume(to);
          }
        },
        start,
        `volume_${audioNode.id}`
      );
      return;
    }

    // Gradual volume change
    let startTime;
    const updateVolume = () => {
      if (!scheduler.isRunning) return;

      const currentTime = scheduler.getCurrentTime();
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (audioNode.setVolume) {
        const volume = interpolate(from, to, progress, easingFn);
        audioNode.setVolume(volume);
      }

      if (progress < 1) {
        requestAnimationFrame(updateVolume);
      }
    };

    scheduler.scheduleEvent(
      () => {
        requestAnimationFrame(updateVolume);
      },
      start,
      `volume_${audioNode.id}`
    );
  },

  /**
   * Handle pan action
   * @param {Object} action - Action configuration
   * @param {Object} audioNode - Audio node to control
   * @param {Object} scheduler - Scheduler instance
   */
  pan: (action, audioNode, scheduler) => {
    const {
      start = 0,
      from = 0,
      to = 0,
      duration = 0,
      ease = "linear",
    } = action;

    const easingFn = Easing[ease] || Easing.linear;

    if (duration === 0) {
      // Instant pan change
      scheduler.scheduleEvent(
        () => {
          if (audioNode.setPan) {
            audioNode.setPan(to);
          }
        },
        start,
        `pan_${audioNode.id}`
      );
      return;
    }

    // Gradual pan change
    let startTime;
    const updatePan = () => {
      if (!scheduler.isRunning) return;

      const currentTime = scheduler.getCurrentTime();
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (audioNode.setPan) {
        const pan = interpolate(from, to, progress, easingFn);
        audioNode.setPan(pan);
      }

      if (progress < 1) {
        requestAnimationFrame(updatePan);
      }
    };

    scheduler.scheduleEvent(
      () => {
        requestAnimationFrame(updatePan);
      },
      start,
      `pan_${audioNode.id}`
    );
  },
};
