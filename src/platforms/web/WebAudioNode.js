/**
 * WebAudioNode wraps Web Audio API functionality to match our audio engine interface
 */
export class WebAudioNode {
  /**
   * @param {AudioContext} context - Web Audio context
   * @param {AudioBuffer} buffer - Decoded audio buffer
   */
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
    this.id = null; // Will be set by AudioLayer

    // Audio nodes
    this.source = null;
    this.gainNode = context.createGain();
    this.stereoPanner = context.createStereoPanner();

    // Connect nodes
    this.gainNode.connect(this.stereoPanner);
    this.stereoPanner.connect(context.destination);

    // State
    this.isPlaying = false;
    this.loop = false;
    this._volume = 1;
    this._pan = 0;
  }

  /**
   * Start audio playback
   */
  play() {
    if (this.isPlaying) {
      this.stop();
    }

    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.loop = this.loop;

    // Connect source to processing chain
    this.source.connect(this.gainNode);

    // Start playback
    this.source.start(0);
    this.isPlaying = true;

    // Handle playback end
    this.source.onended = () => {
      if (!this.loop) {
        this.isPlaying = false;
      }
    };
  }

  /**
   * Stop audio playback
   */
  stop() {
    if (this.source && this.isPlaying) {
      this.source.stop();
      this.source.disconnect();
      this.isPlaying = false;
    }
  }

  /**
   * Set volume (0 to 1)
   * @param {number} value - Volume value
   */
  setVolume(value) {
    this._volume = Math.max(0, Math.min(1, value));
    this.gainNode.gain.setValueAtTime(this._volume, this.context.currentTime);
  }

  /**
   * Set stereo pan (-1 to 1)
   * @param {number} value - Pan value
   */
  setPan(value) {
    this._pan = Math.max(-1, Math.min(1, value));
    this.stereoPanner.pan.setValueAtTime(this._pan, this.context.currentTime);
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.stop();
    this.gainNode.disconnect();
    this.stereoPanner.disconnect();
  }
}
