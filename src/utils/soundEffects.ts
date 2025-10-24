/**
 * Web Audio APIを使用して猫の鳴き声のような効果音を生成するユーティリティ
 * Utility to generate cat meow-like sound effects using Web Audio API
 */

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export class SoundEffectPlayer {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

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
      this.gainNode.gain.value = 0.3; // 適度な音量に設定 / Set to moderate volume
      return true;
    } catch (error) {
      console.error('Web Audio API初期化エラー / Web Audio API initialization error:', error);
      return false;
    }
  }

  /**
   * 猫の鳴き声のような効果音を再生
   * Play a cat meow-like sound effect
   * @param type - 'short' for button clicks, 'long' for result announcement
   */
  playCatMeow(type: 'short' | 'long' = 'short'): void {
    if (!this.audioContext) {
      if (!this.initialize()) return;
    }

    if (!this.audioContext || !this.gainNode) return;

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const now = this.audioContext.currentTime;

    // 猫の鳴き声の特徴的な周波数変化を模倣
    // Mimic the characteristic frequency changes of a cat meow
    const oscillator = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.type = 'sine';
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 1;

    oscillator.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(this.gainNode);

    if (type === 'short') {
      // 短い「にゃっ」という音 / Short "nya" sound
      const duration = 0.15;
      
      // 周波数変化: 高音から低音へ / Frequency change: high to low
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(400, now + duration);

      // 音量エンベロープ / Volume envelope
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.4, now + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } else {
      // 長い「にゃーん」という音 / Long "nyaan" sound
      const duration = 0.4;
      
      // 周波数変化: 中音から高音へ、そして低音へ / Frequency: mid to high, then low
      oscillator.frequency.setValueAtTime(600, now);
      oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(500, now + duration);

      // 音量エンベロープ / Volume envelope
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.5, now + 0.03);
      oscGain.gain.linearRampToValueAtTime(0.4, now + 0.2);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    }
  }

  /**
   * ボタンクリック用の短い効果音
   * Short sound effect for button clicks
   */
  playButtonClick(): void {
    this.playCatMeow('short');
  }

  /**
   * 結果発表用の長い効果音
   * Long sound effect for result announcement
   */
  playResultAnnouncement(): void {
    this.playCatMeow('long');
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.gainNode = null;
  }
}

// シングルトンインスタンスをエクスポート / Export singleton instance
export const soundEffectPlayer = new SoundEffectPlayer();
