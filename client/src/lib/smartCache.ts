interface CacheEntry {
  data: any;
  timestamp: number;
  url: string;
}

class SmartCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 50; // Maximum cache entries
  private ttl = 5 * 60 * 1000; // 5 minutes in milliseconds

  set(key: string, data: any, url: string): void {
    // Clean expired entries before adding new one
    this.cleanExpired();

    // Remove oldest if cache is full (LRU strategy)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey!);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      url
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check if entry is expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache stats (useful for debugging)
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        url: entry.url,
        age: Date.now() - entry.timestamp
      }))
    };
  }
}

export default SmartCache;
