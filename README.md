# JSON Audio Engine

A modular JavaScript library for sequencing audio playback using JSON configurations. The library is platform-agnostic and can work with Web Audio API, React Native, Node.js, or any other audio system.

## Features

- JSON-based configuration for audio sequences
- Multiple audio layers with independent controls
- Timed actions: play, volume, pan (more can be added)
- Smooth transitions with easing functions
- Platform-agnostic design
- Efficient resource management
- Built with modern JavaScript (ES modules)

## Installation

```bash
npm install json-audio-engine
```

## Basic Usage

```javascript
import { AudioSequencer } from "json-audio-engine";
import { createWebAudioLoader } from "json-audio-engine/platforms/web";

// Create audio context and loader
const audioContext = new AudioContext();
const audioLoader = createWebAudioLoader(audioContext);

// Define your audio sequence
const config = {
  bpm: 120,
  layers: [
    {
      id: "background",
      file: "sounds/ambient.wav",
      actions: [
        { type: "play", start: 0, loop: true },
        {
          type: "volume",
          start: 0,
          from: 0,
          to: 0.8,
          duration: 5,
          ease: "easeInOut",
        },
      ],
    },
    {
      id: "effect",
      file: "sounds/effect.wav",
      actions: [
        { type: "play", start: 2 },
        { type: "pan", start: 2, from: -1, to: 1, duration: 3, ease: "linear" },
      ],
    },
  ],
};

// Create and start the sequencer
const sequencer = new AudioSequencer(config, audioLoader);
await sequencer.init();
sequencer.start();

// Stop when needed
sequencer.stop();
```

## Action Types

### Play Action

```javascript
{
  type: "play",
  start: 0,      // Start time in seconds
  loop: false    // Whether to loop the audio
}
```

### Volume Action

```javascript
{
  type: "volume",
  start: 0,      // Start time in seconds
  from: 0,       // Initial volume (0 to 1)
  to: 1,         // Target volume (0 to 1)
  duration: 2,   // Transition duration in seconds
  ease: "linear" // Easing function name
}
```

### Pan Action

```javascript
{
  type: "pan",
  start: 0,      // Start time in seconds
  from: -1,      // Initial pan position (-1 to 1)
  to: 1,         // Target pan position (-1 to 1)
  duration: 2,   // Transition duration in seconds
  ease: "linear" // Easing function name
}
```

## Available Easing Functions

- `linear`
- `easeIn`
- `easeOut`
- `easeInOut`

## Creating Custom Platform Implementations

To support a new platform, create an audio loader function that returns an object with these methods:

```javascript
{
  play: () => void,
  stop: () => void,
  setVolume: (value: number) => void,
  setPan: (value: number) => void,
  dispose: () => void
}
```

## Examples

Check the `examples` directory for platform-specific implementations:

- Web Audio API (`examples/web`)
- More platforms coming soon...

## License

MIT
