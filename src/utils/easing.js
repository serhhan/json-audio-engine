/**
 * Collection of easing functions for smooth transitions
 */

export const Easing = {
  /**
   * Linear interpolation
   */
  linear: (t) => t,

  /**
   * Smooth ease-in-out
   */
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  /**
   * Smooth ease-in
   */
  easeIn: (t) => t * t,

  /**
   * Smooth ease-out
   */
  easeOut: (t) => t * (2 - t),
};

/**
 * Interpolate between two values using an easing function
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} progress - Progress (0 to 1)
 * @param {Function} easingFn - Easing function to use
 * @returns {number} Interpolated value
 */
export function interpolate(start, end, progress, easingFn = Easing.linear) {
  const t = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
  return start + (end - start) * easingFn(t);
}
