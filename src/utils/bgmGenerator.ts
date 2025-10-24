/**
 * Web Audio APIを使用して猫っぽい可愛らしいBGMを生成するユーティリティ
 * Utility to generate cute cat-themed BGM using Web Audio API
 */

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export class CatBGMGenerator {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;
  private currentNoteIndex = 0;
  private nextNoteTime = 0;
  private scheduleAheadTime = 0.1;
  private tempo = 140; // BPM
  private noteLength = 0.15; // 音符の長さ（秒）/ Note length in seconds

  // 可愛らしいメロディーパターン（猫の鳴き声をイメージ）
  // Cute melody pattern (inspired by cat meows)
  private melodyNotes = [
    // ド ミ ソ ミ | ド ミ ソ ー
    262, 330, 392, 330, 262, 330, 392, 0,
    // レ ファ ラ ファ | レ ファ ラ ー
    294, 349, 440, 349, 294, 349, 440, 0,
    // ミ ソ シ ソ | ミ ソ ド' ー
    330, 392, 494, 392, 330, 392, 523, 0,
    // ソ ミ ド ミ | ソ ー ー ー
    392, 330, 262, 330, 392, 0, 0, 0,
  ];

  initialize(): boolean {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.error('Web Audio API is not supported');
        return false;
      }
      this.audioContext = new AudioContextClass();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.15; // 音量を小さめに設定 / Set volume to low
      return true;
    } catch (error) {
      console.error('Web Audio API初期化エラー / Web Audio API initialization error:', error);
      return false;
    }
  }

  playNote(frequency: number, duration: number): void {
    if (!this.audioContext || !this.gainNode || frequency === 0) return;

    const oscillator = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();

    oscillator.type = 'sine'; // 柔らかい音色 / Soft tone
    oscillator.frequency.value = frequency;
    
    oscillator.connect(noteGain);
    noteGain.connect(this.gainNode);

    // エンベロープ（音の立ち上がりと減衰）/ Envelope (attack and decay)
    const now = this.audioContext.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.3, now + 0.02); // アタック / Attack
    noteGain.gain.exponentialRampToValueAtTime(0.01, now + duration); // ディケイ / Decay

    oscillator.start(now);
    oscillator.stop(now + duration);

    this.oscillators.push(oscillator);

    // 終了後にオシレーターをクリーンアップ / Cleanup oscillator after it ends
    oscillator.onended = () => {
      const index = this.oscillators.indexOf(oscillator);
      if (index > -1) {
        this.oscillators.splice(index, 1);
      }
    };
  }

  scheduler(): void {
    if (!this.audioContext || !this.isPlaying) return;

    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      const frequency = this.melodyNotes[this.currentNoteIndex];
      this.playNote(frequency, this.noteLength);

      const secondsPerBeat = 60.0 / this.tempo;
      this.nextNoteTime += secondsPerBeat;
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
    }

    if (this.isPlaying) {
      setTimeout(() => this.scheduler(), 25);
    }
  }

  start(): void {
    if (this.isPlaying) return;

    if (!this.audioContext) {
      if (!this.initialize()) return;
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.nextNoteTime = this.audioContext!.currentTime;
    this.scheduler();
  }

  stop(): void {
    this.isPlaying = false;
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch {
        // オシレーターが既に停止している場合 / If oscillator is already stopped
      }
    });
    this.oscillators = [];
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  toggleMute(): void {
    if (this.gainNode) {
      this.gainNode.gain.value = this.gainNode.gain.value === 0 ? 0.15 : 0;
    }
  }

  cleanup(): void {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.gainNode = null;
  }
}
