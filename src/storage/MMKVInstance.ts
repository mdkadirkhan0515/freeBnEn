/**
 * src/storage/MMKVInstance.ts
 * Central MMKV Factory - All Instances with Encryption & ID Separation
 * Offline-First, Super Fast, Zero Lag
 */

import { MMKV } from "react-native-mmkv";

// --- Encryption Keys (Production: Use react-native-keychain to store) ---
const ENCRYPTION_KEYS = {
  WORD_PROGRESS: "mmkv-word-progress-key-v1",
  CHAPTER_BOX: "mmkv-chapter-box-key-v1",
  TTS_BRAIN: "mmkv-tts-brain-key-v1",
  DAILY_BANK: "mmkv-daily-bank-key-v1",
  DYNAMIC_TARGET: "mmkv-dynamic-target-key-v1",
  EVENTS: "mmkv-events-key-v1",
};

/**
 * MMKV Instances - Separated by ID to avoid key collision
 * As per Architecture: WordProgress, ChapterBox, TTS Central Brain, DailyBank
 */
class MMKVFactory {
  private static instances: Map<string, MMKV> = new Map();

  static getInstance(id: string, encryptionKey?: string): MMKV {
    if (this.instances.has(id)) {
      return this.instances.get(id)!;
    }

    const instance = new MMKV({
      id,
      encryptionKey: encryptionKey || `${id}-key`,
    });

    this.instances.set(id, instance);
    return instance;
  }

  // Pre-defined Instances
  static getWordProgress(): MMKV {
    return this.getInstance(
      "word-progress-mmkv",
      ENCRYPTION_KEYS.WORD_PROGRESS
    );
  }

  static getChapterBox(): MMKV {
    return this.getInstance("chapter-box-mmkv", ENCRYPTION_KEYS.CHAPTER_BOX);
  }

  static getTTSBrain(): MMKV {
    return this.getInstance("tts-central-brain", ENCRYPTION_KEYS.TTS_BRAIN);
  }

  static getDailyBank(): MMKV {
    return this.getInstance("daily-bank-mmkv", ENCRYPTION_KEYS.DAILY_BANK);
  }

  static getDynamicTarget(): MMKV {
    return this.getInstance(
      "dynamic-target-mmkv",
      ENCRYPTION_KEYS.DYNAMIC_TARGET
    );
  }

  static getEvents(): MMKV {
    return this.getInstance("chapter-events-mmkv", ENCRYPTION_KEYS.EVENTS);
  }

  /**
   * Clear all MMKV (For Logout / Reset)
   */
  static clearAll(): void {
    this.instances.forEach((instance) => {
      instance.clearAll();
    });
    console.log("[MMKVFactory] All instances cleared");
  }

  /**
   * Get All Keys Count (For Debugging 100 Key Structure)
   */
  static debugAllCounts(): void {
    console.log(
      "[MMKV Debug] WordProgress Keys:",
      this.getWordProgress().getAllKeys().length
    );
    console.log(
      "[MMKV Debug] ChapterBox Keys:",
      this.getChapterBox().getAllKeys().length
    );
    console.log(
      "[MMKV Debug] TTSBrain Keys:",
      this.getTTSBrain().getAllKeys().length
    );
    console.log(
      "[MMKV Debug] DailyBank Keys:",
      this.getDailyBank().getAllKeys().length
    );
  }
}

// Export singleton instances for direct use
export const wordProgressMMKV = MMKVFactory.getWordProgress();
export const chapterBoxMMKV = MMKVFactory.getChapterBox();
export const ttsBrainMMKV = MMKVFactory.getTTSBrain();
export const dailyBankMMKV = MMKVFactory.getDailyBank();
export const dynamicTargetMMKV = MMKVFactory.getDynamicTarget();
export const eventsMMKV = MMKVFactory.getEvents();

export const MMKVInstance = MMKVFactory;
export default MMKVFactory;
