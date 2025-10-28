// Audio system for God Creator game
// Provides sound effects and background music with Orthodox-inspired audio

class GameAudio {
    constructor() {
        this.audioContext = null;
        this.sounds = new Map();
        this.enabled = true;
        this.volume = 0.7;
        this.backgroundMusic = null;
        
        this.initializeAudio();
        this.createSounds();
    }

    async initializeAudio() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master volume control
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.audioContext.destination);
            
            console.log('Audio system initialized');
        } catch (error) {
            console.warn('Audio initialization failed:', error);
            this.enabled = false;
        }
    }

    createSounds() {
        if (!this.enabled || !this.audioContext) return;

        // Create different sound types using Web Audio API
        this.createSound('combine', this.createCombineSound.bind(this));
        this.createSound('discovery', this.createDiscoverySound.bind(this));
        this.createSound('failure', this.createFailureSound.bind(this));
        this.createSound('completion', this.createCompletionSound.bind(this));
        this.createSound('dayTransition', this.createDayTransitionSound.bind(this));
        this.createSound('click', this.createClickSound.bind(this));
        this.createSound('hover', this.createHoverSound.bind(this));
    }

    createSound(name, generator) {
        this.sounds.set(name, generator);
    }

    // Sound generators using Web Audio API

    createCombineSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        // Orthodox bell-like sound
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(440, this.audioContext.currentTime + 0.3);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    createDiscoverySound() {
        if (!this.audioContext) return;

        // Triumphant discovery sound with multiple harmonics
        const frequencies = [261.63, 329.63, 392.00, 523.25]; // C major chord
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const delay = index * 0.1;

            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + delay);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + delay);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + delay + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + delay + 1.0);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(this.audioContext.currentTime + delay);
            oscillator.stop(this.audioContext.currentTime + delay + 1.0);
        });

        // Add sparkle effect
        this.createSparkleEffect();
    }

    createSparkleEffect() {
        if (!this.audioContext) return;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.frequency.setValueAtTime(2000 + Math.random() * 1000, this.audioContext.currentTime);
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);

                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
            }, i * 100);
        }
    }

    createFailureSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        // Descending disappointed sound
        oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.3);
        oscillator.type = 'triangle';

        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    createCompletionSound() {
        if (!this.audioContext) return;

        // Grand completion fanfare
        const melody = [
            { freq: 261.63, time: 0.0 },  // C
            { freq: 329.63, time: 0.2 },  // E
            { freq: 392.00, time: 0.4 },  // G
            { freq: 523.25, time: 0.6 },  // C high
            { freq: 659.25, time: 0.8 },  // E high
            { freq: 783.99, time: 1.0 },  // G high
            { freq: 1046.50, time: 1.2 }  // C very high
        ];

        melody.forEach(note => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.frequency.setValueAtTime(note.freq, this.audioContext.currentTime + note.time);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + note.time);
            gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + note.time + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + note.time + 0.4);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(this.audioContext.currentTime + note.time);
            oscillator.stop(this.audioContext.currentTime + note.time + 0.4);
        });

        // Add harmonic backing
        setTimeout(() => {
            const chord = [261.63, 329.63, 392.00]; // C major
            chord.forEach(freq => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2.0);

                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);

                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 2.0);
            });
        }, 1000);
    }

    createDayTransitionSound() {
        if (!this.audioContext) return;

        // Ecclesiastical bell sound for day transitions
        const fundamental = 220; // A3
        const harmonics = [1, 2, 3, 4, 5]; // Bell-like harmonic series

        harmonics.forEach((harmonic, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            const frequency = fundamental * harmonic;
            const amplitude = 0.3 / harmonic; // Decreasing amplitude for higher harmonics

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(amplitude, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 3.0);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 3.0);
        });
    }

    createClickSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    createHoverSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    // Orthodox-inspired background music
    async createBackgroundMusic() {
        if (!this.enabled || !this.audioContext) return;

        // Create a simple Orthodox chant-inspired drone
        const createDrone = (frequency, duration) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 2);
            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime + duration - 2);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.audioContext.currentTime);

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);

            return oscillator;
        };

        // Create harmonic drones (inspired by Orthodox chanting)
        const fundamentalFreq = 110; // A2
        const drones = [
            fundamentalFreq,           // Fundamental
            fundamentalFreq * 1.5,     // Perfect fifth
            fundamentalFreq * 2,       // Octave
            fundamentalFreq * 3        // Perfect twelfth
        ];

        drones.forEach((freq, index) => {
            setTimeout(() => {
                createDrone(freq, 30); // 30 second drones
            }, index * 5000); // Stagger entrances
        });
    }

    // Public methods

    play(soundName) {
        if (!this.enabled || !this.sounds.has(soundName)) return;

        try {
            // Resume audio context if suspended (browser autoplay policy)
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            const soundGenerator = this.sounds.get(soundName);
            soundGenerator();
        } catch (error) {
            console.warn(`Failed to play sound "${soundName}":`, error);
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
        }
    }

    toggleMute() {
        this.enabled = !this.enabled;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(
                this.enabled ? this.volume : 0, 
                this.audioContext.currentTime
            );
        }
        return this.enabled;
    }

    isEnabled() {
        return this.enabled;
    }

    // Background music control
    startBackgroundMusic() {
        if (this.enabled) {
            this.createBackgroundMusic();
        }
    }

    stopBackgroundMusic() {
        // Background music will naturally fade out
    }

    // Setup UI controls
    setupAudioControls() {
        // Create audio control panel
        const controlPanel = document.createElement('div');
        controlPanel.className = 'audio-controls';
        controlPanel.innerHTML = `
            <div class="audio-control-item">
                <button id="audio-toggle" class="audio-btn" title="Toggle Sound">
                    🔊
                </button>
            </div>
            <div class="audio-control-item">
                <input type="range" id="volume-slider" 
                       min="0" max="100" value="${this.volume * 100}"
                       class="volume-slider" title="Volume">
            </div>
            <div class="audio-control-item">
                <button id="music-toggle" class="audio-btn" title="Toggle Background Music">
                    🎵
                </button>
            </div>
        `;

        // Add to page
        document.body.appendChild(controlPanel);

        // Add event listeners
        document.getElementById('audio-toggle').addEventListener('click', () => {
            const enabled = this.toggleMute();
            document.getElementById('audio-toggle').textContent = enabled ? '🔊' : '🔇';
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        document.getElementById('music-toggle').addEventListener('click', (e) => {
            if (e.target.textContent === '🎵') {
                this.startBackgroundMusic();
                e.target.textContent = '🔇';
            } else {
                this.stopBackgroundMusic();
                e.target.textContent = '🎵';
            }
        });

        // Add CSS for audio controls
        this.addAudioControlsCSS();
    }

    addAudioControlsCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .audio-controls {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                padding: 1rem;
                border-radius: 8px;
                display: flex;
                gap: 1rem;
                align-items: center;
                z-index: 1000;
                border: 2px solid var(--gold);
            }

            .audio-control-item {
                display: flex;
                align-items: center;
            }

            .audio-btn {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background 0.2s ease;
            }

            .audio-btn:hover {
                background: rgba(255, 215, 0, 0.2);
            }

            .volume-slider {
                width: 100px;
                height: 4px;
                background: var(--deep-gold);
                outline: none;
                border-radius: 2px;
            }

            .volume-slider::-webkit-slider-thumb {
                appearance: none;
                width: 16px;
                height: 16px;
                background: var(--gold);
                border-radius: 50%;
                cursor: pointer;
            }

            .volume-slider::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: var(--gold);
                border-radius: 50%;
                cursor: pointer;
                border: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize audio system
window.gameAudio = new GameAudio();

// Setup audio controls when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameAudio.setupAudioControls();
    
    // Add hover sounds to interactive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('element') || 
            e.target.classList.contains('combine-button') ||
            e.target.classList.contains('clear-button')) {
            window.gameAudio.play('hover');
        }
    });

    // Add click sounds to buttons
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            window.gameAudio.play('click');
        }
    });

    // User interaction to enable audio (required by browsers)
    const enableAudio = () => {
        if (window.gameAudio.audioContext && window.gameAudio.audioContext.state === 'suspended') {
            window.gameAudio.audioContext.resume();
        }
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
});