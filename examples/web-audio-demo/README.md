# JSON Audio Engine Web Demo

This example demonstrates how to use the JSON Audio Engine in a web application. It shows different ways to create and control audio sequences using JSON configurations.

## Features

- Multiple audio sequence examples
- Real-time control of playback
- Dynamic UI with status indicators
- Demonstrates various audio actions (play, volume, pan)
- Shows how to handle multiple layers

## Setup

1. First, make sure you have Node.js installed.

2. Install dependencies:

```bash
npm install
```

3. Download the demo sounds:

```bash
npm run download-sounds
```

This will download the following royalty-free sounds from Freesound.org:

- `ambient.wav` - A smooth ambient pad sound
- `bass.wav` - A deep bass loop
- `melody.wav` - A melodic synth sequence

4. Start the development server:

```bash
npm start
```

This will open the demo in your default browser.

## Example Sequences

### 1. Ambient Background

Shows how to create a looping ambient sound with:

- Smooth fade-in
- Continuous stereo panning
- Infinite loop

The ambient sound used is a warm, evolving pad that works well with stereo movement.

### 2. Layered Sequence

Demonstrates how to work with multiple audio layers:

- Bass layer: A deep, rhythmic bass loop that provides the foundation
- Melody layer: A complementary melodic sequence that pans across the stereo field
- Independent volume control for each layer

The bass and melody sounds are designed to work together harmonically.

## Sound Credits

All sounds are sourced from Freesound.org under Creative Commons licenses:

- Ambient Pad: "Ambient Pad 01" by SoundFlakes
- Bass Loop: "Bass Sequence 120BPM" by ElectronicSounds
- Melody Loop: "Synth Melody Loop" by ElectronicSounds

## Code Structure

- `index.html` - Main demo page with UI and sequence configurations
- `package.json` - Project configuration and dependencies
- `download-sounds.js` - Script to download the required audio files
- `sounds/` - Directory for audio files (downloaded via script)

## Notes

- The Web Audio API requires user interaction before playing audio. That's why we call `audioContext.resume()` when starting playback.
- Audio files should be relatively small for quick loading. For longer sounds, consider using streaming or splitting into smaller chunks.
- The demo uses a shared AudioContext for all sequences to comply with browser limitations on audio contexts.
- The provided sounds are optimized for this demo and are in MP3 format for smaller file size.
